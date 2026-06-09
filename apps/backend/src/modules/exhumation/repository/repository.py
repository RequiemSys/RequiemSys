from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from src.modules.exhumation.repository.models import ExhumationModel
from src.modules.exhumation.service.schemas import (
    ExhumationCreate,
    ExhumationUpdate
    )


class ExhumationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, exhumation: ExhumationCreate) -> ExhumationModel:
        exhumation_model = ExhumationModel(**exhumation.model_dump())

        self.db.add(exhumation_model)
        self.db.commit()
        self.db.refresh(exhumation_model)

        return exhumation_model

    def get_all(self) -> list[ExhumationModel]:
        stmt = select(ExhumationModel).options(
                joinedload(ExhumationModel.falecido)
            )
        result = self.db.execute(stmt).scalars().all()
        return result  # type: ignore

    def get_by_id(self, id: int) -> ExhumationModel | None:
        return self.db.execute(
            select(ExhumationModel).where(ExhumationModel.id == id).options(
                joinedload(ExhumationModel.falecido)
            )
        ).scalars().first()

    def update(self, id: int, dados: ExhumationUpdate
               ) -> ExhumationModel | None:
        exhumation_model = self.get_by_id(id)
        if not exhumation_model:
            return None
        for campo, valor in dados.model_dump(exclude_unset=True).items():
            if campo == "falecido" and isinstance(valor, dict):
                if exhumation_model.falecido:
                    for k, v in valor.items():
                        setattr(exhumation_model.falecido, k, v)
                continue

            setattr(exhumation_model, campo, valor)
        self.db.commit()
        self.db.refresh(exhumation_model)
        return exhumation_model

    def delete(self, id: int) -> bool:
        exhumation_model = self.get_by_id(id)
        if not exhumation_model:
            return False
        self.db.delete(exhumation_model)
        self.db.commit()
        return True

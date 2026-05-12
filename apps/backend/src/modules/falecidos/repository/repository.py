from sqlalchemy.orm import Session
from sqlalchemy import select
from src.modules.falecidos.repository.models import FalecidoModel
from src.modules.falecidos.service.schemas import FalecidoCreate, FalecidoUpdate


class FalecidoRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, falecido: FalecidoCreate) -> FalecidoModel:
        falecido_model = FalecidoModel(**falecido.model_dump())

        self.db.add(falecido_model)
        self.db.commit()
        self.db.refresh(falecido_model)

        return falecido_model

    def get_all(self) -> list[FalecidoModel]:
        return self.db.execute(select(FalecidoModel)).scalars().all()

    def get_by_id(self, falecido_id: int) -> FalecidoModel | None:
        return self.db.execute(
            select(FalecidoModel).where(FalecidoModel.id == falecido_id)
        ).scalars().first()

    def update(self, falecido_id: int, dados: FalecidoUpdate) -> FalecidoModel | None:
        falecido_model = self.get_by_id(falecido_id)
        if not falecido_model:
            return None
        for campo, valor in dados.model_dump(exclude_unset=True).items():
            setattr(falecido_model, campo, valor)
        self.db.commit()
        self.db.refresh(falecido_model)
        return falecido_model

    def delete(self, falecido_id: int) -> bool:
        falecido_model = self.get_by_id(falecido_id)
        if not falecido_model:
            return False
        self.db.delete(falecido_model)
        self.db.commit()
        return True

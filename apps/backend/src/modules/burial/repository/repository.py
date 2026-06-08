from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from src.modules.burial.service.schemas import CreateBurial, UpdateBurial
from src.modules.burial.repository.models import BurialModel


class BurialRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, burial: CreateBurial) -> BurialModel:
        burial_model = BurialModel(**burial.model_dump())

        self.db.add(burial_model)
        self.db.commit()
        self.db.refresh(burial_model)

        return burial_model

    def get_all(self) -> list[BurialModel]:
        stmt = select(BurialModel).options(
                joinedload(BurialModel.falecido, BurialModel.jazigo)
            )
        result = self.db.execute(stmt).scalars().all()
        return result  # type: ignore

    def get_by_id(self, id: int) -> BurialModel | None:
        return self.db.execute(
            select(BurialModel).where(BurialModel.id == id).options(
                joinedload(BurialModel.falecido, BurialModel.jazigo)
            )
        ).scalars().first()

    def update(self, id: int, dados: UpdateBurial) -> BurialModel | None:
        burial_model = self.get_by_id(id)
        if not burial_model:
            return None
        for campo, valor in dados.model_dump(exclude_unset=True).items():
            if campo == "responsible" and isinstance(valor, dict):
                setattr(burial_model, campo, BurialModel(**valor))
                continue
            setattr(burial_model, campo, valor)
        self.db.commit()
        self.db.refresh(burial_model)
        return burial_model

    def delete(self, id: int) -> bool:
        burial_model = self.get_by_id(id)
        if not burial_model:
            return False
        self.db.delete(burial_model)
        self.db.commit()
        return True

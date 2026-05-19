from sqlalchemy.orm import Session
from sqlalchemy import select
from src.modules.jazigos.repository.models import JazigoModel
from src.modules.jazigos.service.schemas import JazigoCreate, JazigoUpdate


class JazigoRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, jazigo: JazigoCreate) -> JazigoModel:
        jazigo_model = JazigoModel(**jazigo.model_dump())

        self.db.add(jazigo_model)
        self.db.commit()
        self.db.refresh(jazigo_model)

        return jazigo_model

    def get_all(self) -> list[JazigoModel]:
        return self.db.execute(select(JazigoModel)).scalars().all()

    def get_by_id(self, jazigo_id: int) -> JazigoModel | None:
        return self.db.execute(
            select(JazigoModel).where(JazigoModel.id == jazigo_id)
        ).scalars().first()

    def update(self, jazigo_id: int, dados: JazigoUpdate) -> JazigoModel | None:
        jazigo_model = self.get_by_id(jazigo_id)
        if not jazigo_model:
            return None
        for campo, valor in dados.model_dump(exclude_unset=True).items():
            setattr(jazigo_model, campo, valor)
        self.db.commit()
        self.db.refresh(jazigo_model)
        return jazigo_model

    def delete(self, jazigo_id: int) -> bool:
        jazigo_model = self.get_by_id(jazigo_id)
        if not jazigo_model:
            return False
        self.db.delete(jazigo_model)
        self.db.commit()
        return True

from sqlalchemy.orm import Session
from sqlalchemy import select, update
from src.modules.responsible.service.schemas import ResponsibleBase
from src.modules.responsible.repository.models import ResponsibleModel


class ResponsibleRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, falecido: ResponsibleModel) -> ResponsibleModel:
        self.db.add(falecido)
        self.db.commit()
        self.db.refresh(falecido)

        return falecido

    def get_all(self) -> list[ResponsibleModel]:
        stmt = select(ResponsibleModel)
        result = self.db.execute(stmt).scalars().all()
        return result  # type: ignore

    def get_by_email(self, email: str) -> ResponsibleModel | None:
        return (
            self.db.execute(
                select(ResponsibleModel).where(ResponsibleModel.email == email)
            )
            .scalars()
            .first()
        )

    def update(self, email: str, dados: ResponsibleModel) -> ResponsibleModel | None:

        payload_dict = ResponsibleBase.model_validate(dados).model_dump()
        stmt = (
            update(ResponsibleModel)
            .where(ResponsibleModel.email == email)
            .values(**payload_dict)
        )
        self.db.execute(stmt)
        self.db.commit()
        return dados

    def delete(self, email: str) -> bool:
        falecido_model = self.get_by_email(email)
        if not falecido_model:
            return False
        self.db.delete(falecido_model)
        self.db.commit()
        return True

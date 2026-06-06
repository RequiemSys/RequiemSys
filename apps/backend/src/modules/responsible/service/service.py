from sqlalchemy.orm import Session
from src.modules.falecidos.repository.repository import FalecidoRepository
from src.modules.responsible.repository.models import ResponsibleModel
from src.modules.responsible.repository.repository import ResponsibleRepository
from src.modules.responsible.service.schemas import (
    ResponsibleCreate,
    ResponsibleUpdate,
    ResponsibleResponse
)


class ResponsibleService:

    def __init__(self, db: Session):
        self.repository = ResponsibleRepository(db)
        self.deceased_repo = FalecidoRepository(db)

    def create(
        self,
        data: ResponsibleCreate
    ) -> ResponsibleResponse:
        responsible_dict = data.model_dump()

        deceased = self.deceased_repo.get_by_id(id=data.deceased_id)

        responsible_dict["deceased"] = deceased

        schema_to_model = ResponsibleModel(**responsible_dict)
        responsible = self.repository.create(schema_to_model)

        return ResponsibleResponse.model_validate(
            responsible,
            from_attributes=True
        )

    def get_all(self) -> list[ResponsibleResponse]:

        responsibles = self.repository.get_all()

        return [
            ResponsibleResponse.model_validate(
                responsible,
                from_attributes=True
            )
            for responsible in responsibles
        ]

    def get_by_email(
        self,
        email: str
    ) -> ResponsibleResponse | None:

        responsible = self.repository.get_by_email(email)
        if not responsible:
            return None

        return ResponsibleResponse.model_validate(
            responsible,
            from_attributes=True
        )

    def update(
        self,
        email: str,
        data: ResponsibleUpdate
    ) -> ResponsibleResponse | None:

        schema_to_model = ResponsibleModel(**data.model_dump())

        responsible = self.repository.update(
            email,
            schema_to_model
        )

        if not responsible:
            return None

        return ResponsibleResponse.model_validate(
            responsible,
            from_attributes=True
        )

    def delete(
        self,
        email: str
    ) -> bool:

        return self.repository.delete(email)

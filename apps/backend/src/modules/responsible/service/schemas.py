import datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator

from src.modules.falecidos.service.schemas import FalecidoResponse


class ResponsibleBase(BaseModel):
    name: str
    birth: datetime.date
    cpf: str | None = None
    kinship: str | None = None
    phone: str | None = None
    email: str | None = None
    address: str | None = None
    deceased_id: int
    deceased: FalecidoResponse
    model_config = ConfigDict(from_attributes=True)


class ResponsibleCreate(ResponsibleBase):
    deceased: FalecidoResponse | None = Field(default=None)


class ResponsibleUpdate(ResponsibleBase):
    pass


class ResponsibleResponse(ResponsibleBase):
    model_config = ConfigDict(from_attributes=True)
    deceased_parent: str | None = Field(default=None)

    @model_validator(mode='after')
    def _fill_deceased_parent(self):
        self.deceased_parent = self.deceased.nome_completo
        return self

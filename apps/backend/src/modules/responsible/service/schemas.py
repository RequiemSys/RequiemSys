import datetime

from pydantic import BaseModel, ConfigDict


class ResponsibleBase(BaseModel):
    name: str
    birth: datetime.date
    cpf: str | None = None
    kinship: str | None = None
    phone: str | None = None
    email: str | None = None
    address: str | None = None
    deceased_id: int

    model_config = ConfigDict(from_attributes=True) 


class ResponsibleCreate(ResponsibleBase):
    pass


class ResponsibleUpdate(ResponsibleBase):
    pass


class ResponsibleResponse(ResponsibleBase):
    pass

    class Config:
        from_attributes = True
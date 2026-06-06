from enum import StrEnum
from pydantic import BaseModel, ConfigDict


class StatusJazigo(StrEnum):
    DISPONIVEL = "disponivel"
    OCUPADO = "ocupado"


class JazigoBase(BaseModel):
    tipo: str
    codigo: str
    localizacao: str
    status: StatusJazigo = StatusJazigo.DISPONIVEL
    observacoes: str | None = None

    model_config = ConfigDict(from_attributes=True)


class JazigoCreate(JazigoBase):
    pass


class JazigoUpdate(JazigoBase):
    tipo: str | None = None
    codigo: str | None = None
    localizacao: str | None = None
    status: StatusJazigo | None = None
    observacoes: str | None = None


class JazigoResponse(JazigoBase):
    id: int | None = None

    class Config:
        from_attributes = True

from __future__ import annotations
import datetime
from typing import TYPE_CHECKING
from enum import StrEnum
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from src.modules.falecidos.service.schemas import FalecidoResponse
    from src.modules.burial.service.schemas import BurialOutput


class StatusJazigo(StrEnum):
    DISPONIVEL = "Disponível"
    OCUPADO = "Ocupado"
    RESERVADO = "Reservado"
    MANUTENCAO = "Em manutenção"


class TipoJazigo(StrEnum):
    INIDIVIDUAL = 'Individual'
    FAMILIAR = 'Familiar'
    PERPETUO = 'Perpétuo'
    OSSARIO = 'Ossário'
    COLUMBARIO = 'Columbário'
    GAVETA = 'Gaveta'


class JazigoBase(BaseModel):
    tipo: TipoJazigo | None = None
    codigo: str
    localizacao: str
    status: StatusJazigo = StatusJazigo.DISPONIVEL
    observacoes: str | None = None
    falecido: "FalecidoResponse | None" = None
    burial: "BurialOutput | None" = None
    data_final_concessao: datetime.date | None = None

    model_config = ConfigDict(from_attributes=True)


class JazigoCreate(JazigoBase):
    pass


class JazigoUpdate(JazigoBase):
    tipo: TipoJazigo | None = None
    codigo: str | None = None
    localizacao: str | None = None
    status: StatusJazigo | None = None
    observacoes: str | None = None


class JazigoResponse(JazigoBase):
    id: int | None = None

    class Config:
        from_attributes = True

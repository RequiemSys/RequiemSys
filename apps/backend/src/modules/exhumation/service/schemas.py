from __future__ import annotations
from typing import TYPE_CHECKING
import datetime
from pydantic import BaseModel, ConfigDict
from enum import StrEnum

if TYPE_CHECKING:
    from src.modules.falecidos.service.schemas import FalecidoResponse


class ExhuamtionReason(StrEnum):
    CREMACAO = "cremacao"
    OSSARIO = "ossario"
    TRANSFERIDO = "transferido"
    INUMADO_TEMPORARIAMENTE = "Inumado"
    NAO_RECLAMADO = "nao_reclamado"
    CANCELADO = 'cancelado'


class ExhumationCreate(BaseModel):
    deceased_id: int
    date: datetime.date
    reason: ExhuamtionReason

    model_config = ConfigDict(from_attributes=True)


class ExhumationUpdate(BaseModel):
    deceased_id: int | None = None
    date: datetime.date | None = None
    reason: ExhuamtionReason | None = None

    model_config = ConfigDict(from_attributes=True)


class ExhumationResponse(BaseModel):
    deceased_id: int
    date: datetime.date
    reason: ExhuamtionReason
    falecido: "FalecidoResponse | None" = None

    model_config = ConfigDict(from_attributes=True)

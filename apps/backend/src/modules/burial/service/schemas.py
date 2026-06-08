from __future__ import annotations
from typing import TYPE_CHECKING
import datetime
from enum import StrEnum
from pydantic import BaseModel, Field

if TYPE_CHECKING:
    from src.modules.falecidos.service.schemas import FalecidoResponse
    from src.modules.jazigos.service.schemas import JazigoResponse


class StatusBurial(StrEnum):
    AGENDAMENTO_PENDENTE = 'Agendamento pendente'


class CreateBurial(BaseModel):
    falecido_id: int
    data_sepultamento: datetime.date
    status: StatusBurial = Field(
        default=StatusBurial.AGENDAMENTO_PENDENTE
        )


class UpdateBurial(BaseModel):
    falecido_id: int | None = Field(default=None)
    data_sepultamento: datetime.date | None = Field(default=None)
    status: StatusBurial | None = Field(default=None)


class BurialOutput(BaseModel):
    id: int
    falecido_id: int | None = Field(default=None)
    data_sepultamento: datetime.date | None = Field(default=None)
    status: StatusBurial | None = Field(default=None)
    falecido: "FalecidoResponse | None" = Field(default=None)
    jazigo: "JazigoResponse | None" = Field(default=None)

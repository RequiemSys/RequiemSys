from __future__ import annotations
from typing import TYPE_CHECKING

import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, ForeignKey, String, Integer
from src.core.database import Base

if TYPE_CHECKING:
    from src.modules.falecidos.repository.models import FalecidoModel
    from src.modules.jazigos.repository.models import JazigoModel


class BurialModel(Base):
    __tablename__ = 'burial'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    falecido_id: Mapped[int] = mapped_column(ForeignKey(
        "falecidos.id",
        ondelete="CASCADE",
        onupdate="CASCADE",
        ), nullable=False)
    data_sepultamento: Mapped[datetime.date] = mapped_column(
        Date(), nullable=False
        )
    status: Mapped[str] = mapped_column(String(100), nullable=False)
    jazigo: Mapped["JazigoModel"] = relationship(
        back_populates="burial",
    )
    falecido: Mapped["FalecidoModel"] = relationship(
        back_populates="burial",
    )

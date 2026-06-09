from __future__ import annotations
from typing import TYPE_CHECKING

import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, ForeignKey, String, Integer
from src.core.database import Base

if TYPE_CHECKING:
    from src.modules.falecidos.repository.models import FalecidoModel


class ExhumationModel(Base):
    __tablename__ = 'exhumation'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    deceased_id: Mapped[int] = mapped_column(ForeignKey(
        "falecidos.id",
        ondelete="CASCADE",
        onupdate="CASCADE"
        ))
    date: Mapped[datetime.date] = mapped_column(Date(), nullable=False)
    reason: Mapped[str] = mapped_column(String(100))
    falecido: Mapped["FalecidoModel"] = relationship(
        back_populates="exhumation"
    )

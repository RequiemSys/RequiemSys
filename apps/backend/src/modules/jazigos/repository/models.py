from __future__ import annotations
import datetime
from typing import TYPE_CHECKING, Optional
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, ForeignKey, String, Integer, Text
from src.core.database import Base

if TYPE_CHECKING:
    from src.modules.burial.repository.models import BurialModel
    from src.modules.falecidos.repository.models import FalecidoModel


class JazigoModel(Base):
    __tablename__ = 'jazigos'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    tipo: Mapped[str] = mapped_column(String(100), nullable=False)
    codigo: Mapped[str] = mapped_column(
        String(50), nullable=False, unique=True
        )
    localizacao: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    falecido: Mapped[Optional["FalecidoModel"]] = relationship(
        back_populates="jazigo",
    )
    burial: Mapped[Optional["BurialModel"]] = relationship(
        back_populates="jazigo",
    )
    data_final_concessao: Mapped[datetime.date] = mapped_column(
        Date(),
        nullable=True
        )
    observacoes: Mapped[str] = mapped_column(Text, nullable=True)
    falecido_id: Mapped[int] = mapped_column(ForeignKey(
        "falecidos.id",
        ondelete="CASCADE",
        onupdate="CASCADE",
        ), nullable=True)
    burial_id: Mapped[int] = mapped_column(ForeignKey(
        "burial.id",
        ondelete="CASCADE",
        onupdate="CASCADE",
        ), nullable=True)

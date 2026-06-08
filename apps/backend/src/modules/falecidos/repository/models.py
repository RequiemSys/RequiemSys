from __future__ import annotations
from typing import TYPE_CHECKING

import datetime
from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Text
from src.core.database import Base

if TYPE_CHECKING:
    from src.modules.responsible.repository.models import ResponsibleModel


class FalecidoModel(Base):
    __tablename__ = 'falecidos'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    nome_completo: Mapped[str] = mapped_column(String(255), nullable=False)
    sexo: Mapped[str] = mapped_column(String(1), nullable=False)
    data_nascimento: Mapped[datetime.date] = mapped_column(
        String(50), nullable=False
        )
    data_falecimento: Mapped[datetime.date] = mapped_column(
        String(50), nullable=False
        )
    naturalidade: Mapped[str] = mapped_column(String(100), nullable=False)
    nacionalidade: Mapped[str] = mapped_column(String(100), nullable=False)
    estado_civil: Mapped[str] = mapped_column(String(50), nullable=False)
    causa_morte: Mapped[str] = mapped_column(String(255), nullable=True)
    nome_mae: Mapped[str] = mapped_column(String(255), nullable=True)
    nome_pai: Mapped[str] = mapped_column(String(255), nullable=True)
    num_declaracao_obito: Mapped[str] = mapped_column(
        String(100), nullable=True
        )
    cpf: Mapped[str] = mapped_column(String(100), nullable=True)
    observacoes: Mapped[str] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(100), nullable=True)
    responsible: Mapped[Optional["ResponsibleModel"]] = relationship(
        back_populates="deceased",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

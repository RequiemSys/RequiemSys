import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, Integer, Text
from src.modules.falecidos.repository.models import FalecidoModel
from src.core.database import Base


class ResponsibleModel(Base):
    __tablename__ = 'responsibles'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    birth: Mapped[datetime.date] = mapped_column(String(50), nullable=False)
    cpf: Mapped[str] = mapped_column(String(255), nullable=True)
    kinship: Mapped[str] = mapped_column(String(100), nullable=True)
    phone: Mapped[str] = mapped_column(Text, nullable=True)
    email: Mapped[str] = mapped_column(String(100), nullable=True)
    address: Mapped[str] = mapped_column(String(100), nullable=True)
    deceased_id: Mapped[int] = mapped_column(
        ForeignKey('falecidos.id', ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False
    )
    deceased: Mapped["FalecidoModel"] = relationship(
        back_populates="responsible",

        )

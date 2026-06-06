from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Text
from src.core.database import Base


class JazigoModel(Base):
    __tablename__ = 'jazigos'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    tipo: Mapped[str] = mapped_column(String(100), nullable=False)
    codigo: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    localizacao: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    observacoes: Mapped[str] = mapped_column(Text, nullable=True)

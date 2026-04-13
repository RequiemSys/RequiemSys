from datetime import date

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer
from src.core.database import Base


class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
        )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    gender: Mapped[str] = mapped_column(String(50))
    birth: Mapped[date] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    phone: Mapped[str] = mapped_column(String(50), unique=True)
    user_type: Mapped[str] = mapped_column(String(25))

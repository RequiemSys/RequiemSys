from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, DateTime
from src.core.database import Base


class EmailLogInfo(Base):
    __tablename__ = "mail_logs"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, unique=True
    )
    email_to: Mapped[str] = mapped_column(String(100))
    email_from: Mapped[str] = mapped_column(String(50))
    send_date: Mapped[datetime] = mapped_column(DateTime, nullable=True)

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.modules.notification.repository.repository import (
    EmailRepository
    )
from src.modules.notification.service.schemas import (
    EmailOutput,
    SendMail
    )
from src.modules.notification.service.service import (
    SendMailService
    )
from src.core.database import get_db


router = APIRouter(prefix="/notificate", tags=["notificate"])


@router.post("/send", response_model=EmailOutput, status_code=201)
def send_notification(
    email_mesasge: SendMail,
    db: Session = Depends(get_db)
):
    repository = EmailRepository(db)
    service = SendMailService(repository)
    return service._smtp_client(email_mesasge)

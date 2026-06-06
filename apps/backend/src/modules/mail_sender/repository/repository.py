from sqlalchemy.orm import Session
from src.modules.mail_sender.repository.models import EmailLogInfo
from src.modules.mail_sender.service.schemas import SendMail


class EmailRepository:
    def __init__(self, db: Session):
        self.db = db

    def log_mail(self, email_message: SendMail) -> EmailLogInfo:
        mail_model = EmailLogInfo(**email_message.model_dump(
            exclude={"message", "subject"}
            ))
        self.db.add(mail_model)
        self.db.commit()
        self.db.refresh(mail_model)
        return mail_model

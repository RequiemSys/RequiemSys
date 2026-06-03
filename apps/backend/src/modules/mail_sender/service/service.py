from pathlib import Path
import smtplib
from typing import Any

from jinja2 import Template
from src.modules.mail_sender.repository.repository import (
    EmailRepository
    )
from src.modules.mail_sender.service.schemas import (
    EmailOutput,
    SendMail
    )
from email.message import EmailMessage
from os import getenv


class SendMailService:
    SMTP_SERVER = getenv("SMPT_SERVER")
    PORT = getenv("PORT")
    USER = getenv("MAIL_USER")
    PASS = getenv("MAIL_PASS")

    def __init__(self, repository: EmailRepository):
        self.repository = repository
        self.email_msg = EmailMessage()

    def _smtp_client(self, mail: SendMail) -> EmailOutput:
        message = self.email_message(data=mail)

        self.repository.log_mail(mail)
        self.email_msg["Subject"] = mail.subject
        self.email_msg["To"] = mail.email_to
        self.email_msg["From"] = mail.email_from
        self.email_msg.set_content(message, subtype="html")

        smtp_server = str(self.SMTP_SERVER)
        port = self.PORT
        user = str(self.USER)
        password = str(self.PASS)

        try:
            with smtplib.SMTP(smtp_server, port) as server:  # type: ignore
                server.starttls()
                server.login(user, password)
                server.send_message(self.email_msg)

            return EmailOutput.model_validate(mail.model_dump())
        except Exception as e:
            raise e

    def email_message(self, data: Any) -> str:
        file_path = Path(__file__).parent / "template.html"
        mail_data = data
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        template = Template(content)
        return template.render(responsible=mail_data)

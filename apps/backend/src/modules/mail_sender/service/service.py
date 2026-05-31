import smtplib
from src.modules.mail_sender.repository.repository import (
    EmailRepository
    )
from src.modules.mail_sender.service.schemas import (
    EmailOutput,
    SendMail
    )
from email.message import EmailMessage


class SendMailService:
    def __init__(self, repository: EmailRepository):
        self.repository = repository
        self.email_msg = EmailMessage()

    def send_notification(self, mail: SendMail) -> EmailOutput:
        self.repository.log_mail(mail)
        self.email_msg["Subject"] = mail.subject
        self.email_msg["To"] = mail.email_to
        self.email_msg["From"] = mail.email_from
        self.email_msg.set_content(mail.message)

        smtp_server = "smtp.gmail.com"
        port = 587
        usuario = "requiem.proj.fatec@gmail.com"
        senha = "nzzm bnyh hnmi bffj"

        with smtplib.SMTP(smtp_server, port) as server:
            server.starttls()
            server.login(usuario, senha)
            server.send_message(self.email_msg)

        return EmailOutput.model_validate(mail.model_dump())

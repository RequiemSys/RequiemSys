from pydantic import BaseModel, Field
from datetime import datetime


class SendMail(BaseModel):
    email_from: str
    email_to: str
    subject: str
    message: str
    send_date: datetime = Field(default=datetime.now())


class EmailOutput(BaseModel):
    email_from: str
    email_to: str

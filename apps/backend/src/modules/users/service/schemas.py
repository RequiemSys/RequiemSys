import datetime
from pydantic import BaseModel


class User(BaseModel):
    name: str
    password: str
    gender: str
    birth: datetime.date
    email: str
    phone: str
    user_type: str


class UserResponse(BaseModel):
    name: str
    email: str

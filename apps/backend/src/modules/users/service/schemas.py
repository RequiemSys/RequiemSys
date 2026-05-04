import datetime
from pydantic import BaseModel, ConfigDict, Field


class User(BaseModel):
    id: int
    name: str
    password: str
    gender: str
    birth: datetime.date
    email: str
    phone: str
    user_type: str

    model_config = ConfigDict(from_attributes=True)


class UserCreateInput(BaseModel):
    name: str
    password: str
    gender: str
    birth: datetime.date
    email: str
    phone: str
    user_type: str = Field(default="employee")

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    name: str | None = Field(default=None)
    password: str | None = Field(default=None)
    gender: str | None = Field(default=None)
    birth: datetime.date | None = Field(default=None)
    email: str | None = Field(default=None)
    phone: str | None = Field(default=None)

    model_config = ConfigDict(from_attributes=True)


class UserResponse(BaseModel):
    name: str
    email: str

    model_config = ConfigDict(from_attributes=True)


class UserInfosOutput(BaseModel):
    name: str
    gender: str
    birth: datetime.date
    email: str
    phone: str

from typing import Protocol
from modules.users.application.schemas import User
from src.modules.users.infra.models import User as UserModel
from sqlalchemy.orm import Session


class IUserRepository(Protocol):
    def create_user(
        self,
        user: User,
        db: Session
    ): ...


class UserRepository():

    def __init__(self, db: Session):
        self.db = db

    def create_user(self, db_user: User):
        user_model = UserModel(**db_user.model_dump())

        self.db.add(user_model)
        self.db.commit()
        self.db.refresh(user_model)

        return db_user

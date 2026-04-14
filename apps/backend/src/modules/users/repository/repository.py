from typing import Protocol
from src.modules.users.service.schemas import User
from src.modules.users.repository.models import UserModel
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

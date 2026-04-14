from typing import Protocol

from sqlalchemy import select
from src.modules.users.service.schemas import User
from src.modules.users.repository.models import UserModel
from sqlalchemy.orm import Session


class IUserRepository(Protocol):
    def create_user(
        self,
        user: User,
        db: Session
    ): ...

    def _get_user_hashed_password(self, user_model: UserModel):
        ...


class UserRepository():

    def __init__(self, db: Session):
        self.db = db

    def create_user(self, db_user: User):
        user_model = UserModel(**db_user.model_dump())

        self.db.add(user_model)
        self.db.commit()
        self.db.refresh(user_model)

        return db_user
    
    def _get_user_hashed_password(self, db_user: User):
        user_model = UserModel(**db_user.model_dump())
        user_from_db = select(user_model).where(UserModel.email.ilike(user_model.email))

        self.db.execute(select(user_model().password).where()).scalars().one



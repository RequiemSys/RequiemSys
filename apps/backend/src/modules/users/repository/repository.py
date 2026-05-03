from py_compile import PyCompileError
from typing import Protocol, cast

from sqlalchemy import CursorResult, select, update
from src.modules.users.service.schemas import User, UserUpdate
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


class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user_schema: User) -> User:
        user_model = UserModel(**user_schema.model_dump())

        self.db.add(user_model)
        self.db.commit()
        self.db.refresh(user_model)

        return user_schema
    
    def get_user_hashed_password(self, user_schema: User) -> str|None:
        user_model = UserModel(**user_schema.model_dump())
        stmt = select(UserModel.password).where(UserModel.email.ilike(user_model.email))

        return self.db.execute(stmt).scalar()

    def get_user_by_email(self, email: str) -> User:
        stmt = select(UserModel).where(UserModel.email.ilike(email))
        res = self.db.execute(stmt).scalar()
        if res:
            return User.model_validate(res)
        raise ValueError(f"email: {email} não localizado")
    

    def update_user(self, user_schema: UserUpdate, email: str):
        user_dict = user_schema.model_dump(exclude_none=True)
        try:
            stmt = update(UserModel).where(
                    UserModel.email.ilike(email)
                    ).values(user_dict)
            result = self.db.execute(stmt)
            self.db.commit()
            rowcount = cast(CursorResult, result).rowcount
            
            if rowcount == 0:
                raise ValueError("Nenhum usuário foi atualizado (e-mail não encontrado).")
            else:
                return f"{rowcount} registro(s) atualizado(s)."
        except Exception as e:
            self.db.rollback()
            raise e
from typing import Protocol
from src.modules.users.service.schemas import User, UserCreateInput, UserResponse, UserUpdate
from src.modules.users.repository.repository import UserRepository
from src.auth.security import EncryptModel


class IUserService(Protocol):
    def create_user(self, repository: UserRepository): ...


class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, user: UserCreateInput):
        hasher = EncryptModel.hash_password
        final_user = user.model_copy(update={"password": hasher(user.password)})
        return self.repository.create_user(final_user)

    def update_user(self, user: UserUpdate, email: str):
        if user.password:
            hasher = EncryptModel.hash_password
            final_user = user.model_copy(update={"password": hasher(user.password)})
            return self.repository.update_user(email=email, user_schema=final_user)
        return self.repository.update_user(email=email, user_schema=user)

    def delete_user(self, user_email: str):
        get_user = self.repository.get_user_by_email(user_email)
        if get_user:
            return self.repository.delete_user(get_user.email)
        raise ValueError("Usuário não encontrado")

    def list_all_users(self) -> list[UserResponse]:
        users_list = self.repository.list_users()
        return [
            UserResponse.model_validate(users_list[x]) for x in range(len(users_list))
        ]

    def get_by_email(self, email: str):
       return self.repository.get_user_by_email(email)
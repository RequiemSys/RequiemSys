from typing import Protocol
from src.modules.users.service.schemas import User
from src.modules.users.repository.repository import UserRepository
from src.core.security import EncryptModel


class IUserService(Protocol):
    def create_user(self, repository: UserRepository): ...


class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, user: User):
        hasher = EncryptModel().hash_password
        final_user = user.model_copy(update={"password": hasher(user.password)})
        return self.repository.create_user(final_user)

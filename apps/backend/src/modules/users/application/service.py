from typing import Protocol
from modules.users.application.schemas import User
from modules.users.infra.repository import UserRepository


class IUserService(Protocol):
    def create_user(self, repository: UserRepository):
        ...


class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, user: User):
        return self.repository.create_user(user)

from typing import Protocol
from service.schemas import User
from repository.repository import UserRepository


class IUserService(Protocol):
    def create_user(self, repository: UserRepository): ...


class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, user: User):
        return self.repository.create_user(user)

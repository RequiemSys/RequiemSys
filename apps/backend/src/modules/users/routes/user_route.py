from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from modules.users.service.schemas import User, UserResponse
from modules.users.service.service import UserService
from modules.users.repository.repository import UserRepository

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create_user", response_model=UserResponse)
def create_user(
    user: User,
    db: Session = Depends(get_db)
):
    repository = UserRepository(db)
    service = UserService(repository)

    return service.create_user(user)

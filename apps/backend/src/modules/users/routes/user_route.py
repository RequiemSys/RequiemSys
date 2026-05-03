from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from core.database import get_db
from modules.users.service.schemas import User, UserResponse, UserUpdate
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

@router.patch("/update_user")
def update_user_partially(
    email: str = Body(),
    user_update: UserUpdate = Body(),
    db: Session = Depends(get_db)
):  
    try: 
        repository = UserRepository(db)
        service = UserService(repository=repository)

        service.update_user(user_update, email)
        return JSONResponse(content={"msg": "Alterado com sucesso!"}, status_code=200)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
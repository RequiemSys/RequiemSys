from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from core.database import get_db
from modules.users.service.schemas import (
    UserCreateInput,
    UserInfosOutput,
    UserResponse,
    UserUpdate,
)
from modules.users.service.service import UserService
from modules.users.repository.repository import UserRepository

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create_user", response_model=UserResponse)
def create_user(user: UserCreateInput, db: Session = Depends(get_db)):
    repository = UserRepository(db)
    service = UserService(repository)

    return service.create_user(user)


@router.patch("/update_user")
def update_user_partially(
    email: str = Body(), user_update: UserUpdate = Body(), db: Session = Depends(get_db)
):
    try:
        repository = UserRepository(db)
        service = UserService(repository=repository)

        service.update_user(user_update, email)
        return JSONResponse(content={"msg": "Alterado com sucesso!"}, status_code=200)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/delete")
def delete_user_by_email(email: str = Query(), db: Session = Depends(get_db)):
    try:
        repository = UserRepository(db)
        service = UserService(repository=repository)

        service.delete_user(email)
        return JSONResponse(content="usuário deletado")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/list_all")
def list_all(db: Session = Depends(get_db)):
    repository = UserRepository(db)
    service = UserService(repository=repository)

    return service.list_all_users()


@router.get("/user", response_model=UserInfosOutput)
def get_by_mail(db: Session = Depends(get_db), email: str = Query()):
    repository = UserRepository(db)
    service = UserService(repository=repository)

    return service.get_by_email(email)

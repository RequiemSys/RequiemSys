from fastapi import APIRouter, Depends, Response
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from core.database import get_db
from modules.users.service.schemas import UserResponse
from auth.security import AuthService
from modules.users.repository.repository import UserRepository

auth_router = APIRouter(tags=["security"])


@auth_router.post("/login", response_model=UserResponse)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
    ):
        try:
                repository = UserRepository(db=db)
                auth_service = AuthService(repository)

                token = auth_service.create_access_token(
                        username=form_data.username,
                        password=form_data.password
                        )

                response.set_cookie(
                        key="access_token",
                        value=token,
                        httponly=True,
                        secure=True,
                        samesite="lax"
                        )
                return JSONResponse(content={"message":"Login bem-sucedido!"}, status_code=200)
        
        except ValueError:
                return JSONResponse(content={"message":"e-mail ou senha inválido"}, status_code=401)

@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return JSONResponse(content={"message":"Logout bem-sucedido!"}, status_code=200)

from fastapi import APIRouter
from modules.users.routes import user_route
#incluir todas as rotas aqui

api_router = APIRouter()

api_router.include_router(user_route.router)

from fastapi import APIRouter
from modules.users.routes import user_route
from modules.falecidos.routes import falecido_route
#incluir todas as rotas aqui

api_router = APIRouter()

api_router.include_router(user_route.router)
api_router.include_router(falecido_route.router)

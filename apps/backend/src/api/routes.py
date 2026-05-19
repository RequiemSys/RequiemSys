from fastapi import APIRouter
from modules.responsible.routes import responsible_route
from modules.users.routes import user_route
from modules.falecidos.routes import falecido_route
from modules.jazigos.routes import jazigo_route

#incluir todas as rotas aqui

api_router = APIRouter()

api_router.include_router(user_route.router)
api_router.include_router(falecido_route.router)
api_router.include_router(responsible_route.router)
api_router.include_router(jazigo_route.router)

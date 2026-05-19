from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import routes
from auth.security import AuthService
from auth import router

app = FastAPI()

app.include_router(
    routes.api_router,
    prefix="/api/v1",
    # dependencies=[Depends(AuthService.get_current_user)]
    )

app.include_router(router.auth_router, prefix="/api/v1/auth")

origins = ["http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

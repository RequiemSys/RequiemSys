from fastapi import FastAPI
from api import routes

app = FastAPI()

app.include_router(routes.api_router, prefix="/api/v1")
print("MAIN CERTO SENDO EXECUTADO")

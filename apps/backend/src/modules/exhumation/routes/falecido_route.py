from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from src.modules.responsible.repository.repository import ResponsibleRepository
from src.core.database import get_db
from src.modules.falecidos.service.schemas import (
    FalecidoCreate, FalecidoUpdate, FalecidoResponse
    )
from src.modules.falecidos.service.service import FalecidoService
from src.modules.falecidos.repository.repository import FalecidoRepository

router = APIRouter(prefix="/falecidos", tags=["falecidos"])


def _service(db: Session) -> FalecidoService:
    return FalecidoService(FalecidoRepository(db), ResponsibleRepository(db))


@router.post("/", response_model=FalecidoResponse, status_code=201)
def create_falecido(
    falecido: FalecidoCreate,
    db: Session = Depends(get_db)
):
    return _service(db).create_falecido(falecido)


@router.get("/")
def get_falecidos(
    cpf: str | None = Query(default=None),
    db: Session = Depends(get_db)
):
    service = _service(db)

    if cpf:
        return service.get_falecido_by_cpf(cpf)

    return service.get_all_falecidos()


@router.put("/", response_model=FalecidoResponse)
def update_falecido(
    dados: FalecidoUpdate,
    cpf: str = Query(),
    db: Session = Depends(get_db)
):
    return _service(db).update_falecido(cpf, dados)


@router.delete("/delete")
def delete_falecido(
    cpf: str = Query(),
    db: Session = Depends(get_db)
):
    return _service(db).delete_falecido(cpf)

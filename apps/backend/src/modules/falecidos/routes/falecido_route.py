from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db
from src.modules.falecidos.service.schemas import FalecidoCreate, FalecidoUpdate, FalecidoResponse
from src.modules.falecidos.service.service import FalecidoService
from src.modules.falecidos.repository.repository import FalecidoRepository

router = APIRouter(prefix="/falecidos", tags=["falecidos"])


@router.post("/", response_model=FalecidoResponse, status_code=201)
def create_falecido(
    falecido: FalecidoCreate,
    db: Session = Depends(get_db)
):
    repository = FalecidoRepository(db)
    service = FalecidoService(repository)
    return service.create_falecido(falecido)


@router.get("/", response_model=list[FalecidoResponse])
def get_all_falecidos(
    db: Session = Depends(get_db)
):
    repository = FalecidoRepository(db)
    service = FalecidoService(repository)
    return service.get_all_falecidos()


@router.get("/{falecido_id}", response_model=FalecidoResponse)
def get_falecido(
    falecido_id: int,
    db: Session = Depends(get_db)
):
    repository = FalecidoRepository(db)
    service = FalecidoService(repository)
    return service.get_falecido_by_id(falecido_id)


@router.put("/{falecido_id}", response_model=FalecidoResponse)
def update_falecido(
    falecido_id: int,
    dados: FalecidoUpdate,
    db: Session = Depends(get_db)
):
    repository = FalecidoRepository(db)
    service = FalecidoService(repository)
    return service.update_falecido(falecido_id, dados)


@router.delete("/{falecido_id}")
def delete_falecido(
    falecido_id: int,
    db: Session = Depends(get_db)
):
    repository = FalecidoRepository(db)
    service = FalecidoService(repository)
    return service.delete_falecido(falecido_id)

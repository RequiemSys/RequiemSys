from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from src.modules.jazigos.service.schemas import JazigoResponse
from src.core.database import get_db
from src.modules.burial.service.schemas import (
    CreateBurial, BurialOutput, UpdateBurial
    )
from src.modules.burial.service.service import FalecidoService
from src.modules.burial.repository.repository import BurialRepository
from src.modules.falecidos.service.schemas import FalecidoResponse

FalecidoResponse.model_rebuild()
CreateBurial.model_rebuild()
BurialOutput.model_rebuild()
UpdateBurial.model_rebuild()
JazigoResponse.model_rebuild()

router = APIRouter(prefix="/burial", tags=["burial"])


def _service(db: Session) -> FalecidoService:
    return FalecidoService(BurialRepository(db))


@router.post("/", response_model=BurialOutput, status_code=201)
def create_falecido(
    falecido: CreateBurial,
    db: Session = Depends(get_db)
):
    return _service(db).create(falecido)


@router.get("/")
def get_falecidos(
    id: int | None = Query(default=None),
    db: Session = Depends(get_db)
):
    service = _service(db)

    if id:
        return service.get_burial_by_id(id)

    return service.get_all()


@router.put("/", response_model=BurialOutput)
def update_falecido(
    dados: UpdateBurial,
    id: int = Query(),
    db: Session = Depends(get_db)
):
    return _service(db).update(id, dados)


@router.delete("/delete")
def delete_falecido(
    id: int = Query(),
    db: Session = Depends(get_db)
):
    return _service(db).delete(id)


@router.get('/count')
def count(
    db: Session = Depends(get_db)
):
    return _service(db).count()

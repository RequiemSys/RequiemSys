from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from src.core.database import get_db

from src.modules.exhumation.service.schemas import (
    ExhumationCreate, ExhumationUpdate, ExhumationResponse
)
from src.modules.exhumation.service.service import ExhumationService
from src.modules.exhumation.repository.repository import ExhumationRepository

from src.modules.falecidos.service.schemas import FalecidoResponse
from src.modules.burial.service.schemas import BurialOutput
from src.modules.jazigos.service.schemas import JazigoResponse

FalecidoResponse.model_rebuild()
BurialOutput.model_rebuild()
JazigoResponse.model_rebuild()
ExhumationCreate.model_rebuild()
ExhumationUpdate.model_rebuild()
ExhumationResponse.model_rebuild()

router = APIRouter(prefix="/exhumation", tags=["exhumation"])


def _service(db: Session) -> ExhumationService:
    return ExhumationService(ExhumationRepository(db))


@router.post("/", response_model=ExhumationResponse, status_code=201)
def create(
    exhumation: ExhumationCreate,
    db: Session = Depends(get_db)
):
    return _service(db).create(exhumation)


@router.get("/")
def get(
    id: int | None = Query(default=None),
    db: Session = Depends(get_db)
):
    service = _service(db)

    if id:
        return service.get_by_id(id)

    return service.get_all()


@router.put("/", response_model=ExhumationResponse)
def update_falecido(
    dados: ExhumationUpdate,
    id: int = Query(),
    db: Session = Depends(get_db)
):
    return _service(db).update(id, dados)

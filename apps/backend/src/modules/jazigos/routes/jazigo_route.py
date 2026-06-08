from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.modules.burial.service.schemas import BurialOutput
from src.core.database import get_db
from src.modules.jazigos.service.schemas import (
    JazigoCreate, JazigoUpdate, JazigoResponse
    )
from src.modules.jazigos.service.service import JazigoService
from src.modules.jazigos.repository.repository import JazigoRepository
from src.modules.falecidos.service.schemas import FalecidoResponse

FalecidoResponse.model_rebuild()
JazigoCreate.model_rebuild()
JazigoUpdate.model_rebuild()
JazigoResponse.model_rebuild()
BurialOutput.model_rebuild()

router = APIRouter(prefix="/jazigos", tags=["jazigos"])


@router.post("/", response_model=JazigoResponse, status_code=201)
def create_jazigo(
    jazigo: JazigoCreate,
    db: Session = Depends(get_db)
):
    repository = JazigoRepository(db)
    service = JazigoService(repository)
    return service.create_jazigo(jazigo)


@router.get("/", response_model=list[JazigoResponse])
def get_all_jazigos(
    db: Session = Depends(get_db)
):
    repository = JazigoRepository(db)
    service = JazigoService(repository)
    return service.get_all_jazigos()


@router.get("/{jazigo_id}", response_model=JazigoResponse)
def get_jazigo(
    jazigo_id: int,
    db: Session = Depends(get_db)
):
    repository = JazigoRepository(db)
    service = JazigoService(repository)
    return service.get_jazigo_by_id(jazigo_id)


@router.put("/{jazigo_id}", response_model=JazigoResponse)
def update_jazigo(
    jazigo_id: int,
    dados: JazigoUpdate,
    db: Session = Depends(get_db)
):
    repository = JazigoRepository(db)
    service = JazigoService(repository)
    return service.update_jazigo(jazigo_id, dados)


@router.delete("/{jazigo_id}")
def delete_jazigo(
    jazigo_id: int,
    db: Session = Depends(get_db)
):
    repository = JazigoRepository(db)
    service = JazigoService(repository)
    return service.delete_jazigo(jazigo_id)

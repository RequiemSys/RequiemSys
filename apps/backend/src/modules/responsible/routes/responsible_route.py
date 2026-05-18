from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.core.database import get_db

from src.modules.responsible.service.service import ResponsibleService

from src.modules.responsible.service.schemas import (
    ResponsibleCreate,
    ResponsibleUpdate,
    ResponsibleResponse
)

router = APIRouter(
    prefix='/responsaveis',
    tags=['Responsáveis']
)


@router.post(
    '/',
    response_model=ResponsibleResponse
)
def create_responsible(
    data: ResponsibleCreate,
    db: Session = Depends(get_db)
):

    service = ResponsibleService(db)

    return service.create(data=data)


@router.get(
    '/',
    response_model=list[ResponsibleResponse]
)
def get_all_responsibles(
    db: Session = Depends(get_db)
):

    service = ResponsibleService(db)

    return service.get_all()


@router.get(
    '/by-email',
    response_model=ResponsibleResponse
)
def get_responsible_by_email(
    email: str,
    db: Session = Depends(get_db)
):

    service = ResponsibleService(db)

    responsible = service.get_by_email(email)

    if not responsible:

        raise HTTPException(
            status_code=404,
            detail='Responsável não encontrado'
        )

    return responsible


@router.put(
    '/',
    response_model=ResponsibleResponse
)
def update_responsible(
    email: str,
    data: ResponsibleUpdate,
    db: Session = Depends(get_db)
):

    service = ResponsibleService(db)

    responsible = service.update(
        email,
        data
    )

    if not responsible:

        raise HTTPException(
            status_code=404,
            detail='Responsável não encontrado'
        )

    return responsible


@router.delete('/')
def delete_responsible(
    email: str,
    db: Session = Depends(get_db)
):

    service = ResponsibleService(db)

    deleted = service.delete(email)

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail='Responsável não encontrado'
        )

    return {
        'message': 'Responsável removido com sucesso'
    }
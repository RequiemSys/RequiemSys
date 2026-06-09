from src.modules.exhumation.service.schemas import (
    ExhumationCreate,
    ExhumationResponse,
    ExhumationUpdate
    )
from src.modules.exhumation.repository.repository import ExhumationRepository
from fastapi import HTTPException, status


class ExhumationService:
    def __init__(
            self,
            repository: ExhumationRepository,
            ):
        self.repository = repository

    def create(self, exhumation: ExhumationCreate):
        return self.repository.create(exhumation)

    def get_all(self) -> list[ExhumationResponse]:
        exhumation_list = self.repository.get_all()
        return [
            ExhumationResponse.model_validate(exhumation) for
            exhumation in exhumation_list
            ]

    def get_by_id(self, id: int) -> ExhumationResponse:
        exhumation = self.repository.get_by_id(id)
        if not exhumation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return ExhumationResponse.model_validate(exhumation)

    def update(self, id: int, dados: ExhumationUpdate):
        exhumation = self.repository.update(id, dados)
        if not exhumation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return exhumation

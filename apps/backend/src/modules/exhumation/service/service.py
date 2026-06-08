from typing import Protocol
from src.modules.responsible.repository.repository import ResponsibleRepository
from src.modules.falecidos.service.schemas import (
    FalecidoCreate,
    FalecidoResponse,
    FalecidoUpdate
    )
from src.modules.falecidos.repository.repository import FalecidoRepository
from fastapi import HTTPException, status


class IFalecidoService(Protocol):
    def create_falecido(self, falecido: FalecidoCreate): ...
    def get_all_falecidos(self): ...
    def get_falecido_by_id(self, falecido_id: int): ...
    def update_falecido(self, falecido_id: int, dados: FalecidoUpdate): ...
    def delete_falecido(self, falecido_id: int): ...


class FalecidoService:
    def __init__(
            self,
            repository: FalecidoRepository,
            responsible_repo: ResponsibleRepository
            ):
        self.repository = repository
        self.responsible_repo = responsible_repo

    def create_falecido(self, falecido: FalecidoCreate):
        return self.repository.create(falecido)

    def get_all_falecidos(self) -> list[FalecidoResponse]:
        deceased_list = self.repository.get_all()
        return [
            FalecidoResponse.model_validate(deceased) for
            deceased in deceased_list
            ]

    def get_falecido_by_cpf(self, cpf: str) -> FalecidoResponse:
        falecido = self.repository.get_by_cpf(cpf)
        if not falecido:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return FalecidoResponse.model_validate(falecido)

    def update_falecido(self, cpf: str, dados: FalecidoUpdate):
        falecido = self.repository.update(cpf, dados)
        if not falecido:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return falecido

    def delete_falecido(self, cpf: str):
        falecido = self.repository.get_by_cpf(cpf)

        if falecido:
            responsible = self.responsible_repo.get_by_parent_id(
                parent_id=falecido.id
                )
            self.responsible_repo.delete(
                responsible.email
                ) if responsible else None
            deleted = self.repository.delete(falecido.cpf)

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return {"message": "Falecido removido com sucesso"}

from typing import Protocol
from src.modules.falecidos.service.schemas import (
    FalecidoCreate,
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
    def __init__(self, repository: FalecidoRepository):
        self.repository = repository

    def create_falecido(self, falecido: FalecidoCreate):
        return self.repository.create(falecido)

    def get_all_falecidos(self):
        return self.repository.get_all()

    def get_falecido_by_cpf(self, cpf: str):
        falecido = self.repository.get_by_cpf(cpf)
        if not falecido:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return falecido

    def update_falecido(self, cpf: str, dados: FalecidoUpdate):
        falecido = self.repository.update(cpf, dados)
        if not falecido:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return falecido

    def delete_falecido(self, cpf: str):
        deleted = self.repository.delete(cpf)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return {"message": "Falecido removido com sucesso"}

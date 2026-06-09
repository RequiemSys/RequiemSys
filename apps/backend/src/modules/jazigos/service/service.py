from typing import Protocol
from fastapi import HTTPException, status
from src.modules.jazigos.service.schemas import JazigoCreate, JazigoUpdate
from src.modules.jazigos.repository.repository import JazigoRepository


class IJazigoService(Protocol):
    def create_jazigo(self, jazigo: JazigoCreate): ...
    def get_all_jazigos(self): ...
    def get_jazigo_by_id(self, jazigo_id: int): ...
    def update_jazigo(self, jazigo_id: int, dados: JazigoUpdate): ...
    def delete_jazigo(self, jazigo_id: int): ...
    def count(self) -> int: ...


class JazigoService:
    def __init__(self, repository: JazigoRepository):
        self.repository = repository

    def create_jazigo(self, jazigo: JazigoCreate):
        return self.repository.create(jazigo)

    def get_all_jazigos(self):
        return self.repository.get_all()

    def get_jazigo_by_id(self, jazigo_id: int):
        jazigo = self.repository.get_by_id(jazigo_id)
        if not jazigo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Jazigo não encontrado"
            )
        return jazigo

    def update_jazigo(self, jazigo_id: int, dados: JazigoUpdate):
        jazigo = self.repository.update(jazigo_id, dados)
        if not jazigo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Jazigo não encontrado"
            )
        return jazigo

    def delete_jazigo(self, jazigo_id: int):
        deletado = self.repository.delete(jazigo_id)
        if not deletado:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Jazigo não encontrado"
            )
        return {"message": "Jazigo removido com sucesso"}

    def count(self) -> int:
        count = self.repository.count_avaible()
        return count

from src.modules.burial.repository.repository import BurialRepository
from src.modules.burial.service.schemas import (
    CreateBurial,
    BurialOutput,
    UpdateBurial
    )
from fastapi import HTTPException, status


class FalecidoService:
    def __init__(
            self,
            repository: BurialRepository,
            ):
        self.repository = repository

    def create(self, burial: CreateBurial):
        return self.repository.create(burial)

    def get_all(self) -> list[BurialOutput]:
        deceased_list = self.repository.get_all()
        return [
            BurialOutput.model_validate(deceased) for
            deceased in deceased_list
            ]

    def get_burial_by_id(self, id: int) -> BurialOutput:
        burial = self.repository.get_by_id(id)
        if not burial:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return BurialOutput.model_validate(burial)

    def update(self, id: int, dados: UpdateBurial):
        burial = self.repository.update(id, dados)
        if not burial:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Falecido não encontrado"
            )
        return burial

    def delete(self, id: int):
        deleted = self.repository.delete(id)

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Não encontrado"
            )
        return {"message": "Removido com sucesso"}

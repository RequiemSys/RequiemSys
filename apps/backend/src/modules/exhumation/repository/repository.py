from typing import Any

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from src.modules.responsible.repository.models import ResponsibleModel
from src.modules.falecidos.repository.models import FalecidoModel
from src.modules.falecidos.service.schemas import (
    FalecidoCreate,
    FalecidoUpdate
    )


class FalecidoRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, falecido: FalecidoCreate) -> FalecidoModel:
        falecido_model = FalecidoModel(**falecido.model_dump())

        self.db.add(falecido_model)
        self.db.commit()
        self.db.refresh(falecido_model)

        return falecido_model

    def get_all(self) -> list[FalecidoModel]:
        stmt = select(FalecidoModel).options(
                joinedload(FalecidoModel.responsible)
            )
        result = self.db.execute(stmt).scalars().all()
        return result  # type: ignore

    def get_by_cpf(self, cpf: str) -> FalecidoModel | None:
        return self.db.execute(
            select(FalecidoModel).where(FalecidoModel.cpf == cpf).options(
                joinedload(FalecidoModel.responsible)
            )
        ).scalars().first()

    def get_by_id(self, id: Any) -> FalecidoModel | None:
        return self.db.execute(
            select(FalecidoModel).where(FalecidoModel.id == id)
        ).scalars().first()

    def update(self, cpf: str, dados: FalecidoUpdate) -> FalecidoModel | None:
        falecido_model = self.get_by_cpf(cpf)
        if not falecido_model:
            return None
        for campo, valor in dados.model_dump(exclude_unset=True).items():
            if campo == "responsible" and isinstance(valor, dict):
                setattr(falecido_model, campo, ResponsibleModel(**valor))
                continue
            setattr(falecido_model, campo, valor)
        self.db.commit()
        self.db.refresh(falecido_model)
        return falecido_model

    def delete(self, cpf: str) -> bool:
        falecido_model = self.get_by_cpf(cpf)
        if not falecido_model:
            return False
        self.db.delete(falecido_model)
        self.db.commit()
        return True

import datetime
from pydantic import BaseModel, ConfigDict, Field
from enum import StrEnum
from typing import Optional

from src.modules.responsible.service.schemas import ResponsibleOutput


class StatusFalecido(StrEnum):
    SEPULTAMENTO_PENDENTE = "sepultamento pendente"
    AGUARDANDO_DOCUMENTACAO = "aguardando documentacao"
    EM_VELORIO = "em velorio"
    SEPULTADO = "sepultado"
    CREMADO = "cremado"
    APTO_PARA_EXUMACAO = "apto para exumacao"
    EXUMADO = "exumado"
    OSSARIO = "ossario"
    TRANSFERIDO = "transferido"
    INUMADO_TEMPORARIAMENTE = "inumado temporariamente"
    NAO_RECLAMADO = "nao reclamado"


class FalecidoCreate(BaseModel):
    nome_completo: str
    sexo: str
    data_nascimento: datetime.date
    data_falecimento: datetime.date
    naturalidade: str
    nacionalidade: str
    estado_civil: str
    causa_morte: str
    nome_mae: str
    nome_pai: str
    num_declaracao_obito: str
    cpf: str
    observacoes: str
    status: StatusFalecido = Field(
        default=StatusFalecido.SEPULTAMENTO_PENDENTE
        )


class FalecidoUpdate(BaseModel):
    nome_completo: Optional[str] = None
    sexo: Optional[str] = None
    data_nascimento: Optional[datetime.date] = None
    data_falecimento: Optional[datetime.date] = None
    naturalidade: Optional[str] = None
    nacionalidade: Optional[str] = None
    estado_civil: Optional[str] = None
    causa_morte: Optional[str] = None
    nome_mae: Optional[str] = None
    nome_pai: Optional[str] = None
    num_declaracao_obito: Optional[str] = None
    cpf: Optional[str] = None
    observacoes: Optional[str] = None
    status: Optional[StatusFalecido] = None
    responsible: Optional[ResponsibleOutput] = None


class FalecidoResponse(BaseModel):
    id: Optional[int] = None
    nome_completo: Optional[str] = None
    sexo: Optional[str] = None
    data_nascimento: Optional[datetime.date] = None
    data_falecimento: Optional[datetime.date] = None
    naturalidade: Optional[str] = None
    nacionalidade: Optional[str] = None
    estado_civil: Optional[str] = None
    causa_morte: Optional[str] = None
    nome_mae: Optional[str] = None
    nome_pai: Optional[str] = None
    num_declaracao_obito: Optional[str] = None
    cpf: Optional[str] = None
    observacoes: Optional[str] = None
    status: Optional[StatusFalecido] = None
    responsible: Optional[ResponsibleOutput] = None

    model_config = ConfigDict(from_attributes=True)

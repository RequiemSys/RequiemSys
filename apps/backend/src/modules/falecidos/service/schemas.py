import datetime
from pydantic import BaseModel


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
    observacoes: str


class FalecidoUpdate(BaseModel):
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
    observacoes: str


class FalecidoResponse(BaseModel):
    id: int
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
    observacoes: str

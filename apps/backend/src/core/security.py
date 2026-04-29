import os
from typing import Any

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import jwt
from passlib.context import CryptContext


class EncryptModel:

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def hash_password(self, password: str) -> str:
        return self.pwd_context.hash(password)

    def verify_password(
            self,
            plain_password: str,
            hashed_password: str
    ) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)

class AuthService:

    secret_key = str(os.getenv("SECRET_KEY"))
    algorithm = str(os.getenv("ALGORITHM"))
    OAUTH2_SCHEME = OAuth2PasswordBearer(tokenUrl="token")

    async def get_curren_user(self, token: str = Depends(OAUTH2_SCHEME)) -> dict[str, Any]:
        try:
            payload = jwt.decode(token, secret_key=self.secret_key, algorithms=[self.algorithm])
            user_id = payload.get("sub")
            if user_id is None:
                raise HTTPException(status_code=401, detail="Invalid Token")
            return {"user_id":user_id}
        except jwt.PyJWTError:
            raise HTTPException(status_code=401, detail="Token expirado ou inválido")
        
    def _authenticate_user(self, username: str, password: str): ...  # TODO: Implementar lógica para autenticar user comparando o que vem do OAuth2PasswordRequestForm na rota com o que está no banco
                                                                    # Aqui deve-se usar o verificador de senha hash para consultar no banco se a senha está correta
    def create_access_token(self, data):
        self._authenticate_user('lala', 'popo')
        ... # TODO: Implementar lógica para gerar acces token e enviar para angular via Cookie HTTP ONLY

        # exemplo:

        # @app.post("/token")
        # async def login(response: Response):
        #     # ... lógica de autenticação ...
            
        #     response.set_cookie(
        #         key="access_token", 
        #         value="seu_jwt_aqui", 
        #         httponly=True,   # Impede acesso via JS
        #         secure=True,     # Exige HTTPS
        #         samesite="lax"   # Proteção contra CSRF
        #     )
        #     return {"message": "Login bem-sucedido"}


from datetime import datetime, timedelta, timezone
import os
from typing import Any

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import jwt
from passlib.context import CryptContext

from modules.users.repository.repository import UserRepository
from modules.users.service.schemas import User


class EncryptModel:

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def hash_password(cls, password: str) -> str:
        return cls.pwd_context.hash(password)

    @classmethod
    def verify_password(
            cls,
            plain_password: str,
            hashed_password: str
    ) -> str | None:
        if cls.pwd_context.verify(plain_password, hashed_password):
            return plain_password
        return None

class AuthService:

    def __init__(self, user_repo: UserRepository) -> None:
        self._user_repo = user_repo

    secret_key = str(os.getenv("SECRET_KEY"))
    algorithm = str(os.getenv("ALGORITHM"))
    OAUTH2_SCHEME = OAuth2PasswordBearer(tokenUrl="token")
    expire_minutes = str(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

    async def get_current_user(self, token: str = Depends(OAUTH2_SCHEME)) -> dict[str, Any]:
        try:
            payload = jwt.decode(token, secret_key=self.secret_key, algorithms=[self.algorithm])
            user_id = payload.get("sub")
            if user_id is None:
                raise HTTPException(status_code=401, detail="Invalid Token")
            return {"user_id":user_id}
        except jwt.PyJWTError:
            raise HTTPException(status_code=401, detail="Token expirado ou inválido")
        
    def _authenticate_user(self, username: str, password: str) -> User | None:
        try:
            user = self._user_repo.get_user_by_email(email=username)
            
            hashed_password = self._user_repo.get_user_hashed_password(user)

            verified_password = EncryptModel.verify_password(
                hashed_password=hashed_password,
                plain_password=password
                ) if hashed_password else None

            if verified_password is not None:
                return user
            raise ValueError('Senha incorreta')
        except ValueError:
            raise ValueError("e-mail ou senha inválido")

    def create_access_token(self, username: str, password: str) -> str:
        user = self._authenticate_user(username=username, password=password)
        
        if user:
            is_admin = False
            if user.user_type == 'admin':
                is_admin = True

            expire = datetime.now(timezone.utc) + timedelta(minutes=float(self.expire_minutes))
            
            payload = {
                "sub":str(user.id),
                "exp": expire,
                "admin": is_admin,
                "iat": datetime.now(timezone.utc)

                }
            return jwt.encode(payload=payload, key=self.secret_key, algorithm=self.algorithm)
        raise ValueError("user not found")
        



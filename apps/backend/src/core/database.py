import os
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

db_url = str(os.getenv("DATABASE_URL"))

engine = create_engine(db_url, echo=True, pool_pre_ping=True)

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


Base = declarative_base()

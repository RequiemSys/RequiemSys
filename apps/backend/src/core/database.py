import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

load_dotenv()
db_url = str(os.getenv("DATABASE_URL"))

engine = create_engine(db_url, echo=True, pool_pre_ping=True)

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)

Base = declarative_base()

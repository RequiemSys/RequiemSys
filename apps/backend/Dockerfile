FROM python:3.11-slim

WORKDIR /apps/backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt fastapi uvicorn sqlalchemy pymysql cryptography
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "./src"]
BACK_DIR = apps/backend
FRONT_DIR = apps/frontend

BACK_VENV = $(BACK_DIR)/.venv
BACK_PYTHON = $(BACK_VENV)/bin/python
BACK_PIP = $(BACK_VENV)/bin/pip

.PHONY: all install install-back install-front run run-back run-front clean

# 1. COMANDOS DE INSTALAÇÃO
install: install-back install-front

install-back:
	@echo "==> Configurando Backend Python..."
	python3 -m venv $(BACK_VENV)
	$(BACK_PIP) install --upgrade pip
	$(BACK_PIP) install -r $(BACK_DIR)/requirements.txt

install-front:
	@echo "==> Instalando dependências do Angular..."
	cd $(FRONT_DIR) && npm install

.PHONY: up down logs migrate makemigrations shell

up:
	docker compose up -d

down:
	docker compose down

down-volume:
	docker compose down -v

logs:
	docker compose logs -f app

migrate:
	docker exec -it fastapi_app alembic upgrade head

makemigrations:
	docker exec -it fastapi_app alembic revision --autogenerate -m "auto migration"

shell:
	docker exec -it fastapi_app bash

stop:
	docker compose stop
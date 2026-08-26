FROM node:20-alpine AS frontend-builder

ARG VITE_STRIPE_PK
ENV VITE_API_ROOT=
ENV VITE_STRIPE_PK=${VITE_STRIPE_PK}

WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
RUN npm run build


FROM python:3.14-alpine
LABEL author=vietanhhd03@gmail.com

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/

RUN apk update && apk --no-cache add \
    build-base \
    gcc \
    g++ \
    libc-dev \
    libffi-dev \
    libxslt-dev \
    linux-headers

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY pyproject.toml uv.lock docker-entrypoint.sh ./
RUN uv sync --frozen --no-dev

COPY . /app/
COPY --from=frontend-builder /app/client/build /app/client/build
RUN chmod u+x docker-entrypoint.sh

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8080
ENTRYPOINT ["sh", "docker-entrypoint.sh"]

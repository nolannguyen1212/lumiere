FROM python:3.12-alpine
LABEL author=vietanhhd03@gmail.com

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/

RUN apk update && apk --no-cache add \
    build-base \
    gcc \
    g++ \
    libc-dev \
    libffi-dev \
    libxslt-dev \
    linux-headers

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY pyproject.toml uv.lock docker-entrypoint.sh ./
RUN uv sync --frozen --no-dev

COPY . /app/
RUN chmod u+x docker-entrypoint.sh

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8080
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
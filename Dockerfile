FROM python:3.12-alpine
LABEL author=vietanhhd03@gmail.com

WORKDIR /app/

RUN apk update && apk --no-cache add \
    build-base \
    gcc \
    g++ \
    libc-dev \
    libffi-dev \
    mariadb-dev \
    libxslt-dev \
    linux-headers

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY Pipfile Pipfile.lock docker-entrypoint.sh ./
RUN pip3 install --upgrade pip
RUN pip3 install pipenv
RUN pipenv install

COPY . ./
RUN chmod u+x docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
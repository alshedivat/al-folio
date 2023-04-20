build:
  docker-compose build

stop:
  docker-compose down || true

dev: build stop
  docker-compose up -d
  docker-compose logs -f server

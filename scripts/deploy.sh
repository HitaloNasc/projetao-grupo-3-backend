#!/bin/bash

CONTAINER_NAME="top-drivers-backend"
IMAGE_NAME="top-drivers-backend"
DB_URL="mongodb+srv://questcards:QuestCards2025@questcards.g5afm.mongodb.net/questcards-api"

echo "=== Parando o contêiner (se estiver em execução) ==="
docker stop $CONTAINER_NAME || true

echo "=== Removendo o contêiner (se existir) ==="
docker rm $CONTAINER_NAME || true

echo "=== Removendo a imagem (se existir) ==="
docker rmi $IMAGE_NAME || true

echo "=== Buildando a imagem ==="
docker build -t $IMAGE_NAME .

echo "=== Iniciando o contêiner ==="
docker run -d \
    -e DATABASE_URL="$DB_URL" \
    --name $CONTAINER_NAME \
    -p 3000:3000 \
    $IMAGE_NAME

echo "=== Deploy finalizado. Execute 'docker logs -f $CONTAINER_NAME' para acompanhar os logs ==="

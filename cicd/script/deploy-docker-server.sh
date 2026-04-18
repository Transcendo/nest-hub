#!/bin/sh
set -e

cleanup() {
  rm -f /tmp/deploy-docker-server.sh 2>/dev/null || true
}
trap cleanup EXIT

if [ -z "${CI_PROJECT_NAME:-}" ]; then
  echo "CI_PROJECT_NAME 未定义或为空，无法继续执行部署操作。"
  exit 1
fi

if [ -z "${LOWER_DOCKER_IMAGE_NAME}" ]; then
  LOWER_DOCKER_IMAGE_NAME="$(printf '%s' "${DOCKER_IMAGE_NAME}" | tr '[:upper:]' '[:lower:]')"
fi

if [ -z "${CONTAINER_PORT}" ]; then
  CONTAINER_PORT="${APPLICATION_PORT}"
fi

echo "登录 Docker Registry"
echo "${CI_JOB_TOKEN}" | docker login --username "${CI_REGISTRY_USER}" --password-stdin "${CI_REGISTRY}"

echo "下载最新镜像"
docker pull "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}"

echo "停止并删除已有容器"
if docker ps -aq --filter "name=^${CI_PROJECT_NAME}$" | grep -q .; then
  docker stop "${CI_PROJECT_NAME}" 2>/dev/null || true
  docker rm "${CI_PROJECT_NAME}" 2>/dev/null || true
  echo "已停止并删除容器：${CI_PROJECT_NAME}"
else
  echo "容器 ${CI_PROJECT_NAME} 不存在，跳过删除"
fi

echo "启动新容器"
RUN_ARGS="-d \
  --name=${CI_PROJECT_NAME} \
  --restart=unless-stopped \
  -e TZ=Asia/Shanghai \
  -p ${APPLICATION_PORT}:${CONTAINER_PORT} \
  -h ${CI_PROJECT_NAME}"

if [ -n "${LOG_DIR}" ]; then
  RUN_ARGS="${RUN_ARGS} -v ${LOG_DIR}:/app/logs"
fi

docker run ${RUN_ARGS} "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}"

echo "等待容器启动..."
sleep 3

if ! docker ps --filter "name=^${CI_PROJECT_NAME}$" --filter "status=running" | grep -q "${CI_PROJECT_NAME}"; then
  echo "容器启动失败，查看日志："
  docker logs --tail 50 "${CI_PROJECT_NAME}" 2>&1 || true
  exit 1
fi

echo "容器启动成功"

echo "清理旧镜像"
docker images "${LOWER_DOCKER_IMAGE_NAME}" --format "{{.ID}} {{.Tag}}" | while read -r id tag; do
  if [ "${tag}" != "${DOCKER_IMAGE_VERSION}" ]; then
    docker rmi "${LOWER_DOCKER_IMAGE_NAME}:${tag}" 2>/dev/null || true
  fi
done

docker image prune -f 2>/dev/null || true

echo "部署完成"

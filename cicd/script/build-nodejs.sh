#!/bin/sh
set -e

if [ -z "${DOCKERFILE_PATH}" ]; then
  echo "DOCKERFILE_PATH 未设置，无法继续构建" >&2
  exit 1
fi

if [ ! -f "${DOCKERFILE_PATH}" ]; then
  echo "Dockerfile 不存在：${DOCKERFILE_PATH}" >&2
  exit 1
fi

WORK_DIR="${WORK_PROJECT_NAME_DIR}"
if [ -z "${WORK_DIR}" ]; then
  WORK_DIR="${CI_PROJECT_DIR}"
fi

if [ ! -d "${WORK_DIR}" ]; then
  echo "WORK_PROJECT_NAME_DIR 无效：${WORK_DIR}" >&2
  exit 1
fi

cd "${WORK_DIR}"

echo "准备 Docker"
if command -v apk >/dev/null 2>&1; then
  sed -i 's#https\?://dl-cdn.alpinelinux.org/alpine#https://mirrors.tuna.tsinghua.edu.cn/alpine#g' /etc/apk/repositories || true
  apk add --no-cache docker-cli git
fi

echo "准备 Node.js 与 pnpm"
corepack enable
corepack prepare "pnpm@${PNPM_VERSION:-10.30.2}" --activate

if [ -n "${NPM_REGISTRY_URL}" ]; then
  pnpm config set registry "${NPM_REGISTRY_URL}"
fi

if [ -z "${PNPM_STORE_PATH}" ]; then
  PNPM_STORE_PATH=".pnpm-store"
fi
pnpm config set store-dir "${PNPM_STORE_PATH}"

echo "安装依赖"
pnpm install --frozen-lockfile

echo "登录 Docker Registry"
echo "${CI_JOB_TOKEN}" | docker login --username "${CI_REGISTRY_USER}" --password-stdin "${CI_REGISTRY}"

echo "构建静态产物"
pnpm build
rm -rf cicd/docker/dist
mkdir -p cicd/docker
cp -r out cicd/docker/dist

echo "构建 Docker 镜像"
docker build -f "${DOCKERFILE_PATH}" \
  -t "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}" \
  -t "${LOWER_DOCKER_IMAGE_NAME}:${CI_COMMIT_BRANCH}-latest" \
  "${WORK_DIR}"

echo "推送 Docker 镜像"
docker push "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}"
docker push "${LOWER_DOCKER_IMAGE_NAME}:${CI_COMMIT_BRANCH}-latest"

echo "清理本地 Docker 镜像"
docker rmi "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}" 2>/dev/null || true
docker rmi "${LOWER_DOCKER_IMAGE_NAME}:${CI_COMMIT_BRANCH}-latest" 2>/dev/null || true
docker image prune -f 2>/dev/null || true

echo "构建完成"

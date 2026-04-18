#!/bin/sh
set -e

BRANCH_NAME="${CI_COMMIT_BRANCH}"
if [ -z "${BRANCH_NAME}" ]; then
  BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
fi

case "${BRANCH_NAME}" in
  main|*-main) PROFILE="pro" ;;
  test|*-test) PROFILE="test" ;;
  *)
    echo "未知的分支：${BRANCH_NAME}，无法确定部署环境" >&2
    exit 1
    ;;
esac
export PROFILE

LOWER_DOCKER_IMAGE_NAME="$(printf '%s' "${DOCKER_IMAGE_NAME}" | tr '[:upper:]' '[:lower:]')"
export LOWER_DOCKER_IMAGE_NAME

if [ -z "${CONTAINER_PORT}" ]; then
  CONTAINER_PORT="${APPLICATION_PORT}"
fi
export CONTAINER_PORT

if [ -z "${NACOS_ENABLED}" ]; then
  NACOS_ENABLED="false"
fi
export NACOS_ENABLED

echo "========== 构建环境信息 =========="
echo "PROFILE: ${PROFILE}"
echo "CI_PROJECT_NAME: ${CI_PROJECT_NAME}"
echo "WORK_PROJECT_NAME_DIR: ${WORK_PROJECT_NAME_DIR}"
echo "DOCKER_IMAGE_NAME: ${DOCKER_IMAGE_NAME}"
echo "LOWER_DOCKER_IMAGE_NAME: ${LOWER_DOCKER_IMAGE_NAME}"
echo "DOCKER_IMAGE_VERSION: ${DOCKER_IMAGE_VERSION}"
echo "APPLICATION_PORT: ${APPLICATION_PORT}"
echo "CONTAINER_PORT: ${CONTAINER_PORT}"
echo "NACOS_ENABLED: ${NACOS_ENABLED}"
echo "=================================="

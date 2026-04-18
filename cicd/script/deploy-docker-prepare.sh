#!/bin/sh
set -e

echo "准备部署变量"

if [ -z "${NACOS_ENABLED}" ]; then
  NACOS_ENABLED="false"
fi
export NACOS_ENABLED

case "${PROFILE}" in
  pro)
    DEPLOYER_IP="${DEPLOYER_PRO_IP}"
    ;;
  test)
    DEPLOYER_IP="${DEPLOYER_TEST_IP}"
    ;;
  *)
    echo "不支持的 PROFILE：${PROFILE}" >&2
    exit 1
    ;;
esac

if [ -z "${DEPLOYER_IP}" ]; then
  echo "未找到匹配的部署 IP" >&2
  exit 1
fi

export DEPLOYER_IP

echo "========== 部署环境信息 =========="
echo "PROFILE: ${PROFILE}"
echo "DEPLOYER_IP: ${DEPLOYER_IP}"
echo "DOCKER_IMAGE_NAME: ${DOCKER_IMAGE_NAME}"
echo "DOCKER_IMAGE_VERSION: ${DOCKER_IMAGE_VERSION}"
echo "APPLICATION_PORT: ${APPLICATION_PORT}"
echo "CONTAINER_PORT: ${CONTAINER_PORT}"
echo "=================================="

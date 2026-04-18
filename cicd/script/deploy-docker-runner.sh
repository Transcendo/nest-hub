#!/bin/sh
set -e

echo "在远程服务器上执行容器部署脚本（支持多台机器）"

DEPLOY_SUCCESS=true
FAILED_HOSTS=""

OLD_IFS="${IFS}"
IFS=","
set -- ${DEPLOYER_IP}
IFS="${OLD_IFS}"

for IP in "$@"; do
  if [ -z "${IP}" ]; then
    continue
  fi

  echo "========================================"
  echo "开始部署到服务器：${IP}"
  echo "========================================"

  if ! scp -o StrictHostKeyChecking=no -o ConnectTimeout=30 \
      cicd/script/deploy-docker-server.sh "deployer@${IP}:/tmp/deploy-docker-server.sh"; then
    echo "复制部署脚本到 ${IP} 失败"
    DEPLOY_SUCCESS=false
    FAILED_HOSTS="${FAILED_HOSTS} ${IP}"
    continue
  fi

  if ! ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 "deployer@${IP}" \
      CI_PROJECT_NAME="${CI_PROJECT_NAME}" \
      CI_REGISTRY_USER="${CI_REGISTRY_USER}" \
      CI_REGISTRY="${CI_REGISTRY}" \
      CI_JOB_TOKEN="${CI_JOB_TOKEN}" \
      DOCKER_IMAGE_NAME="${DOCKER_IMAGE_NAME}" \
      LOWER_DOCKER_IMAGE_NAME="${LOWER_DOCKER_IMAGE_NAME}" \
      DOCKER_IMAGE_VERSION="${DOCKER_IMAGE_VERSION}" \
      APPLICATION_PORT="${APPLICATION_PORT}" \
      CONTAINER_PORT="${CONTAINER_PORT}" \
      LOG_DIR="${LOG_DIR}" \
      sh /tmp/deploy-docker-server.sh; then
    echo "部署到服务器 ${IP} 失败！"
    DEPLOY_SUCCESS=false
    FAILED_HOSTS="${FAILED_HOSTS} ${IP}"
    continue
  fi

  echo "部署到服务器 ${IP} 成功！"
done

echo "========================================"
if [ "${DEPLOY_SUCCESS}" = "true" ]; then
  echo "所有服务器部署成功"
else
  echo "以下服务器部署失败：${FAILED_HOSTS}"
  exit 1
fi

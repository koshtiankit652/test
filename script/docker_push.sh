#!/bin/bash
docker tag ${DOCKER_REPO}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${DOCKER_REPO}:${IMAGE_TAG}
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${DOCKER_REPO}:${IMAGE_TAG}
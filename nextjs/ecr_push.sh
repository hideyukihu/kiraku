#!/bin/zsh

GIT_COMMIT_ID=$(git log --format="%H" -n 1)
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin <858251030787/kiraku?region=ap-northeast-1>
docker build -t kiraku:"${GIT_COMMIT_ID}" -f Dockerfile.prod .
docker tag kiraku:"${GIT_COMMIT_ID}" <858251030787/kiraku?region=ap-northeast-1>:"${GIT_COMMIT_ID}"
docker push <858251030787/kiraku?region=ap-northeast-1>:"${GIT_COMMIT_ID}"

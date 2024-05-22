#!/usr/bin/env sh
set -e

ORIGIN=$(pwd)

HERE=$(dirname $0)
cd $HERE

docker build -t my-blog-rss-generator:latest .
docker run --rm --user $(id -u):$(id -g) -v ${PWD}:/home my-blog-rss-generator python /home/generate.py

cd $ORIGIN

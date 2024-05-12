#!/usr/bin/env sh

ORIGIN=$(pwd)

HERE=$(dirname $0)
cd $HERE

echo $HERE

docker build -t my-blog-rss-generator:latest .
docker run --rm --user $(id -u):$(id -g) -v ${PWD}:/home my-blog-rss-generator python /home/generate.py

cd $ORIGIN

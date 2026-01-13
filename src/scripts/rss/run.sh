#!/usr/env/bin sh
set -ex

cd $(dirname $0)
cd $(git rev-parse --show-toplevel)

__RSS_PATH=src/rss
cd $__RSS_PATH

# update rss xml and generate
docker compose run --rm --user "$(id -u):$(id -g)" rss python generate.py

# copy
cd $(git rev-parse --show-toplevel)
cp $__RSS_PATH/dist/rss.md docs/rss.md

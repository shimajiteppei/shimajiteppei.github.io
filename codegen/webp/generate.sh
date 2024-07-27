#!/use/env/bin sh
set -e

ORIGIN=$(pwd)

HERE=$(dirname $0)
cd $HERE

IMAGE_DIR=$(git rev-parse --show-toplevel)/docs/static/images
cd $IMAGE_DIR
find . -type f -name '*.webp' | xargs -I {} rm -f {}
find . -type f ! -name '*.webp' | xargs -I {} cwebp {} -o {}.webp

cd $ORIGIN

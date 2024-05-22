#!/use/env/bin sh
set -e

ORIGIN=$(pwd)

HERE=$(dirname $0)
cd $HERE

__XP_SCSS_PATH=./xp.scss
echo '.xp-css { ' > $__XP_SCSS_PATH
wget -qO- https://unpkg.com/xp.css >> $__XP_SCSS_PATH
echo ' }' >> $__XP_SCSS_PATH

cd $ORIGIN

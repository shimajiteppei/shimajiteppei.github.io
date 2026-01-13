#!/use/env/bin sh
set -ex

HERE=$(dirname $0)
cd $HERE
cd $(git rev-parse --show-toplevel)

__XP_SCSS_PATH=$HERE/xp.scss

# download
{
  echo '.xp-css { '
  wget -qO- https://unpkg.com/xp.css
  echo ' }'
} > $__XP_SCSS_PATH

# compile
sass --no-source-map $__XP_SCSS_PATH docs/static/stylesheets/xp.css

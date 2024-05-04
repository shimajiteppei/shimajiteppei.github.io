#!/use/env/bin sh

__XP_SCSS_PATH=$1
echo '.xp-css { ' > $__XP_SCSS_PATH
wget -qO- https://unpkg.com/xp.css >> $__XP_SCSS_PATH
echo ' }' >> $__XP_SCSS_PATH

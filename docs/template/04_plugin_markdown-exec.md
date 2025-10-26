---
title: 04_plugin_markdown-exec
description:
    - https://pawamoy.github.io/markdown-exec/
---

```pycon exec="1" source="console"
>>> print("Hello Markdown!")
```

---

```sh exec="1" result="ansi" source="material-block"
mkdocs --help
```

---

```sh exec="1" source="material-block"
echo Markdown is **cool**
```

---

```sh exec="1" result="ansi"
#!/bin/bash
# credits to https://github.com/42picky/42picky.github.io
text="xYz"  # Some test text
echo -e "\n                40m   41m   42m   43m   44m   45m   46m   47m"
for FGs in '    m' '   1m' '  30m' '1;30m' '  31m' '1;31m' '  32m' \
           '1;32m' '  33m' '1;33m' '  34m' '1;34m' '  35m' '1;35m' \
           '  36m' '1;36m' '  37m' '1;37m'; do
    FG=${FGs// /}
    echo -en " $FGs \033[$FG  ${text}  "
    for BG in 40m 41m 42m 43m 44m 45m 46m 47m; do
        echo -en "$EINS \033[$FG\033[${BG} ${text} \033[0m"
    done
    echo
done
echo
```

---

```pyodide
import micropip
await micropip.install("cowsay")

import cowsay
cowsay.cow("Hello World")
```

---

````md exec="1" source="tabbed-left" tabs="Markdown|Rendered"
```tree
root1            # comment 1
    file1
    dir1
        file
    dir2
        file1    # comment 2
        file2    # comment 3
    file2
    file3
root2
    file1
```
````

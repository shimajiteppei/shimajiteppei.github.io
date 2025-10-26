---
title: 03_plugin_table-reader
description:
    - https://timvink.github.io/mkdocs-table-reader-plugin/
---

# table reader

import static file

```
{{ read_csv('template/sample.csv') }}
```

{{ read_csv('template/sample.csv') }}

---

# table sort

To enable tablesort by extra.js, import assets before render.

```html
<!-- tablesort -->
<script
    defer
    src="https://cdn.jsdelivr.net/npm/tablesort/dist/tablesort.min.js"
></script>
<script
    defer
    src="https://cdn.jsdelivr.net/npm/tablesort/dist/sorts/tablesort.number.min.js"
></script>
```

<!-- tablesort -->
<script defer src="https://cdn.jsdelivr.net/npm/tablesort/dist/tablesort.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/tablesort/dist/sorts/tablesort.number.min.js"></script>

| a   | b   | c   |
| --- | --- | --- |
| 1   | 3   | 2   |
| 2   | 2   | 2   |

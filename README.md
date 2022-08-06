# tomoesaturn's blog

install

```bash
docker pull squidfunk/mkdocs-material
```

dev

```bash
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

build

```bash
docker run --rm -v ${PWD}:/docs squidfunk/mkdocs-material build
```

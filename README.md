# tomoesaturn's blog

install

```bash
docker pull squidfunk/mkdocs-material
npm install
```

dev

```bash
# docker
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material

# npm
npm run dev
```

textlint

```bash
npm run lint
```

build

```bash
# docker
docker run --rm -v ${PWD}:/docs squidfunk/mkdocs-material build

# npm
npm run build
```

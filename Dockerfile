FROM squidfunk/mkdocs-material:latest
RUN pip install \
    mkdocs-git-revision-date-localized-plugin \
    mkdocs-awesome-pages-plugin \
    mkdocs-glightbox \
    mkdocs-table-reader-plugin \

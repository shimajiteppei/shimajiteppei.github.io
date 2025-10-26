// https://github.com/squidfunk/mkdocs-material/issues/6196
document$.subscribe(async () => {
    // https://github.com/tristen/tablesort
    if (typeof Tablesort !== "undefined") {
        document
            .querySelectorAll("article table:not(.highlight)")
            .forEach((it) => new Tablesort(it));
    }

    // https://katex.org/
    if (typeof renderMathInElement !== "undefined") {
        document
            .querySelectorAll(".language-math")
            .forEach((it) => renderMathInElement(it, { ignoredTags: [] }));
    }
});

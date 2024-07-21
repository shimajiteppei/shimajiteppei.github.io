WebFont.load({
    google: {
        families: ['M PLUS 1p:400,700', 'Roboto Mono']
    }
});

// https://github.com/squidfunk/mkdocs-material/issues/6196
document$.subscribe(() => {
    // テーブルソート
    // https://github.com/tristen/tablesort
    document
        .querySelectorAll("article table:not(.highlight)")
        .forEach((it) => new Tablesort(it));

    // Katexレンダリング
    document
        .querySelectorAll(".language-math")
        .forEach((it) => renderMathInElement(it, { ignoredTags: [] }));
});

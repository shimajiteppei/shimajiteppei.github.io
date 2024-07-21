// https://github.com/squidfunk/mkdocs-material/issues/6196
document$.subscribe(() => {
    // 記事ページのHeadingに章番号を自動で振る
    const isArticle = document.location.pathname.startsWith("/article");
    if (isArticle) {
        document
            .querySelectorAll("h1, h2, h3, h4, h5, h6")
            .forEach((it, index) => {
                it.classList.add("article-page");
            });
    }

    // 外部リンクを新しいタブで開く
    document.querySelectorAll("a[href^='http']").forEach((it) => {
        it.setAttribute("target", "_blank");
        it.setAttribute("rel", "noopener noreferrer");
    });

    // テーブルソート https://github.com/tristen/tablesort
    document
        .querySelectorAll("article table:not(.highlight)")
        .forEach((it) => new Tablesort(it));

    // katex
    document.querySelectorAll(".language-math").forEach((it) => {
        window.renderMathInElement(it, { ignoredTags: [] });
    });
});

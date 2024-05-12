// 記事ページのHeadingに章番号を自動で振る
$(document).ready(function () {
    const isArticle = document.location.pathname.startsWith("/article");
    if (isArticle) {
        $("h1").addClass("article-page");
        $("h2").addClass("article-page");
        $("h3").addClass("article-page");
        $("h4").addClass("article-page");
        $("h5").addClass("article-page");
        $("h6").addClass("article-page");
    }
});

// 外部リンクを新しいタブで開く
$(document).ready(function () {
    $('a[href^="http"]')
        .attr("target", "_blank")
        .attr("rel", "noopener noreferrer");
});

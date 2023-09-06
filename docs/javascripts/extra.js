$(document).ready(function() {
  const isArticle = document.location.pathname.startsWith("/blog/article");
  if (isArticle) {
    $('h1').addClass('article-page');
    $('h2').addClass('article-page');
    $('h3').addClass('article-page');
    $('h4').addClass('article-page');
    $('h5').addClass('article-page');
    $('h6').addClass('article-page');
  }
});

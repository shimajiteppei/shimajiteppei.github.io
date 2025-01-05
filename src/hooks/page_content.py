import html.parser
import re


# HTML編集用の基底クラス
# get_modified_html() で編集後のHTMLを取得できる
# https://docs.python.org/3/library/html.parser.html#html.parser.HTMLParser
class HTMLProcessor(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.modified_html = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        attrs = ' '.join(f'{key}="{value}"' for key, value in attrs.items())
        self.modified_html.append(f'<{tag} {attrs}>')

    def handle_endtag(self, tag):
        self.modified_html.append(f'</{tag}>')

    def handle_data(self, data):
        self.modified_html.append(data)

    def handle_entityref(self, name):
        self.modified_html.append(f'&{name};')

    def handle_charref(self, name):
        self.modified_html.append(f'&#{name};')

    def handle_comment(self, data):
        self.modified_html.append(f'<!--{data}-->')

    def handle_decl(self, decl):
        self.modified_html.append(f'<!{decl}>')

    def handle_pi(self, data):
        self.modified_html.append(f'<?{data}>')

    def get_modified_html(self):
        return ''.join(self.modified_html)


# 外部リンクに target="_blank" rel="noopener" を追加する
class LinkProcessor(HTMLProcessor):
    def __init__(self):
        super().__init__()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs and re.match(r'^http', attrs['href']):
            attrs['target'] = '_blank'
            attrs['rel'] = 'noopener'

        attrs = ' '.join(f'{key}="{value}"' for key, value in attrs.items())
        self.modified_html.append(f'<{tag} {attrs}>')


def add_target_blank(html_content):
    parser = LinkProcessor()
    parser.feed(html_content)
    return parser.get_modified_html()


# Headingに章番号用のクラスを自動で振る
class HeadingProcessor(HTMLProcessor):
    def __init__(self):
        super().__init__()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1' or tag == 'h2' or tag == 'h3' or tag == 'h4' or tag == 'h5' or tag == 'h6':
            attrs['class'] = attrs.get('class', '') + ' article-page'

        attrs = ' '.join(f'{key}="{value}"' for key, value in attrs.items())
        self.modified_html.append(f'<{tag} {attrs}>')


def add_article_class(html_content):
    parser = HeadingProcessor()
    parser.feed(html_content)
    return parser.get_modified_html()


# HTMLの内容を書き換えるフック
# https://www.mkdocs.org/dev-guide/plugins/#on_page_content
def on_page_content(html_content, page, config, files):
    modified_html = add_target_blank(html_content)

    print(page.url)
    if page.url.startswith('article'):
        modified_html = add_article_class(modified_html)

    return modified_html

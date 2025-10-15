import requests
import feedparser  # type: ignore
import yaml
import glob
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape
from dataclasses import dataclass
import datetime


CONFIG_YAML: str = "config.yaml"
TEMPLATES_DIR: str = "templates"
TEMPLATE_FILE: str = "rss.md"
DOWNLOADS_DIR: str = "downloads"
DIST_DIR: str = "dist"
DIST_FILE: str = "rss.md"
MAX_SAVE_DAYS: int = 31


@dataclass
class ConfigFeedType:
    feed_id: str
    feed_url: str


@dataclass
class ConfigTopicType:
    topic_id: str
    topic_list: list[ConfigFeedType]


@dataclass
class ConfigType:
    rss_list: list[ConfigTopicType]


@dataclass
class TemplateFeedType:
    title: str
    link: str


@dataclass
class TemplateMergedFeedType:
    date: str
    feed_list: list[TemplateFeedType]


@dataclass
class TemplateTopicFeeds:
    topic_id: str
    feed_list: list[TemplateFeedType]


@dataclass
class TemplateDateGroup:
    date: str
    topics: list[TemplateTopicFeeds]


@dataclass
class TemplateType:
    rss_list: list[TemplateDateGroup]


# RSSフィードの設定ファイルを読み込み、パースされた設定オブジェクトを返す
def read_config(config_yaml: Path) -> ConfigType:
    with config_yaml.open(encoding="utf-8", mode="r") as yaml_file:
        config = yaml.safe_load(yaml_file)

    return ConfigType(
        rss_list=[
            ConfigTopicType(
                topic_id=topic["topic_id"],
                topic_list=[
                    ConfigFeedType(
                        feed_id=feed["feed_id"],
                        feed_url=feed["feed_url"],
                    )
                    for feed in topic["topic_list"]
                ],
            )
            for topic in config["rss_list"]
        ]
    )


# 保存するRSSフィードのファイル名を生成する
def get_feed_filename(
    topic_id: str, feed_id: str, feed_last_updated: datetime.date
) -> str:
    feed_last_updated_str = feed_last_updated.strftime("%Y%m%d")
    return f"{feed_last_updated_str}@{topic_id}@{feed_id}.xml"


# RSSフィードを更新する
def update(config: ConfigType, downloads_dir: Path):
    # 最新のRSSフィードを取得し、保存する
    for topic in config.rss_list:
        for feed in topic.topic_list:
            feed_content = requests.get(feed.feed_url).content

            d = feedparser.parse(feed_content)
            try:
                u = d.feed.updated_parsed
                last_updated = datetime.date(u.tm_year, u.tm_mon, u.tm_mday)
            except:
                last_updated = datetime.date.today()
            filename = get_feed_filename(
                topic_id=topic.topic_id,
                feed_id=feed.feed_id,
                feed_last_updated=last_updated,
            )
            output_filapath = downloads_dir.joinpath(filename)

            if not output_filapath.exists():
                with output_filapath.open(encoding="utf-8", mode="w") as output_file:
                    output_file.write(feed_content.decode("utf-8"))

    # 更新日時がMAX_SAVE_DAYSより前のフィードは削除する
    filelist = glob.glob("*@*@*.xml", root_dir=str(downloads_dir))
    for file in filelist:
        date_str = file.split("@")[0]
        date_parsed = datetime.datetime.strptime(date_str, "%Y%m%d").date()
        day_elapsed = (datetime.date.today() - date_parsed).days
        if day_elapsed > MAX_SAVE_DAYS:
            downloads_dir.joinpath(file).unlink(missing_ok=True)


# downloads_dirから、topic_idに対応するRSSフィードのリストを日付順にグルーピングして取得する。
# feed_idで分類はしない。同一topic_idでURLが重複しないようにする。
def list_file_for_topic_id(
    topic_id: str, downloads_dir: Path
) -> list[TemplateMergedFeedType]:
    # topic_idに対応するファイル名のリストを取得し、日付昇順にソートする
    filelist = glob.glob(f"*@{topic_id}@*.xml", root_dir=str(downloads_dir))
    filelist.sort()

    # 日付ごとにフィードをグルーピングする
    date_feed_map: dict[str, list[TemplateFeedType]] = {}
    exclude_urls: list[str] = []
    for file in filelist:
        date = file.split("@")[0]
        with open(downloads_dir.joinpath(file), encoding="utf-8", mode="r") as f:
            d = feedparser.parse(f.read())

        # URLが重複する場合は追加しない。
        # filelistは日付昇順にソートしているため、URLに重複が合った場合は過去のフィードが優先される
        def filter_url(x):
            return x.link not in exclude_urls

        # 更新日時がMAX_SAVE_DAYSより前のフィードは追加しない
        def filter_day(x):
            u = x.updated_parsed
            last_updated = datetime.date(u.tm_year, u.tm_mon, u.tm_mday)
            day_elapsed = (datetime.date.today() - last_updated).days
            return day_elapsed <= MAX_SAVE_DAYS

        feed_list = list(
            filter(lambda x: filter_url(x), filter(lambda y: filter_day(y), d.entries))
        )

        exclude_urls.extend([x.link for x in feed_list])
        typed_feed_list = [
            TemplateFeedType(title=feed.title, link=feed.link) for feed in feed_list
        ]

        if date not in date_feed_map:
            date_feed_map[date] = typed_feed_list
        else:
            date_feed_map[date].extend(typed_feed_list)

    # 日付ごとにフィードをグルーピングしたリストを生成する
    merged_feed_list = [
        TemplateMergedFeedType(date=date, feed_list=feed_list)
        for date, feed_list in date_feed_map.items()
    ]
    # 日付の降順にソートして返す
    merged_feed_list.sort(key=lambda x: x.date, reverse=True)
    return merged_feed_list


# RSSフィードの設定ファイルを読み込み、保存されたRSSフィードのリストを生成する
def get_template(config: ConfigType, downloads_dir: Path) -> TemplateType:
    topic_and_feeds: list[tuple[str, list[TemplateMergedFeedType]]] = []
    for topic in config.rss_list:
        feeds = list_file_for_topic_id(
            topic_id=topic.topic_id, downloads_dir=downloads_dir
        )
        topic_and_feeds.append((topic.topic_id, feeds))

    date_grouped: dict[str, list[TemplateTopicFeeds]] = {}
    for topic_id, merged_feed_list in topic_and_feeds:
        for merged_feed in merged_feed_list:
            date = merged_feed.date
            if date not in date_grouped:
                date_grouped[date] = []

            if merged_feed.feed_list:
                date_grouped[date].append(
                    TemplateTopicFeeds(
                        topic_id=topic_id, feed_list=merged_feed.feed_list
                    )
                )

    merged_feed_list_by_date = [
        TemplateDateGroup(date=date, topics=topic_list)
        for date, topic_list in date_grouped.items()
    ]
    merged_feed_list_by_date.sort(key=lambda x: x.date, reverse=True)

    return TemplateType(rss_list=merged_feed_list_by_date)


# RSSフィードのリストを元にmarkdownを生成する
def generate(template_obj: TemplateType):
    env = Environment(
        loader=FileSystemLoader(TEMPLATES_DIR),
        autoescape=select_autoescape(),
    )
    template = env.get_template(TEMPLATE_FILE)

    dist_dir = Path(DIST_DIR)
    if not dist_dir.exists():
        dist_dir.mkdir()

    with dist_dir.joinpath(DIST_FILE).open(encoding="utf-8", mode="w") as f:
        f.write(template.render(rss_list=template_obj.rss_list))


# RSSフィードを更新し、markdownを生成する
if __name__ == "__main__":
    config_yaml = Path(CONFIG_YAML)
    downloads_dir = Path(DOWNLOADS_DIR)

    if not downloads_dir.exists():
        downloads_dir.mkdir()

    config = read_config(config_yaml=config_yaml)
    update(config=config, downloads_dir=downloads_dir)
    generate(template_obj=get_template(config=config, downloads_dir=downloads_dir))

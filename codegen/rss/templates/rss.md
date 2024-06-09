---
search:
    exclude: true
---

# RSSリンク

情報収集を一元化するために、RSSリーダーをブログでホストしています。

GitHub Actionsで定期的にRSSを購読する[osmos::feed](https://github.com/osmoscraft/osmosfeed)にインスパイアされてます。

{% for topic in rss_list %}## {{ topic.topic_id }}

{% for merged_feed in topic.topic_list %}### {{ merged_feed.date }}

{% for feed in merged_feed.feed_list %}- [{{ feed.title|e }}]({{ feed.link }})
{% endfor %}
{% endfor %}
{% endfor %}

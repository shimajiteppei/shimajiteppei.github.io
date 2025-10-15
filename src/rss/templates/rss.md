---
search:
    exclude: true
---

# RSSリンク

情報収集を一元化するために、RSSリーダーをブログでホストしています。

GitHub Actionsで定期的にRSSを購読する[osmos::feed](https://github.com/osmoscraft/osmosfeed)にインスパイアされてます。

{% for date_group in rss_list %}### {{ date_group.date }}

{% for topic in date_group.topics %}- {{ topic.topic_id }}
{% for feed in topic.feed_list %}    - [{{ feed.title|e }}]({{ feed.link }})
{% endfor %}
{% endfor %}
{% endfor %}

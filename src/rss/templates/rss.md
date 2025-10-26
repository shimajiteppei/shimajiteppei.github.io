---
description: osmosfeedをベースにした自作RSSリーダー
search:
    exclude: true
---

# RSSリンク

[osmos::feed](https://github.com/osmoscraft/osmosfeed)を参考に、GitHub Actionsで定期的にRSSを購読しています。

{% for date_group in rss_list %}### {{ date_group.date }}

{% for topic in date_group.topics %}- {{ topic.topic_id }}
{% for feed in topic.feed_list %}    - [{{ feed.title|e }}]({{ feed.link }})
{% endfor %}
{% endfor %}
{% endfor %}

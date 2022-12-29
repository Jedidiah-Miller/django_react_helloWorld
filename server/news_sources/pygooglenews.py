'''
see docs at
https://github.com/kotartemiy/pygooglenews
'''
from pygooglenews import GoogleNews
import json
import time
from pprint import pprint

example_url = 'https://news.google.com/rss/search?q=military'



class GoogleNewsManager:

    topics = [
        'WORLD',
    ]

    def __init__(self, lang='en', country='US'):
        self.lang  = lang
        self.country = country
        self.gn = GoogleNews(lang=lang, country=country)


    def search_by_topic(self, topic: str = 'WORLD'):
        return self.gn.topic_headlines(topic=topic)


    def search_by_query(self, query: str = 'MSFT -APPL', date_range = '6m'):
        '''
        ^^^ search for the best matching articles that mention MSFT and 
        do not mention AAPL (over the past 6 month
        '''
        return self.gn.search(query=query, when=date_range)


    def display_headlines(self, articles: list):
        for i, article in enumerate(articles['entries']):
            print(i + 1, '_______________________________________________________________')

            published = article['published']
            title = article['title']
            del article['published']
            del article['title']

            keys = article.keys()
            print('    ', title)
            print('    ', published)
            print('details__________')
            for k in keys:
                print(k + ':')
                pprint(article[k])


# date_time_range = '1d'

# google_news = GoogleNewsManager()
# query_results  = google_news.search_by_query(query='taiwan', date_range=date_time_range)
# google_news.display_headlines(query_results)



'''
article entry fields:
    title
    title_detail
    links
    link
    id
    guidislink
    published
    published_parsed
    summary
    summary_detail
    source
    sub_articles
'''
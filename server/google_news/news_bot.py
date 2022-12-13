from newspaper import Article
from bs4.element import PageElement
from .models import NewsSource, NewsArticle
from .requests_manager import RequestsManager
from .html_manager import HtmlManager
from .source_data import SOURCE_LIST


class NewsBot:

    requests_manager: RequestsManager
    html_manager: HtmlManager

    def __init__(self):
        self.requests_manager = RequestsManager()
        self.html_manager = HtmlManager()
        print(self.__str__, ': INITIALIZED')

# gets called 3rd
    def get_articles_from_page(self, page, source: NewsSource):

        news_articles = {}

        element_type = source.list_element.element_type
        attributes = {
            'class': source.list_element.get_element_regex()
        }

        article_list = self.html_manager.get_all_elements_with_attributes(page.text, element_type, attributes)

        article_item: PageElement
        for article_item in article_list:

            url = self.get_valid_url_from_element(page, article_item, source)
            if url:
                news_article = self.create_news_article(article_item, source, url)
                news_articles[url] = news_article.__dict__
            else:
                print('bad element')

        return news_articles


    def get_valid_url_from_element(self, page, e: PageElement, s: NewsSource):
        '''

        '''
        urls = {}

        url_paths = self.html_manager.get_urls_from_element(e)
        for url_path in url_paths:
            url = s.get_urls_from_string(page.url, url_path)
            if url:
                urls[url] = 1

        if len(urls.keys()) > 1:
            print('why?')

        return None if len(urls) == 0 else next(iter(urls))



    def create_news_article(self, e: PageElement, s: NewsSource, url: str) -> NewsArticle:

        headline = self.html_manager.get_element_from_element(e, s.headline_element.element_type, {'class': s.headline_element.get_element_regex()})
        summary = self.html_manager.get_element_from_element(e, s.summary_element.element_type, {'class': s.summary_element.get_element_regex()})
        time = self.html_manager.get_element_from_element(e, s.time_element.element_type, {'class': s.time_element.get_element_regex()})
        image_url = self.html_manager.get_element_from_element(e, s.image_element.element_type, {'class': s.image_element.get_element_regex()})

        return NewsArticle(
            source = s.name,
            url = url,
            headline = headline.text if headline else None,
            summary = summary.text if summary else None,
            time = time.text if time else None,
            image_url = image_url.text if image_url else None
        )

# gets called 2nd
    def get_article_urls_list(self, source: NewsSource):
        urls = {}
        print('__________________________________')
        print(source.name)
        for path in source.paths:
            url = source.url + path
            print(url)
            page_data = self.requests_manager.get_html_from_url(url)

            news_articles = self.get_articles_from_page(page_data, source)
            urls.update(news_articles)

        return list(urls.values())

# gets called 1st
    def get_all_articles(self, as_list = True):
        '''
        return as a list of News Articles unless specified otherwise
        '''
        if as_list:
            urls = []
            for source in SOURCE_LIST:
                urls += self.get_article_urls_list(source)
            return urls
        else:
            urls = {}
            for source in SOURCE_LIST:
                urls[source.name] = self.get_article_urls_list(source)
            return urls



def test_bot():
    bot = NewsBot()
    # 1. # get the articles list page
    articles_list = bot.get_all_articles()
    # 2. # get all the links from the page
    i = 0
    print('__________________________________________________')
    for article in articles_list:
        print(f'{i + 1} - {article}')
        i += 1

    print('__________________________________________________')
    print('done')

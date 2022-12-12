from .models import NewsSource, NewsArticle
from .requests_manager import RequestsManager
from .html_manager import HtmlManager
from newspaper import Article
from .source_data import SOURCE_LIST


class NewsBot:

    requests_manager: RequestsManager
    html_manager: HtmlManager

    def __init__(self):
        self.requests_manager = RequestsManager()
        self.html_manager = HtmlManager()
        print(self.__str__, ': INITIALIZED')


    def get_urls_from_page(self, page, source: NewsSource):

        urls = []
        bad_urls = []

        element_type = source.list_element.element_type
        attributes = {
            'class': source.list_element.get_element_regex()
        }

        article_list = self.html_manager.get_all_elements_with_attributes(page.text, element_type, attributes)
        
        for url_path in self.html_manager.get_all_urls(article_list):
            url = source.get_urls_from_string(page.url, url_path)
            if url:
                urls.append(url)
            else:
                bad_urls.append(url_path)

        return urls


    def create_news_article(self, page, source: NewsSource, url: str) -> NewsArticle:
        return NewsArticle(
            source = source.name,
            title = 'TODO: add title, or add default / empty title',
            url = url,
            summary = 'TODO: add summary, or add default / empty summary'
        )


    def get_article_urls_list(self, source: NewsSource):
        urls = {}
        print('__________________________________')
        print(source.name)
        for path in source.paths:
            url = source.url + path
            print(url)
            page_data = self.requests_manager.get_html_from_url(url)

            page_urls = self.get_urls_from_page(page_data, source)
            for url in page_urls:
                news_article = self.create_news_article(page_data, source, url)
                urls[url] = news_article.__dict__

        return list(urls.values())


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

from models import NewsSource
from requests_manager import RequestsManager
from html_manager import HtmlManager
from newspaper import Article
from source_data import SOURCE_LIST


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


    def get_article_urls_list(self, source: NewsSource):
        urls = {}
        print('__________________________________')
        print(source.name)
        for path in source.paths:
            url = source.url + path
            print(url)
            page_data = self.requests_manager.get_html_from_url(url)

            page_urls = self.get_urls_from_page(page_data, source)
            for page_url in page_urls:
                urls[page_url] = 1

        return list(urls)


    def get_all_articles(self):
        urls = []
        for source in SOURCE_LIST:
            urls += self.get_article_urls_list(source)

        return urls



def test_bot():
    bot = NewsBot()
    # 1. # get the artiles list page
    articles_list = bot.get_all_articles()
    # 2. # get all the links from the page
    i = 0
    print('__________________________________________________')
    for article in articles_list:
        print(f'{i + 1} - {article}')
        i += 1

    print('__________________________________________________')
    print('done')

test_bot()
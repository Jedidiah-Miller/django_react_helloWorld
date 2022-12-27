from newspaper import Article
from bs4.element import PageElement
from .models import NewsSource, NewsSourceListItemElements, HtmlElement, NewsArticle
from .firestore import NewsSourceFirestore
from .requests_manager import RequestsManager
from .html_manager import HtmlManager
from .helper_functions import DateTimeFormatter


class NewsBot:

    requests_manager: RequestsManager
    news_source_firestore: NewsSourceFirestore
    html_manager: HtmlManager

    source_list: list

    def __init__(self, news_source_firestore: NewsSourceFirestore):
        self.requests_manager = RequestsManager()
        self.news_source_firestore = news_source_firestore if news_source_firestore else NewsSourceFirestore()
        self.html_manager = HtmlManager()
        self.source_list = []
        print(self.__str__, ': INITIALIZED')


    def get_all_news_sources(self):
        self.source_list.clear()

        for data in self.news_source_firestore.get_all_news_sources():
            list_item_elements = data.get('list_item_elements')

            for element_name in data.get('list_item_elements').keys():
                list_item_elements[element_name] = HtmlElement(list_item_elements[element_name])

            data['list_item_elements'] = NewsSourceListItemElements(list_item_elements)
            news_source = NewsSource(data)

            self.source_list.append(news_source)


# gets called 3rd
    def get_articles_from_page(self, page, source: NewsSource):

        news_articles = {}

        element_type = source.list_item_elements.list_element.element_type
        attributes = {
            'class': source.list_item_elements.list_element.get_element_regex()
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
            print('got multiple urls from article list item: ', urls.keys())

        return None if len(urls) == 0 else next(iter(urls))



    def create_news_article(self, e: PageElement, s: NewsSource, url: str) -> NewsArticle:

        li_el = s.list_item_elements

        # TEMP
        headline = None
        summary = None
        time = None
        image_url = None

        if li_el.__dict__.get('headline_element'):
            attributes = {'class': li_el.headline_element.get_element_regex()}
            headline = self.html_manager.get_element_from_element(e, li_el.headline_element.element_type, attributes)
        if li_el.__dict__.get('summary_element'):
            attributes = {'class': li_el.summary_element.get_element_regex()}
            summary = self.html_manager.get_element_from_element(e, li_el.summary_element.element_type, attributes)
        if li_el.__dict__.get('time_element'):
            attributes = {'class': li_el.time_element.get_element_regex()}
            time = self.html_manager.get_element_from_element(e, li_el.time_element.element_type, attributes)
            time = DateTimeFormatter().get_time_info(time)
        if li_el.__dict__.get('image_element'):
            attributes = {'class': li_el.image_element.get_element_regex()}
            image_url = self.html_manager.get_element_from_element(e, li_el.image_element.element_type, attributes)

        return NewsArticle(
            source = s.name,
            url = url,
            headline = headline.text if headline else None,
            summary = summary.text if summary else None,
            time = time if time else '0',
            image_url = image_url.attrs.get('src') if image_url else None
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

    def sort_by_date(self, urls = [{'time': '22 UTC'}]):
        return sorted(urls, key=lambda d: d.get('time'), reverse=True)

# gets called 1st
    def get_all_articles(self, as_list = True):
        '''
        return as a list of News Articles unless specified otherwise
        '''
        if not self.source_list:
            self.get_all_news_sources()

        if as_list:
            urls = []
            for source in self.source_list:
                urls += self.get_article_urls_list(source)
            urls = self.sort_by_date(urls)
            return urls
        else:
            urls = {}
            for source in self.source_list:
                urls[source.name] = self.get_article_urls_list(source)
            urls = self.sort_by_date(urls)
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

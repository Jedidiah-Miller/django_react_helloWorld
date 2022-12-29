from bs4 import BeautifulSoup
from bs4 import element


class HtmlManager:


    def __init__(self):
        print(self.__str__, ': INITIALIZED')


    def get_soup(self, text, features = "html.parser") -> BeautifulSoup:
        return BeautifulSoup(text, features)


    def get_element_with_attributes(self, text, name, attributes: dict) -> element.PageElement:
        soup = self.get_soup(text)
        return soup.find(name, attrs=attributes).find_all


    def get_element_from_element(self, from_element: element.PageElement, name, attributes: dict) -> element.PageElement:
        return from_element.find(name, attrs=attributes)


    def get_all_elements_with_attributes(self, text, name, attributes: dict) -> element.ResultSet:
        soup = self.get_soup(text)
        return soup.find_all(name, attrs=attributes)


    def get_urls_from_element(self, from_element: element.PageElement):
        return [a.get('href') for a in from_element.find_all('a')]


    def get_all_urls(self, elements: element.ResultSet) -> list:
        '''
        returns all URLs from the given element, URLs are extracted from a tags
        '''
        urls = []

        e: element.PageElement

        for e in elements:
            a_links = e.find_all('a')
            for a in a_links:
                urls.append(a.get('href'))

        return urls



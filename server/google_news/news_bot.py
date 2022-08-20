from bs4 import BeautifulSoup
import urllib.request, sys, time
import pandas as pd
from newspaper import Article
import requests
from fake_useragent import UserAgent
import re
# _______
from site_layouts import Website, Reuters, AntiWar
from proxies import get_proxies

from pprint import pprint


DEFAULT_URL = AntiWar.article_list
ECT = 'text/html; charset=UTF-8'



class NewsBot:

    def __init__(self):
        self.user_agent = UserAgent()
        print(self.__str__, ': INITIALIZED')


    def handle_page_soup(self, key: str, soup: BeautifulSoup):
        pprint(soup)
        links = set()
        content_div_key = {
            'id': key
        }
        content = soup.find("div",attrs=content_div_key)
        a_links = content.find_all('a')
        for a in a_links:
            print('_________________________')
            href = a.get('href')
            text = a.text
            print('text:', text)
            print('href:', href)
            print('_________________________')
        return 


    def get_website_data(self, w: Website):

        data = self.get_with_url(url=w.article_list)
        content_type = data.headers.get("content-type", "unknown")

        if content_type == ECT:
        # should be - 'text/html; charset=UTF-8'
            soup = BeautifulSoup(data.text, "html.parser")
            return self.handle_page_soup(w.content_div, soup)
        else:
            print(content_type)
            print('WHAT DO I DO?')


    def get_headers(self) -> dict:
        return {
            'User-Agent': str(self.user_agent.random)
        }


    def get_with_url(self, url: str = DEFAULT_URL, i: int = 0):
        # proxies = get_proxies()
        try:
            headers = self.get_headers()
            r = requests.get(
                url=url,
                headers=headers,
                # proxies=proxies,
                timeout=10
            )
            return r
        except Exception as e:
            print('ERROR FOR LINK: ', url)
            if i == 10:
                raise Exception('GAVE UP ON PROXIES', e)
            else:
                print("Skipping.  Connection error", "proxies['http']", e)
                return self.get_with_url(url, i + 1)






bot = NewsBot()
# 1. # get the artiles list page
bot.get_website_data(AntiWar)
# 2. # get all the links from the page
# 2. # get the data for all the links
print('done')
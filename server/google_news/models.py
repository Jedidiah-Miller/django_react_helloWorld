from django.db import models
from urllib.parse import urljoin
import re
# from django.contrib.postgres.fields import ArrayField


class GNArticle(models.Model):
    title = models.CharField(max_length=100)
    message = models.CharField(max_length=500, blank=True)
    source = models.CharField(max_length=500, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)




class HtmlElement(object):
    '''
    '''
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)
    # content_element = models.CharField()
    # '''
    # element that contains the list of articles
    # - ex: 
    # '''
    element_type: str
    '''
    type of html element
    - ex: li
    - <li></li>
    '''
    class_name: str
    '''
    element class name / substring from class name
    - ex: story-collection
    '''

    def get_element_select_key(self):
        # # ex: 'div[class*="listing-col-"]'
        return f'{self.element_type}[class*="{self.class_name}"]'

    def get_element_class_select_key(self):
        # # ex: '.*listing-col-.*'
        return f'.*{self.class_name}.*'

    def get_element_regex(self):
        key = self.get_element_class_select_key()
        return re.compile(key)


class NewsSource(object):
    '''
    News Source specifying the url and all Necessary paths
    - ex: Reuters
    - www.reuters.com
    - ['/world/africa/', '/world/americas/', '/world/asia-pacific/']
    - ...
    '''
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    name: str
    '''
    name of news source
    - ex: Reuters
    '''
    url: str
    '''
    main url of the news source
    - ex: www.reuters.com
    '''
    paths: list
    '''
    all paths to check for the news source
    - ex: ['/world/africa/', '/world/americas/', '/world/asia-pacific/']
    - www.reuters.com/world/africa/
    - www.reuters.com/world/americas/
    - www.reuters.com/world/asia-pacific/
    '''
    url_requirments: str
    '''
    Regex - requirements for a properly formatted URL
    - ex: Reuters urls all end in a date formatted -2022-12-09
    - fails requirements : https://www.reuters.com/world/china/
    - passes requirements: https://www.reuters.com/world/china/chinas-wuhan-shadow-reserve-resentment-even-covid-lockdowns-ease-2022-12-09/
    '''
    # # TODO: the HtmlElements should be their own model
    list_element: HtmlElement
    '''
    specific html list element the news articles are found in
    ex: <li class="story-collection..."></li> (shortened)
    '''
    headline_element: HtmlElement
    '''
    specific html headline element for the news article - found inside of the list_element
    ex: <li class="story-collection..."></li> (shortened)
    '''
    summary_element: HtmlElement
    '''
    specific html summary element for the news article - found inside of the list_element
    ex: <li class="story-collection..."></li> (shortened)
    '''
    time_element: HtmlElement
    '''
    specific html timestamp element for the news article - found inside of the list_element
    ex: <li class="story-collection..."></li> (shortened)
    '''
    image_element: HtmlElement
    '''
    specific html image element for the news article - found inside of the list_element
    ex: <li class="story-collection..."></li> (shortened)
    '''
    load_more_element: HtmlElement
    '''
    specific html element triggering the page to load more articles
    '''
    # createdAt = models.DateTimeField(auto_now_add=True)
    ''' - '''

    def get_urls_from_string(self, page_url, href, attempt = 1):
        '''
        wiill only get URLs from this specific source
        '''

        if 'https://' not in href:
            href = urljoin(self.url, href)

        # findall() has been used  
        # with valid conditions for urls in string 
        # TODO maybe - add self.url to the regex... there may be no need to get all urls unless they contain self.url
        regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
        url_list = re.findall(regex, href)

        if url_list and url_list[0]:
            url = url_list[0][0]
            if url != page_url:
                if self.is_valid_url(url):
                    return url

        return None
        # return self.get_urls_from_string(page_url, self.url + href, attempt + 1) if attempt < 2 else None


    def is_valid_url(self, url):
        if not self.url_requirments:
            return True
        # remove trailing slash if needed
        if url[-1] == '/':
            url = url[:-1]

        return re.search(self.url_requirments, url)



class NewsArticle:
    '''
    News Article model
    '''
    id: str
    '''
    NewsArticle id
    '''
    source: str
    '''
    NewsSource id
    '''
    headline: str
    '''
    headliine / title of the news article
    '''
    url: str
    '''
    url for the news article
    '''
    summary: str # optional
    '''
    summary of news the article
    '''
    time: str
    '''
    time the news article was published or last upated
    '''
    image_url: str # optional
    '''
    url for the image to be displayed
    '''

    def __init__(self, source=None, headline=None, url=None, summary=None, time=None, image_url=None):
        self.source = source
        self.url = url
        self.headline = headline
        self.summary = summary
        self.time = time
        self.image_url = image_url
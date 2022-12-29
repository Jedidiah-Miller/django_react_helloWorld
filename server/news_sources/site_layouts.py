from endpoints import Endpoints as _E

class Website:
    '''
    each website will have the same basic data,\n
    but will most likely have a different layout \n
    or a different sitemap
    '''

    url: str
    '''
    site root url
    - ex: https://www.reuters.com
    '''
    article_list: str
    '''
    url for:
    * list of latest articles
    * feed of some sort
    '''
    content_div: str
    '''
    class name or id of the parent div to the individual articles / links
    '''

    def __init__(self, url: str, article_list: str, content_div: str):
        self.url = url
        self.article_list = article_list
        self.content_div = content_div




Reuters = Website(
    url=_E.REUTERS_HOME,
    article_list=_E.REUTERS_WORLD,
    content_div=''
)

AntiWar = Website(
    url=_E.ANTIWAR_HOME,
    article_list=_E.ANTIWAR_LATEST,
    content_div='content'
    # content_div='#content'
)
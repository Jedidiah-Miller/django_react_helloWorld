import requests
# use to parse html text
from lxml.html import fromstring 
from itertools import cycle
import traceback


def to_get_proxies():
    # website to get free proxies
    url = 'https://free-proxy-list.net/'
    response = requests.get(url)
    parser = fromstring(response.text)
    # using a set to avoid duplicate IP entries.
    proxies = set() 
    for i in parser.xpath('//tbody/tr')[:10]:
        # to check if the corresponding IP is of type HTTPS
        if i.xpath('.//td[7][contains(text(),"yes")]'):
            # Grabbing IP and corresponding PORT
            proxy = ":".join([i.xpath('.//td[1]/text()')[0],
                                i.xpath('.//td[2]/text()')[0]])
            proxies.add(proxy)
        return proxies



# TODO: save these locally
proxies = to_get_proxies()
# to rotate through the list of IPs
proxyPool = cycle(proxies) 


def get_url_with_proxy(url: str = '', i: int = 0) -> requests.Request:
    try:
        proxy = next(proxyPool)
        params = {
            'proxies': {
                "http": proxy,
                "https": proxy
            }
        }
        return requests.Request(method='get', url=url, params=params)
    except:
        if i == 10:
            raise Exception('GAVE UP ON PROXIES')
        else:
            print("Skipping.  Connection error", proxy)
            return get_url_with_proxy(url, i + 1)


def get_proxies():
    proxy = next(proxyPool)
    print('proxy:', proxy)
    return {
        "http": proxy,
        "https": proxy
    }
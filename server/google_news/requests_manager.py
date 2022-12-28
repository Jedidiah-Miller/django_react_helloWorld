import requests
from fake_useragent import UserAgent
# from proxies import get_proxies



class RequestsManager:

    ECT = 'text/html'
    '''
    Expected Content Type
    * should be one of the followinig:
    - text/html; charset=UTF-8
    - text/html;
    '''

    def __init__(self):
        self.user_agent = self.get_user_agent()
        print('INITIALIZED REQUESTS MANAGER')

    
    def get_user_agent(self) -> UserAgent:
        return UserAgent()


    def get_headers(self) -> dict:
        return {
            'User-Agent': str(self.user_agent.random)
        }


    def get_response_with_url(self, url: str, i: int = 0):
        # proxies = get_proxies()
        try:
            headers = self.get_headers()
            response = requests.get(
                url=url,
                headers=headers,
                # proxies=proxies, # # TODO
                timeout=10
            )
            return response
        except Exception as e:
            print('ERROR FOR LINK: ', url)
            if i == 10:
                raise Exception(e)
            else:
                # print("Skipping.  Connection error", "proxies['http']", e)
                print('Skipping', e)
                return self.get_response_with_url(url, i + 1)


    def get_html_from_url(self, url: str):
        '''
        response is expected to contain - headers.get("content-type", "unknown")
        '''

        data = self.get_response_with_url(url=url)
        content_type = data.headers.get("content-type", "unknown")

        try:
            assert self.ECT.lower() in content_type.lower()
            return data
        except Exception as e:
            # # TODO: create Exception for unexpected content type
            print('UNDESIRED CONTENT TYPE')
            print(content_type)
            print(e)
            raise None

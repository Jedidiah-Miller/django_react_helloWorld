from .models import NewsSource, NewsSourceListItemElements, HtmlElement
from .regex_patterns import REGEX


class HtmlElementTypes:
    div = 'div'
    li = 'li'
    span = 'span'
    p = 'p'
    a = 'a'
    button = 'button'
    image = 'img'
    time = 'time'



BLANK = NewsSource(
    name = 'blank',
    url = 'https://www.blank.com',
    paths = [
        '/world/africa/',
        '/world/americas/',
        '/world/asia-pacific/',
        '/world/china/',
        '/world/europe/',
        '/world/india/',
        '/world/middle-east/',
    ],
    url_requirments = None,
    list_element = HtmlElement(
        element_type = HtmlElementTypes.li,
        class_name = 'story-collection'
    ),
    load_more_element = HtmlElement(
        element_type = HtmlElementTypes.button,
        class_name = 'button__button__2Ecqi button__secondary__18moI button__round__1nYLA text-button__container__3q3zX' # might work
    )
)
# # # ______________________________________________________________________

AP = NewsSource(
    name = 'Associated Press',
    url = 'https://www.apnews.com',
    paths = [
        '/hub/africa/',
        '/hub/asia-pacific/',
        '/hub/austrailia/',
        '/hub/europe/',
        '/hub/latin-america/',
        '/hub/middle-east/',
    ],
    url_requirments = None,
    list_item_elements = NewsSourceListItemElements(
        list_element = HtmlElement(
            element_type = HtmlElementTypes.div,
            class_name = 'FeedCard'
        ),
        headline_element = HtmlElement(
            element_type = HtmlElementTypes.a,
            class_name = 'heading'
        ),
        time_element = HtmlElement(
            element_type = HtmlElementTypes.time,
            class_name = 'media-story-card__time'
        ),
        load_more_element = HtmlElement(
            element_type = HtmlElementTypes.button,
            class_name = None
        )
    )
)
# # # ______________________________________________________________________

Tasnim = NewsSource(
    name = 'Tasnim',
    url = 'https://www.tasnimnews.com/en',
    paths = [
        '/latest-news?service=-1&date=yyyy%2Fmm%2Fdd/', # date: yyyy mm dd date=2022%2F12%2F13
    ],
    url_requirments = REGEX.STRING_ENDS_WITH_DATE,
    list_item_elements = NewsSourceListItemElements(
        list_element = HtmlElement(
            element_type = HtmlElementTypes.li,
            class_name = 'story-collection'
        ),
        headline_element = HtmlElement(
            element_type = HtmlElementTypes.a,
            class_name = 'heading'
        ),
        summary_element = HtmlElement(
            element_type = HtmlElementTypes.p,
            class_name = 'text-story-card__description__3PNIg'
        ),
        time_element = HtmlElement(
            element_type = HtmlElementTypes.time,
            class_name = 'media-story-card__time'
        ),
        image_element = HtmlElement(
            element_type = HtmlElementTypes.image,
            class_name = 'image__image'
        ),
        load_more_element = HtmlElement(
            element_type = HtmlElementTypes.button,
            class_name = 'button__button__2Ecqi button__secondary__18moI button__round__1nYLA text-button__container__3q3zX' # might work
        )
    )
)
# # # ______________________________________________________________________
IRNA = NewsSource(
    name = 'IRNA',
    url = 'https://en.irna.ir', # date: yyyy mm dd date=2022%2F12%2F13
    paths = [
        '/archive/',
    ],
    url_requirments = REGEX.STRING_ENDS_WITH_DATE,
    list_item_elements = NewsSourceListItemElements(
        list_element = HtmlElement(
            element_type = HtmlElementTypes.li,
            class_name = 'story-collection'
        ),
        headline_element = HtmlElement(
            element_type = HtmlElementTypes.a,
            class_name = 'heading'
        ),
        summary_element = HtmlElement(
            element_type = HtmlElementTypes.p,
            class_name = 'text-story-card__description__3PNIg'
        ),
        time_element = HtmlElement(
            element_type = HtmlElementTypes.time,
            class_name = 'media-story-card__time'
        ),
        image_element = HtmlElement(
            element_type = HtmlElementTypes.image,
            class_name = 'image__image'
        ),
        load_more_element = HtmlElement(
            element_type = HtmlElementTypes.button,
            class_name = 'button__button__2Ecqi button__secondary__18moI button__round__1nYLA text-button__container__3q3zX' # might work
        )
    )
)
# # # ______________________________________________________________________

Reuters = NewsSource(
    name = 'Reuters',
    url = 'https://www.reuters.com',
    paths = [
        '/world/africa/',
        '/world/americas/',
        '/world/asia-pacific/',
        '/world/china/',
        '/world/europe/',
        '/world/india/',
        '/world/middle-east/',
    ],
    url_requirments = REGEX.STRING_ENDS_WITH_DATE,
    list_item_elements = NewsSourceListItemElements(
        list_element = HtmlElement(
            element_type = HtmlElementTypes.li,
            class_name = 'story-collection'
        ),
        headline_element = HtmlElement(
            element_type = HtmlElementTypes.a,
            class_name = 'heading'
        ),
        time_element = HtmlElement(
            element_type = HtmlElementTypes.time,
            class_name = 'media-story-card__time'
        ),
        summary_element = HtmlElement(
            element_type = HtmlElementTypes.p,
            class_name = 'text-story-card__description__3PNIg'
        ),
        image_element = HtmlElement(
            element_type = HtmlElementTypes.image,
            class_name = 'image__image'
        ),
        load_more_element = HtmlElement(
            element_type = HtmlElementTypes.button,
            class_name = 'button__button__2Ecqi button__secondary__18moI button__round__1nYLA text-button__container__3q3zX' # might work
        )
    )
)


# # # ______________________________________________________________________
# AntiWar = NewsSource(
#     name = 'AntiWar',
#     url = 'www.antiwar.com',
#     paths = [
#         '/latest.php'
#     ],
#     # # I realized these don't have a class name on AntiWar.com
# )


# # # ______________________________________________________________________
RIA = NewsSource(
    name = 'RIA NOVOSTI',
    url = 'https://ria.ru',
    paths = [
        '/world/',
        '/incidents/',
        '/defense_safety/',
    ],
    url_requirments = REGEX.STRING_ENDS_WITH_HTML,
    list_item_elements = NewsSourceListItemElements(    
        list_element = HtmlElement(
            element_type = HtmlElementTypes.div,
            class_name = 'list-item'
        ),
        headline_element = HtmlElement(
            element_type = HtmlElementTypes.a,
            class_name = 'heading'
        ),
        time_element = HtmlElement(
            element_type = HtmlElementTypes.time,
            class_name = 'media-story-card__time'
        ),
        load_more_element = HtmlElement(
            element_type = HtmlElementTypes.div,
            class_name = 'list-more'
        )
    )
)


# # # ______________________________________________________________________
TheTimesOfIsrael = NewsSource(
    name = 'The Times of Israel',
    url = 'https://www.timesofisrael.com',
    paths = [
        '/latest/',
    ],
    url_requirments = None, # REGEX.STRING_ENDS_WITH_TRAILING_SLASH,
    list_item_elements = NewsSourceListItemElements(    
        list_element = HtmlElement(
            element_type = HtmlElementTypes.div,
            class_name = 'item template'
        ),
        headline_element = HtmlElement(
            element_type = HtmlElementTypes.a,
            class_name = 'heading'
        ),
        time_element = HtmlElement(
            element_type = HtmlElementTypes.time,
            class_name = 'media-story-card__time'
        ),
        load_more_element = HtmlElement(
            element_type = HtmlElementTypes.div,
            class_name = 'item load-more'
        )
    )
)


# # # ______________________________________________________________________
# # # ______________________________________________________________________
# # # ______________________________________________________________________

SOURCE_LIST = [
    AP,
    Reuters,
    RIA,
    TheTimesOfIsrael,
]

class TwitterItems:
    class User:
        USER_LOOKUP = 'v2UserLookupPython'
        USER_TWEETS = 'v2UserTweetsPython'


    class NewsSourceIDs:

        def to_dict(self) -> dict:
            result = []
            for k in self.__dict__:
                if '__' not in k:
                    result[k] = self.__dict__[k]
            return result

        # World
        UN = 14159148
        # Defense
        defense_news = 21312961
        DefensePost = 4204725852 # only check 2-3 times per day
        # Regular
        AP = 51241574
        Reuters = 1652541
        ReutersWorld = 335455570
        thehill = 1917731
        # ___
        DailySabah = 2231905548
        # Middle East
        AJEnglish = 4970411
        AlArabiya_Eng = 22240612
        # Asia
        BOLNewsOfficial = 3435345691
        WIONews = 711760467383877632
        # Asia Pacific
        SCMPNews = 23922797
        JapanToday = 15969142
        japantimes = 7424642
        kyodo_english = 193042922



news_source_dict = TwitterItems.NewsSourceIDs.__dict__
keys = news_source_dict.keys()

for k in keys:
    if '__' not in k:
        print(k, ':', news_source_dict[k])

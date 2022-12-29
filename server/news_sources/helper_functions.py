import time
import datetime
import dateparser
import pandas as pd




class DateTimeFormatter:


    default_datetime_format = '%b-%d-%Y %I:%M %p %Z' # 'MMM-dd-yyyy hh:mm aa z'


    def get_time_info(self, str_time):

        if not str_time:
            print('NO TIME FOUND! - ', str_time)
            return

        # # TODO - put all of these in order of most useful / most important - decending
        time_items = [
            'data-source',
            'datetime'
        ]

        for x in time_items:
            if str_time.get(x):
                str_time = str_time[x]
                break
        else:
            str_time = str_time.text

        return self.convert_time(str_time)


    def convert_time(self, str_time: str, to_format = default_datetime_format):
        '''
        convert all timestamps to use the same format
        '''
        try:
            old_format = pd.to_datetime(str_time)
            str_time = old_format.strftime(to_format)

            if str_time[-1] == ' ':
                str_time = str_time[:-1]

            return str_time
        except Exception as e:
            print(e)
            return str_time



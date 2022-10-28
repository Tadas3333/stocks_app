
from datetime import datetime
import pytz


class Time:
    def get_new_york_timezone():
        return pytz.timezone('US/Eastern')

    def get_new_york_time()->datetime:
        ny_time = datetime.now(tz=Time.get_new_york_timezone())
        return ny_time
    
    def get_new_york_market_open_hour()->list:
        return [9, 30]

    def get_new_york_market_close_hour()->list:
        return [16, 0]

    def is_new_york_market_opened_by_time()->bool:
        ny_time = Time.get_new_york_time()

        # Market is not open on weekends
        if ny_time.weekday() > 4:
            return False

        ny_timezone = Time.get_new_york_timezone()

        # Calculate today's open hour
        open_time = Time.get_new_york_market_open_hour()
        open_hour = str(open_time[0])
        if open_time[0] < 10:
            open_hour = "0" + open_hour

        open_min = str(open_time[1])
        if open_time[1] < 10:
            open_min = "0" + open_min

        open_time_today = datetime.strptime(ny_time.strftime("%Y-%m-%d") + " " + open_hour + ":" + open_min + ":00", '%Y-%m-%d %H:%M:%S')
        open_time_today = open_time_today.replace(tzinfo=ny_timezone)

        # Calculate today's close hour
        close_time = Time.get_new_york_market_close_hour()
        close_hour = str(close_time[0])
        if close_time[0] < 10:
            close_hour = "0" + close_hour

        close_min = str(close_time[1])
        if close_time[1] < 10:
            close_min = "0" + close_min
        
        close_time_today = datetime.strptime(ny_time.strftime("%Y-%m-%d") + " " + close_hour + ":" + close_min + ":00", '%Y-%m-%d %H:%M:%S')
        close_time_today = close_time_today.replace(tzinfo=ny_timezone)

        current_time = datetime.strptime(ny_time.strftime("%Y-%m-%d %H:%M:%S"), '%Y-%m-%d %H:%M:%S')
        current_time = close_time_today.replace(tzinfo=ny_timezone)

        if current_time >= open_time_today and current_time <= close_time_today:
            return True
        else:
            return False
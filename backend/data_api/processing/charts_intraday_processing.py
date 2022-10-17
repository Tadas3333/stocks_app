from common.util import Util 
from common.time import Time 
from datetime import datetime, timedelta

class ChartsIntradayProcessing:
    def get_stock_intraday(data:dict, interval_mins=1):
        result = []

        if data is None:
            return result
        
        analyzed_data = ChartsIntradayProcessing.analyze_data(data)

        # Start time
        open_time = Time.get_new_york_market_open_hour()
        open_hour = open_time[0]
        open_min = open_time[1]
        chart_time = datetime.strptime(data[0]["date"], '%Y-%m-%d %H:%M:%S')
        chart_time = chart_time.replace(hour=open_hour, minute=open_min, second=0, microsecond=0)

        # End time
        close_time = Time.get_new_york_market_close_hour()
        close_hour = str(close_time[0])
        if close_time[0] < 10:
            close_hour = "0" + close_hour

        close_min = str(close_time[1])
        if close_time[1] < 10:
            close_min = "0" + close_min

        chart_end_time = datetime.strptime(chart_time.strftime("%Y-%m-%d") + " " + close_hour + ":" + close_min + ":00", '%Y-%m-%d %H:%M:%S')
        market_open = Time.is_new_york_market_opened_by_time()

        last_price = analyzed_data["lastClose"]
        current_price = 0.0
        last_reported_date = None

        if analyzed_data["lastReportedDate"] is not None:
            last_reported_date = datetime.strptime(analyzed_data["lastReportedDate"], '%Y-%m-%d %H:%M:%S')

        while chart_time <= chart_end_time:
            if last_reported_date is not None and last_reported_date < chart_time and market_open == True:
                result = result + [{
                    "category": ChartsIntradayProcessing.format_date(chart_time),
                    "value": None,
                    "volume": None
                }]
                chart_time = chart_time + timedelta(minutes=interval_mins)
                continue


            price_data = Util.query_data_array(data, "date", chart_time.strftime("%Y-%m-%d %H:%M:%S"))
            current_volume = 0.0

            if price_data is None:
                current_price = last_price
            else:
                current_price = price_data["close"]
                current_volume = price_data["volume"]
            
            last_price = current_price
            
            result = result + [{
                "category": ChartsIntradayProcessing.format_date(chart_time),
                "value": "{0:.4f}".format(float(current_price)),
                "volume": str(current_volume)
            }]

            chart_time = chart_time + timedelta(minutes=interval_mins)

        result = {
            "lastClosePrice" : analyzed_data["lastClose"],
            "minValue": analyzed_data["minValue"],
            "maxValue": analyzed_data["maxValue"],
            "data": result
        }
        
        return result

    def format_date(date:datetime)->str:
        hour = date.hour
        min = date.minute
        session = "AM"

        if hour >= 12:
            session = "PM"
        
        if hour > 12:
            hour = hour - 12
        
        hour_str = str(hour)
        if hour < 10:
            hour_str = "0" + hour_str

        min_str = str(min)
        if min < 10:
            min_str = "0" + min_str
        
        return date.strftime("%m/%d/%Y") + " " +hour_str + ":" + min_str + " " + session + " ET"
    
    def analyze_data(data:dict)->dict:
        latest_day = None
        result = {
            "lastClose": 0.0,
            "minValue": None,
            "maxValue": None,
            "lastReportedDate": None
        }

        for item in data:
            item_day = item["date"].split(' ')[0]
            result["lastClose"] = item["close"]

            if latest_day is None:
                latest_day = item_day
                result["lastReportedDate"] = item["date"]
            else:
                if latest_day != item_day:
                   break
            
            if result["minValue"] is None:
                result["minValue"] = item["close"]
            elif result["minValue"] > item["close"]:
                result["minValue"]  = item["close"]
            
            if result["maxValue"] is None:
                result["maxValue"] = item["close"]
            elif result["maxValue"] < item["close"]:
                result["maxValue"]  = item["close"]
        
        if result["minValue"] is None:
            result["minValue"] = 0.0

        if result["maxValue"] is None:
            result["maxValue"] = 0.0
        
        return result
from common.util import Util 
from datetime import datetime, timedelta
from processing.charts_intraday_processing import ChartsIntradayProcessing

class Charts5DaysProcessing:
    def get_stock_5days_chart(data:dict):
        result = []

        if data is None:
            return result
        
        analyzed_data = Charts5DaysProcessing.analyze_data(data)

        # Prepare the other days (4 days before the last market open day) chart
        other_days_data = analyzed_data["otherDaysData"]
        other_days_data.reverse()

        for d in other_days_data:
            result = result + [{
                "category": ChartsIntradayProcessing.format_date(datetime.strptime(d["date"], '%Y-%m-%d %H:%M:%S')),
                "value": "{0:.4f}".format(float(d["close"])),
                "volume": str(d["volume"])
            }]
        
        # Prepare the lastest market open day chart and join two charts
        result = result + ChartsIntradayProcessing.get_stock_intraday_chart(analyzed_data["latestDayData"], interval_mins=5)["values"]

        result = {
            "lastClosePrice" : analyzed_data["lastClose"],
            "minValue": analyzed_data["minValue"],
            "maxValue": analyzed_data["maxValue"],
            "values": result
        }
        
        return result
    
    def analyze_data(data:dict)->dict:
        latest_day = None
        first_day = None
        day_change_counter = 1

        result = {
            "lastClose": 0.0,
            "minValue": None,
            "maxValue": None,
            "latestDayData": [], # All the data of the first day
            "otherDaysData": []  # All the data of the other 4 days
        }

        for item in data:
            item_day = item["date"].split(' ')[0]
            result["lastClose"] = item["close"]

            # When the first item is read
            if latest_day is None:
                latest_day = item_day
                first_day = item_day
            else:
                # If the day has changed
                if latest_day != item_day:
                    day_change_counter = day_change_counter + 1
                    
                    # Stop on the 6th day
                    if day_change_counter == 6:
                        break

                    latest_day = item_day
            
            if first_day == item_day:
                result["latestDayData"].append(item)
            else:
                result["otherDaysData"].append(item)
            
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
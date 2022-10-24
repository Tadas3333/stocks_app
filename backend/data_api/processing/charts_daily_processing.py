from common.util import Util 
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

class ChartsDailyProcessing:
    def get_daily_prices_in_interval(data:dict, interval:str)->dict:
        result = []

        if data is None:
            return result
        
        lastClosePrice = 0.0
        minValue = None
        maxValue = None

        daily = data["historical"]
        loadUntil = None

        for day in daily:
            currentDay = datetime.strptime(day["date"], '%Y-%m-%d')

            if loadUntil is None:
                if interval == "1month":
                    loadUntil = currentDay - relativedelta(months=1)
                elif interval == "3months":
                    loadUntil = currentDay - relativedelta(months=3)
                elif interval == "6months":
                    loadUntil = currentDay - relativedelta(months=6)
                elif interval == "ytd":
                    loadUntil = currentDay.replace(month=1, day=1)
                elif interval == "1year":
                    loadUntil = currentDay - relativedelta(years=1)
                elif interval == "3years":
                    loadUntil = currentDay - relativedelta(years=3)
                elif interval == "5years":
                    loadUntil = currentDay - relativedelta(years=5)
                else:
                    loadUntil = currentDay

            price = day["close"]
            lastClosePrice = price

            if loadUntil >= currentDay:
                if loadUntil > currentDay:
                    break
                continue # Get next day close price

            if minValue is None:
                minValue = price
            elif minValue > price:
                minValue = price
            
            if maxValue is None:
                maxValue = price
            elif maxValue < price:
                maxValue  = price
            
            result = result + [{
                "category": ChartsDailyProcessing.format_date(datetime.strptime(day["date"], '%Y-%m-%d')),
                "value": "{0:.4f}".format(float(price)),
                "volume": str(float(day["volume"]))
            }]

        if minValue is None:
            minValue = 0.0

        if maxValue is None:
            maxValue = 0.0
        
        if lastClosePrice is None:
            lastClosePrice = 0.0
        
        result.reverse()

        result = {
            "lastClosePrice" : lastClosePrice,
            "minValue": minValue,
            "maxValue": maxValue,
            "values": result
        }
        
        return result

    def get_stock_1month_chart(data:dict):
        return ChartsDailyProcessing.get_daily_prices_in_interval(data, interval="1month")

    def get_stock_3months_chart(data:dict):
        return ChartsDailyProcessing.get_daily_prices_in_interval(data, interval="3months")

    def get_stock_6months_chart(data:dict):
        return ChartsDailyProcessing.get_daily_prices_in_interval(data, interval="6months")

    def get_stock_ytd_chart(data:dict):
        return ChartsDailyProcessing.get_daily_prices_in_interval(data, interval="ytd")

    def get_stock_1year_chart(data:dict):
        return ChartsDailyProcessing.get_daily_prices_in_interval(data, interval="1year")

    def get_stock_3years_chart(data:dict):
        return ChartsDailyProcessing.get_daily_prices_in_interval(data, interval="3years")

    def get_stock_5years_chart(data:dict):
        return ChartsDailyProcessing.get_daily_prices_in_interval(data, interval="5years")


    def format_date(date:datetime)->str:
        return date.strftime("%m/%d/%Y")
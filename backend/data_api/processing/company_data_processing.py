from common.util import Util 
from datetime import datetime
from dateutil.relativedelta import relativedelta

class CompanyDataProcessing:
    def get_company_overview(outlook_data:dict, key_metrics:dict, stock_intraday:dict, stock_daily:dict):
        result = {}
        key_metrics = key_metrics[0]
        stock_daily = stock_daily["historical"]

        result["currency"] = outlook_data["profile"]["currency"] if "profile" in outlook_data and "currency" in outlook_data["profile"] else None
        result["sector"]  = outlook_data["profile"]["sector"] if "profile" in outlook_data and "sector" in outlook_data["profile"] else None
        result["industry"] = outlook_data["profile"]["industry"] if "profile" in outlook_data and "industry" in outlook_data["profile"] else None
        result["exchange"] = outlook_data["profile"]["exchangeShortName"] if "profile" in outlook_data and "exchangeShortName" in outlook_data["profile"] else None
        result["companyDescription"] = outlook_data["profile"]["description"] if "profile" in outlook_data and "description" in outlook_data["profile"] else None
        result["name"] = outlook_data["profile"]["companyName"] if "profile" in outlook_data and "companyName" in outlook_data["profile"] else None
        result["image"] = outlook_data["profile"]["image"] if "profile" in outlook_data and "image" in outlook_data["profile"] else None
        result["price"] = Util.two_decimal_float(outlook_data["profile"]["price"]) if "profile" in outlook_data and "price" in outlook_data["profile"] else None
        result["priceChange"] = Util.two_decimal_float(outlook_data["profile"]["changes"]) if "profile" in outlook_data and "changes" in outlook_data["profile"] else None

        if "profile" in outlook_data and "price" in outlook_data["profile"] and "changes" in outlook_data["profile"]: 
            result["priceChangePercentage"] = Util.two_decimal_float(Util.get_percentage_change(outlook_data["profile"]["price"], outlook_data["profile"]["price"] + (outlook_data["profile"]["changes"]*-1)))
        else:
            result["priceChangePercentage"] = None
        
        result["marketCap"] = key_metrics["marketCapTTM"] if "marketCapTTM" in key_metrics else None
        result["priceToSalesRatio"] = Util.two_decimal_float(key_metrics["priceToSalesRatioTTM"]) if "priceToSalesRatioTTM" in key_metrics else None
        result["priceToEarningsRatio"] = Util.two_decimal_float(key_metrics["peRatioTTM"]) if "peRatioTTM" in key_metrics else None
        result["earningsPerShare"] = Util.two_decimal_float(key_metrics["netIncomePerShareTTM"]) if "netIncomePerShareTTM" in key_metrics else None
        result["dividendYield"] = Util.two_decimal_float(key_metrics["dividendYieldPercentageTTM"]) if "dividendYieldPercentageTTM" in key_metrics else None
        

        intraday_analyzed = CompanyDataProcessing.analyze_intraday_data(stock_intraday)

        if "lastClose" in intraday_analyzed:
            result["lastClose"] = Util.two_decimal_float(intraday_analyzed["lastClose"])

            if "openPrice" in intraday_analyzed:
                result["openPrice"] = Util.two_decimal_float(intraday_analyzed["openPrice"])
            else:
                result["openPrice"] = None
            
            if "minValue" in intraday_analyzed:
                rangeDiff = Util.two_decimal_float(Util.get_percentage_change(intraday_analyzed["minValue"], intraday_analyzed["lastClose"]))

                pref = ""
                if float(rangeDiff) >= 0:
                    pref = "+"

                result["dayRangeLow"] = Util.two_decimal_float(intraday_analyzed["minValue"]) + " (" + pref + rangeDiff + "%)"
            else:
                result["dayRangeLow"] = None

            if "maxValue" in intraday_analyzed:
                rangeDiff = Util.two_decimal_float(Util.get_percentage_change(intraday_analyzed["maxValue"], intraday_analyzed["lastClose"]))

                pref = ""
                if float(rangeDiff) >= 0:
                    pref = "+"

                result["dayRangeHigh"] = Util.two_decimal_float(intraday_analyzed["maxValue"]) + " (" + pref + rangeDiff + "%)"
            else:
                result["dayRangeHigh"] = None
        else:
            result["lastClose"] = None
            result["openPrice"] = None
            result["dayRangeLow"] = None
            result["dayRangeHigh"] = None
        
        weeks_analyzed = CompanyDataProcessing.analyze_52week_data(stock_daily)

        if "openPrice" in weeks_analyzed:
            result["52WeekOpen"] = Util.two_decimal_float(weeks_analyzed["openPrice"])

        if "lastClose" in weeks_analyzed and "minValue" in weeks_analyzed and "maxValue" in weeks_analyzed:
                rangeDiff = Util.two_decimal_float(Util.get_percentage_change(weeks_analyzed["minValue"], weeks_analyzed["lastClose"]))
                pref = ""
                if float(rangeDiff) >= 0:
                    pref = "+"
                result["52WeekLow"] = Util.two_decimal_float(weeks_analyzed["minValue"]) + " (" + pref + rangeDiff + "%)"

                rangeDiff = Util.two_decimal_float(Util.get_percentage_change(weeks_analyzed["maxValue"], weeks_analyzed["lastClose"]))
                pref = ""
                if float(rangeDiff) >= 0:
                    pref = "+"
                result["52WeekHigh"] = Util.two_decimal_float(weeks_analyzed["maxValue"]) + " (" + pref + rangeDiff + "%)"
        else:
            result["52WeekLow"] = None
            result["52WeekHigh"] = None
        
        result["beta"] = Util.two_decimal_float(outlook_data["profile"]["beta"]) if "profile" in outlook_data and "beta" in outlook_data["profile"] else None

        return result

    def analyze_intraday_data(data:dict)->dict:
        latest_day = None
        result = {
            "openPrice": None,
            "lastClose": None,
            "minValue": None,
            "maxValue": None
        }

        for item in data:
            item_day = item["date"].split(' ')[0]
            result["lastClose"] = item["close"]

            if latest_day is None:
                latest_day = item_day
            else:
                if latest_day != item_day:
                    break
            
            result["openPrice"] = item["open"]
            
            if result["minValue"] is None:
                result["minValue"] = item["low"]
            elif result["minValue"] > item["low"]:
                result["minValue"]  = item["low"]
            
            if result["maxValue"] is None:
                result["maxValue"] = item["high"]
            elif result["maxValue"] < item["high"]:
                result["maxValue"]  = item["high"]
        
        if result["minValue"] is None:
            result["minValue"] = 0.0

        if result["maxValue"] is None:
            result["maxValue"] = 0.0

        if result["openPrice"] is None:
            result["openPrice"] = 0.0
        
        if result["lastClose"] is None:
            result["lastClose"] = 0.0
        
        return result
    
    def analyze_52week_data(data:dict)->dict:
        loadUntil = None
        result = {
            "openPrice": None,
            "lastClose": None,
            "minValue": None,
            "maxValue": None
        }

        for item in data:
            item_day = datetime.strptime(item["date"], '%Y-%m-%d')
            result["lastClose"] = item["close"]

            if loadUntil is None:
                loadUntil = item_day - relativedelta(weeks=52)
            else:
                if loadUntil >= item_day:
                    if loadUntil > item_day:
                        break

                    result["openPrice"] = item["open"]
                    continue

            result["openPrice"] = item["open"]
            
            if result["minValue"] is None:
                result["minValue"] = item["low"]
            elif result["minValue"] > item["low"]:
                result["minValue"]  = item["low"]
            
            if result["maxValue"] is None:
                result["maxValue"] = item["high"]
            elif result["maxValue"] < item["high"]:
                result["maxValue"]  = item["high"]
        
        if result["minValue"] is None:
            result["minValue"] = 0.0

        if result["maxValue"] is None:
            result["maxValue"] = 0.0
        
        if result["lastClose"] is None:
            result["lastClose"] = 0.0
        
        return result
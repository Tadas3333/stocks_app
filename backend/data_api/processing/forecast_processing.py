from common.util import Util 

class ForecastProcessing:
    def get_stock_price_target_consensus(data:dict):
        result = {}

        if data is None or data == []:
            return result

        return {
            "targetHigh": round(float(data[0]["targetHigh"])),
            "targetLow": round(float(data[0]["targetLow"])),
            "targetConsensus": round(float(data[0]["targetConsensus"])),
            "targetMedian": round(float(data[0]["targetMedian"]))
        }

    def get_stock_price_target(data:dict):
        result = []

        if data is None or data == []:
            return result
        
        for target in data:
            result.append({
                "analystName": target["analystName"],
                "analystCompany": target["analystCompany"],
                "priceTarget": round(float(target["adjPriceTarget"])),
                "date": target["publishedDate"][0:10]
            })
        
        return result
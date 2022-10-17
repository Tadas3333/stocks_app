

class ForecastProcessing:
    def get_stock_price_target_consensus(data:dict):
        result = {}

        if data is None or data == []:
            return result

        return {
            "targetHigh": data[0]["targetHigh"],
            "targetLow": data[0]["targetLow"],
            "targetConsensus": data[0]["targetConsensus"],
            "targetMedian": data[0]["targetMedian"]
        }
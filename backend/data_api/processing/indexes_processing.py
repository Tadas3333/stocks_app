from common.util import Util 

class IndexesProcessing:
    def get_prices_of_indexes(data:dict):
        result = {}

        if data is None:
            return result
        
        for index in data:
            if "symbol" in index and \
                "price" in index and \
                "changesPercentage" in index and \
                "change" in index and \
                index["symbol"] in ["^DJI", "^GSPC", "^IXIC", "^RUT", "^RUA", "^VIX"]:

                result[index["symbol"]] = {
                    "price": Util.two_decimal_float(index["price"]),
                    "changeInPercentage": Util.two_decimal_float(index["changesPercentage"]) + "%",
                    "change": Util.two_decimal_float(index["change"])
                }
        return result
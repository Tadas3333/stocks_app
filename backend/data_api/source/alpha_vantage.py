import requests
import json

class AlphaVantage:
    def get_url(function_name:str, args:dict) -> str:
        url = "https://www.alphavantage.co/query?function=" + function_name
        args["apikey"] = "UAQQDYB1XIQRWTWG"

        for key, value in args.items():
            url = url + "&" + str(key) + "=" + str(value)

        return url
    
    def fetch_json(url:str) -> dict:
        result = {}

        with requests.Session() as s:
            result = s.get(url)
            result = result.content.decode('utf-8')
            result = json.loads(result)
        
        return result


    def company_overview(ticker_name:str) -> dict:
        args = {
            "symbol": ticker_name
        }
        url = AlphaVantage.get_url("OVERVIEW", args)
        result = AlphaVantage.fetch_json(url)

        # Data check
        if not result["Symbol"]:
            raise Exception("get_company_overview(ticker_name:"+ticker_name+") failed data check")
        
        return result
        
    def market_news(ticker_name:str) -> dict:
        args = {
            "tickers": ticker_name
        }
        url = AlphaVantage.get_url("NEWS_SENTIMENT", args)
        result = AlphaVantage.fetch_json(url)

        # Data check
        if not result["feed"]:
            raise Exception("get_market_news(ticker_name:"+ticker_name+") failed data check")
        
        return result

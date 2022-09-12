import requests
import json
from datetime import datetime

class FinancialModelingPrep:
    def get_url(function_name:str, args:dict) -> str:
        url = "https://financialmodelingprep.com/api/" + function_name + "?"
        args["apikey"] = "6ace1c1b8a5ea46aa1e3f70ff070f401"

        indx = 0

        for key, value in args.items():
            url = url + ("&" if indx > 0 else "") + str(key) + "=" + str(value)
            indx = indx +1

        return url
    
    def fetch_json(url:str) -> dict:
        result = {}

        with requests.Session() as s:
            result = s.get(url)
            result = result.content.decode('utf-8')
            result = json.loads(result)
        
        return result

    def fetch_company_outlook(ticker_name:str) -> dict:
        args = {
            "symbol": ticker_name
        }
        url = FinancialModelingPrep.get_url("v4/company-outlook", args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if "profile" not in result:
            raise Exception("fetch_company_outlook(ticker_name:"+ticker_name+") failed data check")
        
        return result

    def fetch_company_key_metrics(ticker_name:str) -> dict:
        args = {}
        url = FinancialModelingPrep.get_url("v3/key-metrics-ttm/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if "revenuePerShareTTM" not in result[0]:
            raise Exception("fetch_company_key_metrics(ticker_name:"+ticker_name+") failed data check")
        
        return result

    def fetch_income_statement(ticker_name:str) -> dict:
        args = {
            "limit": 5
        }
        url = FinancialModelingPrep.get_url("v3/income-statement/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if not result[0]["date"]:
            raise Exception("fetch_income_statement(ticker_name:"+ticker_name+") failed data check")
        
        return result

    def fetch_balance_sheet_statement(ticker_name:str) -> dict:
        args = {
            "limit": 5
        }
        url = FinancialModelingPrep.get_url("v3/balance-sheet-statement/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if not result[0]["date"]:
            raise Exception("fetch_balance_sheet_statement(ticker_name:"+ticker_name+") failed data check")
        
        return result
    
    def fetch_cash_flow_statement(ticker_name:str) -> dict:
        args = {
            "limit": 5
        }
        url = FinancialModelingPrep.get_url("v3/cash-flow-statement/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if not result[0]["date"]:
            raise Exception("fetch_cash_flow_statement(ticker_name:"+ticker_name+") failed data check")
        
        return result

    def fetch_stock_intraday(ticker_name:str) -> dict:
        args = {}
        url = FinancialModelingPrep.get_url("v3/historical-chart/1min/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if not result[0]["date"]:
            raise Exception("fetch_stock_intraday(ticker_name:"+ticker_name+") failed data check")
        
        return result
    
    def fetch_stock_5min(ticker_name:str) -> dict:
        args = {}
        url = FinancialModelingPrep.get_url("v3/historical-chart/5min/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if not result[0]["date"]:
            raise Exception("fetch_stock_5min(ticker_name:"+ticker_name+") failed data check")
        
        return result

    def fetch_stock_daily(ticker_name:str) -> dict:
        args = {}
        url = FinancialModelingPrep.get_url("v3/historical-price-full/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if not result["historical"][0]["date"]:
            raise Exception("fetch_stock_daily(ticker_name:"+ticker_name+") failed data check")
        
        return result
    
    def fetch_prices_of_indexes(arg:str) -> dict:
        args = {}
        url = FinancialModelingPrep.get_url("v3/quotes/index", args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        if not result[0]["symbol"]:
            raise Exception("fetch_indexes_prices failed data check")
        
        return result
import requests
import json
from datetime import datetime
from common.util import Util

class FinancialModelingPrep:
    def get_url(function_name:str, args:dict) -> str:
        url = "https://financialmodelingprep.com/api/" + function_name + "?"
        args["apikey"] = "6ace1c1b8a5ea46aa1e3f70ff070f401"

        indx = 0

        for key, value in args.items():
            url = url + ("&" if indx > 0 else "") + str(key) + "=" + str(value)
            indx = indx +1

        return url
    
    def prepare_ticker_name(ticker_name):
        # We do not need to provide exchange name for 
        # Financial Modeling Prep to get the data
        analyzed_ticker = Util.analyze_ticker_name(ticker_name)
        ticker_name = analyzed_ticker["symbol"]
        return ticker_name
    
    def fetch_json(url:str) -> dict:
        result = {}

        with requests.Session() as s:
            result = s.get(url)
            result = result.content.decode('utf-8')
            result = json.loads(result)
        
        return result

    def fetch_company_outlook(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {
            "symbol": ticker_name
        }

        url = FinancialModelingPrep.get_url("v4/company-outlook", args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result["profile"]
        except Exception as e:
            raise Exception("Data check error: fetch_company_outlook. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))

        return result

    def fetch_company_key_metrics(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {}
        url = FinancialModelingPrep.get_url("v3/key-metrics-ttm/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["revenuePerShareTTM"]
        except Exception as e:
            raise Exception("Data check error: fetch_company_key_metrics. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))

        return result

    def fetch_income_statement(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {
            "limit": 5
        }
        url = FinancialModelingPrep.get_url("v3/income-statement/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["date"]
        except Exception as e:
            raise Exception("Data check error: fetch_income_statement. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))
        
        return result

    def fetch_balance_sheet_statement(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {
            "limit": 5
        }
        url = FinancialModelingPrep.get_url("v3/balance-sheet-statement/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["date"]
        except Exception as e:
            raise Exception("Data check error: fetch_balance_sheet_statement. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))
        
        return result
    
    def fetch_cash_flow_statement(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {
            "limit": 5
        }
        url = FinancialModelingPrep.get_url("v3/cash-flow-statement/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["date"]
        except Exception as e:
            raise Exception("Data check error: fetch_cash_flow_statement. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))

        return result

    def fetch_stock_intraday(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {}
        url = FinancialModelingPrep.get_url("v3/historical-chart/1min/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["date"]
        except Exception as e:
            raise Exception("Data check error: fetch_stock_intraday. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))
        
        return result
    
    def fetch_stock_5min(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {}
        url = FinancialModelingPrep.get_url("v3/historical-chart/5min/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["date"]
        except Exception as e:
            raise Exception("Data check error: fetch_stock_5min. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))
        
        return result

    def fetch_stock_daily(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {}
        url = FinancialModelingPrep.get_url("v3/historical-price-full/" + ticker_name, args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result["historical"][0]["date"]
        except Exception as e:
            raise Exception("Data check error: fetch_stock_daily. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))
        
        return result
    
    def fetch_prices_of_indexes(arg:str) -> dict:
        if Util.is_global_ticker_name(arg) == False:
            raise Exception("fetch_indexes_prices failed global ticker name check, arg: " + arg)

        args = {}
        url = FinancialModelingPrep.get_url("v3/quotes/index", args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["symbol"]
        except Exception as e:
            raise Exception("Data check error: fetch_indexes_prices. " +
                            "arg: " + str(arg) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))
        
        return result
    
    def fetch_stock_price_target_consensus(ticker_name:str) -> dict:
        ticker_name = FinancialModelingPrep.prepare_ticker_name(ticker_name)

        args = {
            "symbol": ticker_name
        }

        url = FinancialModelingPrep.get_url("v4/price-target-consensus", args)
        result = FinancialModelingPrep.fetch_json(url)

        # Data check
        try:
            test = result[0]["symbol"]
        except Exception as e:
            raise Exception("Data check error: fetch_stock_price_target_consensus. " +
                            "ticker_name: " + str(ticker_name) + 
                            ", args: " + str(args) +
                            ", result: " + str(result))
            
        return result
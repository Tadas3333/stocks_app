from processing.charts_daily_processing import ChartsDailyProcessing
from processing.financials_processing import FinancialsProcessing
from common.util import Util 

class ForecastProcessing:
    def get_stock_price_target_consensus(data:dict):
        result = {}

        if data is None or data == []:
            return result

        return {
            "targetHigh": Util.d_round(data[0]["targetHigh"]),
            "targetLow": Util.d_round(data[0]["targetLow"]),
            "targetConsensus": Util.d_round(data[0]["targetConsensus"]),
            "targetMedian": Util.d_round(data[0]["targetMedian"])
        }

    def get_stock_price_target(data:dict):
        result = []

        if data is None or data == []:
            return result
        
        for target in data:
            result.append({
                "analystName": target["analystName"],
                "analystCompany": target["analystCompany"],
                "priceTarget": Util.d_round(target["adjPriceTarget"]),
                "date": target["publishedDate"][0:10]
            })
        
        return result

    def get_stock_price_forecast_chart(daily_data:dict, target_data:dict):
        result = {}

        if daily_data is None or target_data is None or  daily_data == [] or target_data == []:
            return result
        
        historical_values = ChartsDailyProcessing.get_stock_3years_chart(daily_data)

        if historical_values is None or "values" not in historical_values:
            return result
        
        historical_values = historical_values["values"]
        consensus_data = ForecastProcessing.get_stock_price_target_consensus(target_data)

        if consensus_data is None or consensus_data == {}:
            return result
        
        future_values = []

        if "targetHigh" in consensus_data and consensus_data["targetHigh"] is not None:
            future_values.append(consensus_data["targetHigh"])

        if "targetLow" in consensus_data and consensus_data["targetLow"] is not None:
            future_values.append(consensus_data["targetLow"])

        if "targetConsensus" in consensus_data and consensus_data["targetConsensus"] is not None:
            future_values.append(consensus_data["targetConsensus"])

        minValue = None
        maxValue = None

        for h in historical_values:
            val = float(h["value"])
            
            if minValue is None or val < minValue:
                minValue = val

            if maxValue is None or val > maxValue:
                maxValue = val
        
        for f in future_values:
            if minValue is None or f < minValue:
                minValue = f

            if maxValue is None or f > maxValue:
                maxValue = f

        return {
            "historicalValues": historical_values,
            "futureValues": future_values,
            "minValue": minValue,
            "maxValue": maxValue
        }

    def get_stock_revenue_forecast_chart(outlook_data:dict, estimates_data:dict):
        result = {}

        if outlook_data is None or estimates_data is None or outlook_data == [] or estimates_data == []:
            return result
        
        income_statement = FinancialsProcessing.get_income_statement(outlook_data)
        income_statement = income_statement["statements"]

        if income_statement == []:
            return result
        
        income_statement.reverse()

        total_historical = 0
        minValue = None
        maxValue = None
        minIncomeStatementYear = None
        historicalValues = []

        for inc in income_statement:
            val = inc["Revenue"]
            date = inc["Date"][0:4]

            historicalValues.append({
                "category": date,
                "value": val
            })

            if minIncomeStatementYear is None or int(minIncomeStatementYear) > int(date):
                minIncomeStatementYear = int(date)

            if minValue is None or minValue > val:
                minValue = val

            if maxValue is None or maxValue < val:
                maxValue = val

            total_historical = total_historical + 1

            if total_historical == 5:
                break
        
        historicalValues.reverse()
        estimates_data.reverse()

        futureValues = []

        for est in estimates_data:
            is_future_value = True
            date = est["date"][0:4]

            if int(date) < minIncomeStatementYear:
                continue

            val = est["estimatedRevenueAvg"]

            for h in historicalValues:
                if h["category"] == date:
                    is_future_value = False
                    break
            
            if is_future_value == True:
                futureValues.append({
                    "category": date,
                    "value": val
                })
            
                if minValue is None or minValue > val:
                    minValue = val

                if maxValue is None or maxValue < val:
                    maxValue = val

        return {
            "historicalValues": historicalValues,
            "futureValues": futureValues,
            "minValue": minValue,
            "maxValue": maxValue
        }
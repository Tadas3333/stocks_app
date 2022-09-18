from common.util import Util 

class FinancialsProcessing:
    def get_income_statement(data:dict):
        result = {
            "statements": []
        }
        
        for s in data["financialsAnnual"]["income"]:
            result["statements"].append({
                "-": s["date"][0:4] if "date" in s else None,
                "Revenue": s["revenue"] if "revenue" in s else None,
                "Cost of Revenue": s["costOfRevenue"] if "costOfRevenue" in s else None,
                "Gross Profit": s["grossProfit"] if "grossProfit" in s else None,
                "Operating Expenses": s["operatingExpenses"] if "operatingExpenses" in s else None,
                "- Selling, General and Administrative Expenses": s["sellingGeneralAndAdministrativeExpenses"] if "sellingGeneralAndAdministrativeExpenses" in s else None,
                "- Research and Development Expenses": s["researchAndDevelopmentExpenses"] if "researchAndDevelopmentExpenses" in s else None,
                "Cost and Expenses": s["costAndExpenses"] if "costAndExpenses" in s else None,
                "Operating Income": s["operatingIncome"] if "operatingIncome" in s else None,
                "Interest Income": s["interestIncome"] if "interestIncome" in s else None,
                "Interest Expense": s["interestExpense"] if "interestExpense" in s else None,
                "Income Tax Expense": s["incomeTaxExpense"] if "incomeTaxExpense" in s else None,
                "Earnings before Tax": s["incomeBeforeTax"] if "incomeBeforeTax" in s else None,
                "Net Income": s["netIncome"] if "netIncome" in s else None,
                "Earnings Per Share Basic": Util.two_decimal_float(s["eps"]) if "eps" in s else None,
                "Earnings Per Share Diluted": Util.two_decimal_float(s["epsdiluted"]) if "epsdiluted" in s else None,
                "Weighted Average Shares Outstanding": Util.two_decimal_float(s["weightedAverageShsOut"]) if "weightedAverageShsOut" in s else None,
                "Weighted Average Shares Outstanding (Diluted)": s["weightedAverageShsOutDil"] if "weightedAverageShsOutDil" in s else None,
                "Gross Profit Margin": Util.two_decimal_float(s["grossProfitRatio"]) if "grossProfitRatio" in s else None,
                "Net Profit Margin": Util.two_decimal_float(s["netIncomeRatio"]) if "netIncomeRatio" in s else None,
                "EBITDA Margin": Util.two_decimal_float(s["ebitdaratio"]) if "ebitdaratio" in s else None,
                "EBITDA": Util.two_decimal_float(s["ebitda"]) if "ebitda" in s else None,
                "Earnings Before Tax Margin": Util.two_decimal_float(s["incomeBeforeTaxRatio"]) if "incomeBeforeTaxRatio" in s else None
            })

        return result

    def get_balance_sheet_statement(data:dict):
        result = {
            "statements": []
        }
        
        for s in data["financialsAnnual"]["balance"]:
            result["statements"].append({
                "-": s["date"][0:4] if "date" in s else None,
                "Total Assets": s["totalAssets"] if "totalAssets" in s else None,
                "Total Current Assets": s["totalCurrentAssets"] if "totalCurrentAssets" in s else None,
                "- Total Current Assets": s["totalCurrentAssets"] if "totalCurrentAssets" in s else None,
                "-- Cash and Short Term Investments": s["cashAndShortTermInvestments"] if "cashAndShortTermInvestments" in s else None,
                "--- Cash and Cash Equivalents": s["cashAndCashEquivalents"] if "cashAndCashEquivalents" in s else None,
                "--- Short Term Investments": s["shortTermInvestments"] if "shortTermInvestments" in s else None,
                "-- Other Current Assets": s["otherCurrentAssets"] if "otherCurrentAssets" in s else None,
                "- Total Non-current Assets": s["totalNonCurrentAssets"] if "totalNonCurrentAssets" in s else None,
                "-- Property, Plant & Equipment Net": s["propertyPlantEquipmentNet"] if "propertyPlantEquipmentNet" in s else None,
                "-- Goodwill and Intangible Assets": s["goodwillAndIntangibleAssets"] if "goodwillAndIntangibleAssets" in s else None,
                "--- Goodwill": s["goodwill"] if "goodwill" in s else None,
                "--- Intangible Assets": s["intangibleAssets"] if "intangibleAssets" in s else None,
                "-- Other Non-current Assets": s["otherNonCurrentAssets"] if "otherNonCurrentAssets" in s else None,
                "Total Liabilities": s["totalLiabilities"] if "totalLiabilities" in s else None,
                "- Total Current Liabilities": s["totalCurrentLiabilities"] if "totalCurrentLiabilities" in s else None,
                "-- Short Term Debt": s["shortTermDebt"] if "shortTermDebt" in s else None,
                "-- Deferred Revenue": s["deferredRevenue"] if "deferredRevenue" in s else None,
                "-- Other Current Liabilities": s["otherCurrentLiabilities"] if "otherCurrentLiabilities" in s else None,
                "- Total Non-current Liabilities": s["totalNonCurrentLiabilities"] if "totalNonCurrentLiabilities" in s else None,
                "-- Long Term Debt": s["longTermDebt"] if "longTermDebt" in s else None,
                "-- Other Non-current Liabilities": s["otherNonCurrentLiabilities"] if "otherNonCurrentLiabilities" in s else None,
                "Total Shareholders Equity": s["totalStockholdersEquity"] if "totalStockholdersEquity" in s else None,
                "- Common Stock": s["commonStock"] if "commonStock" in s else None,
                "- Retained Earnings": s["retainedEarnings"] if "retainedEarnings" in s else None,
                "- Accumulated Other Comprehensive Income Loss": s["accumulatedOtherComprehensiveIncomeLoss"] if "accumulatedOtherComprehensiveIncomeLoss" in s else None,
                "- Other Stockholders Equity": s["othertotalStockholdersEquity"] if "othertotalStockholdersEquity" in s else None,
                "Total Debt": s["totalDebt"] if "totalDebt" in s else None,
                "Net Debt": s["netDebt"] if "netDebt" in s else None
            })
        
        return result

    def get_cash_flow_statement(data:dict) -> dict:
        result = {
            "statements": []
        }
        
        for s in data["financialsAnnual"]["cash"]:
            result["statements"].append({
                "-": s["date"][0:4] if "date" in s else None,
                "Operating Cash Flow": s["operatingCashFlow"] if "operatingCashFlow" in s else None,
                "- Net Income": s["netIncome"] if "netIncome" in s else None,
                "- Depreciation & Amortization": s["depreciationAndAmortization"] if "depreciationAndAmortization" in s else None,
                "- Deferred Income Taxes": s["deferredIncomeTax"] if "deferredIncomeTax" in s else None,
                "- Stock-based Compensation": s["stockBasedCompensation"] if "stockBasedCompensation" in s else None,
                "- Change In Working Capital": s["changeInWorkingCapital"] if "changeInWorkingCapital" in s else None,
                "- Other Non-cash Items": s["otherNonCashItems"] if "otherNonCashItems" in s else None,
                "Investing Cash Flow": s["netCashUsedForInvestingActivites"] if "netCashUsedForInvestingActivites" in s else None,
                "- Investments In PPE": s["investmentsInPropertyPlantAndEquipment"] if "investmentsInPropertyPlantAndEquipment" in s else None,
                "- Acquisitions": s["acquisitionsNet"] if "acquisitionsNet" in s else None,
                "- Investment Purchases": s["purchasesOfInvestments"] if "purchasesOfInvestments" in s else None,
                "- Sales/Maturities Of Investments": s["salesMaturitiesOfInvestments"] if "salesMaturitiesOfInvestments" in s else None,
                "- Other Investing Activites": s["otherInvestingActivites"] if "otherInvestingActivites" in s else None,
                "Financing Cash Flow": s["netCashUsedProvidedByFinancingActivities"] if "netCashUsedProvidedByFinancingActivities" in s else None,
                "- Debt Repayment": s["debtRepayment"] if "debtRepayment" in s else None,
                "- Dividends Payments": s["dividendsPaid"] if "dividendsPaid" in s else None,
                "- Common Stock Repurchased": s["commonStockRepurchased"] if "commonStockRepurchased" in s else None,
                "- Common Stock Issuance": s["commonStockIssued"] if "commonStockIssued" in s else None,
                "- Other Financing Activites": s["otherFinancingActivites"] if "otherFinancingActivites" in s else None,
                "Accounts Receivables": s["accountsReceivables"] if "accountsReceivables" in s else None,
                "Accounts Payables": s["accountsPayables"] if "accountsPayables" in s else None,
                "Inventory": s["inventory"] if "inventory" in s else None,
                "Other Working Capital": s["otherWorkingCapital"] if "otherWorkingCapital" in s else None,
                "Cash At Beginning Of Period": s["cashAtBeginningOfPeriod"] if "cashAtBeginningOfPeriod" in s else None,
                "Cash At End Of Period": s["cashAtEndOfPeriod"] if "cashAtEndOfPeriod" in s else None,
                "Capital Expenditure": s["capitalExpenditure"] if "capitalExpenditure" in s else None,
                "Net cash flow / Change in cash": s["netChangeInCash"] if "netChangeInCash" in s else None,
                "Free Cash Flow": s["freeCashFlow"] if "freeCashFlow" in s else None

            })
        
        return result
from common.util import Util 

class FinancialsProcessing:
    def get_income_statement(data:dict):
        result = {
            "statements": []
        }
        
        for s in data["financialsAnnual"]["income"]:
            result["statements"].append({
                "-": s["date"][0:4] if "date" in s else None,
                "Revenue": Util.to_thousands(s["revenue"]) if "revenue" in s else None,
                "Cost of Revenue": Util.to_thousands(s["costOfRevenue"]) if "costOfRevenue" in s else None,
                "Gross Profit": Util.to_thousands(s["grossProfit"]) if "grossProfit" in s else None,
                "Operating Expenses": Util.to_thousands(s["operatingExpenses"]) if "operatingExpenses" in s else None,
                "- Selling, General and Administrative Expenses": Util.to_thousands(s["sellingGeneralAndAdministrativeExpenses"]) if "sellingGeneralAndAdministrativeExpenses" in s else None,
                "- Research and Development Expenses": Util.to_thousands(s["researchAndDevelopmentExpenses"]) if "researchAndDevelopmentExpenses" in s else None,
                "Cost and Expenses": Util.to_thousands(s["costAndExpenses"]) if "costAndExpenses" in s else None,
                "Operating Income": Util.to_thousands(s["operatingIncome"]) if "operatingIncome" in s else None,
                "Interest Income": Util.to_thousands(s["interestIncome"]) if "interestIncome" in s else None,
                "Interest Expense": Util.to_thousands(s["interestExpense"]) if "interestExpense" in s else None,
                "Income Tax Expense": Util.to_thousands(s["incomeTaxExpense"]) if "incomeTaxExpense" in s else None,
                "Earnings before Tax": Util.to_thousands(s["incomeBeforeTax"]) if "incomeBeforeTax" in s else None,
                "Net Income": Util.to_thousands(s["netIncome"]) if "netIncome" in s else None,
                "Earnings Per Share Basic": Util.two_decimal_float(s["eps"]) if "eps" in s else None,
                "Earnings Per Share Diluted": Util.two_decimal_float(s["epsdiluted"]) if "epsdiluted" in s else None,
                "Weighted Average Shares Outstanding": Util.two_decimal_float(s["weightedAverageShsOut"]) if "weightedAverageShsOut" in s else None,
                "Weighted Average Shares Outstanding (Diluted)": Util.to_thousands(s["weightedAverageShsOutDil"]) if "weightedAverageShsOutDil" in s else None,
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
                "Total Assets": Util.to_thousands(s["totalAssets"]) if "totalAssets" in s else None,
                "Total Current Assets": Util.to_thousands(s["totalCurrentAssets"]) if "totalCurrentAssets" in s else None,
                "- Total Current Assets": Util.to_thousands(s["totalCurrentAssets"]) if "totalCurrentAssets" in s else None,
                "-- Cash and Short Term Investments": Util.to_thousands(s["cashAndShortTermInvestments"]) if "cashAndShortTermInvestments" in s else None,
                "--- Cash and Cash Equivalents": Util.to_thousands(s["cashAndCashEquivalents"]) if "cashAndCashEquivalents" in s else None,
                "--- Short Term Investments": Util.to_thousands(s["shortTermInvestments"]) if "shortTermInvestments" in s else None,
                "-- Other Current Assets": Util.to_thousands(s["otherCurrentAssets"]) if "otherCurrentAssets" in s else None,
                "- Total Non-current Assets": Util.to_thousands(s["totalNonCurrentAssets"]) if "totalNonCurrentAssets" in s else None,
                "-- Property, Plant & Equipment Net": Util.to_thousands(s["propertyPlantEquipmentNet"]) if "propertyPlantEquipmentNet" in s else None,
                "-- Goodwill and Intangible Assets": Util.to_thousands(s["goodwillAndIntangibleAssets"]) if "goodwillAndIntangibleAssets" in s else None,
                "--- Goodwill": Util.to_thousands(s["goodwill"]) if "goodwill" in s else None,
                "--- Intangible Assets": Util.to_thousands(s["intangibleAssets"]) if "intangibleAssets" in s else None,
                "-- Other Non-current Assets": Util.to_thousands(s["otherNonCurrentAssets"]) if "otherNonCurrentAssets" in s else None,
                "Total Liabilities": Util.to_thousands(s["totalLiabilities"]) if "totalLiabilities" in s else None,
                "- Total Current Liabilities": Util.to_thousands(s["totalCurrentLiabilities"]) if "totalCurrentLiabilities" in s else None,
                "-- Short Term Debt": Util.to_thousands(s["shortTermDebt"]) if "shortTermDebt" in s else None,
                "-- Deferred Revenue": Util.to_thousands(s["deferredRevenue"]) if "deferredRevenue" in s else None,
                "-- Other Current Liabilities": Util.to_thousands(s["otherCurrentLiabilities"]) if "otherCurrentLiabilities" in s else None,
                "- Total Non-current Liabilities": Util.to_thousands(s["totalNonCurrentLiabilities"]) if "totalNonCurrentLiabilities" in s else None,
                "-- Long Term Debt": Util.to_thousands(s["longTermDebt"]) if "longTermDebt" in s else None,
                "-- Other Non-current Liabilities": Util.to_thousands(s["otherNonCurrentLiabilities"]) if "otherNonCurrentLiabilities" in s else None,
                "Total Shareholders Equity": Util.to_thousands(s["totalStockholdersEquity"]) if "totalStockholdersEquity" in s else None,
                "- Common Stock": Util.to_thousands(s["commonStock"]) if "commonStock" in s else None,
                "- Retained Earnings": Util.to_thousands(s["retainedEarnings"]) if "retainedEarnings" in s else None,
                "- Accumulated Other Comprehensive Income Loss": Util.to_thousands(s["accumulatedOtherComprehensiveIncomeLoss"]) if "accumulatedOtherComprehensiveIncomeLoss" in s else None,
                "- Other Stockholders Equity": Util.to_thousands(s["othertotalStockholdersEquity"]) if "othertotalStockholdersEquity" in s else None,
                "Total Debt": Util.to_thousands(s["totalDebt"]) if "totalDebt" in s else None,
                "Net Debt": Util.to_thousands(s["netDebt"]) if "netDebt" in s else None
            })
        
        return result

    def get_cash_flow_statement(data:dict) -> dict:
        result = {
            "statements": []
        }
        
        for s in data["financialsAnnual"]["cash"]:
            result["statements"].append({
                "-": s["date"][0:4] if "date" in s else None,
                "Operating Cash Flow": Util.to_thousands(s["operatingCashFlow"]) if "operatingCashFlow" in s else None,
                "- Net Income": Util.to_thousands(s["netIncome"]) if "netIncome" in s else None,
                "- Depreciation & Amortization": Util.to_thousands(s["depreciationAndAmortization"]) if "depreciationAndAmortization" in s else None,
                "- Deferred Income Taxes": Util.to_thousands(s["deferredIncomeTax"]) if "deferredIncomeTax" in s else None,
                "- Stock-based Compensation": Util.to_thousands(s["stockBasedCompensation"]) if "stockBasedCompensation" in s else None,
                "- Change In Working Capital": Util.to_thousands(s["changeInWorkingCapital"]) if "changeInWorkingCapital" in s else None,
                "- Other Non-cash Items": Util.to_thousands(s["otherNonCashItems"]) if "otherNonCashItems" in s else None,
                "Investing Cash Flow": Util.to_thousands(s["netCashUsedForInvestingActivites"]) if "netCashUsedForInvestingActivites" in s else None,
                "- Investments In PPE": Util.to_thousands(s["investmentsInPropertyPlantAndEquipment"]) if "investmentsInPropertyPlantAndEquipment" in s else None,
                "- Acquisitions": Util.to_thousands(s["acquisitionsNet"]) if "acquisitionsNet" in s else None,
                "- Investment Purchases": Util.to_thousands(s["purchasesOfInvestments"]) if "purchasesOfInvestments" in s else None,
                "- Sales/Maturities Of Investments": Util.to_thousands(s["salesMaturitiesOfInvestments"]) if "salesMaturitiesOfInvestments" in s else None,
                "- Other Investing Activites": Util.to_thousands(s["otherInvestingActivites"]) if "otherInvestingActivites" in s else None,
                "Financing Cash Flow": Util.to_thousands(s["netCashUsedProvidedByFinancingActivities"]) if "netCashUsedProvidedByFinancingActivities" in s else None,
                "- Debt Repayment": Util.to_thousands(s["debtRepayment"]) if "debtRepayment" in s else None,
                "- Dividends Payments": Util.to_thousands(s["dividendsPaid"]) if "dividendsPaid" in s else None,
                "- Common Stock Repurchased": Util.to_thousands(s["commonStockRepurchased"]) if "commonStockRepurchased" in s else None,
                "- Common Stock Issuance": Util.to_thousands(s["commonStockIssued"]) if "commonStockIssued" in s else None,
                "- Other Financing Activites": Util.to_thousands(s["otherFinancingActivites"]) if "otherFinancingActivites" in s else None,
                "Accounts Receivables": Util.to_thousands(s["accountsReceivables"]) if "accountsReceivables" in s else None,
                "Accounts Payables": Util.to_thousands(s["accountsPayables"]) if "accountsPayables" in s else None,
                "Inventory": Util.to_thousands(s["inventory"]) if "inventory" in s else None,
                "Other Working Capital": Util.to_thousands(s["otherWorkingCapital"]) if "otherWorkingCapital" in s else None,
                "Cash At Beginning Of Period": Util.to_thousands(s["cashAtBeginningOfPeriod"]) if "cashAtBeginningOfPeriod" in s else None,
                "Cash At End Of Period": Util.to_thousands(s["cashAtEndOfPeriod"]) if "cashAtEndOfPeriod" in s else None,
                "Capital Expenditure": Util.to_thousands(s["capitalExpenditure"]) if "capitalExpenditure" in s else None,
                "Net cash flow / Change in cash": Util.to_thousands(s["netChangeInCash"]) if "netChangeInCash" in s else None,
                "Free Cash Flow": Util.to_thousands(s["freeCashFlow"]) if "freeCashFlow" in s else None

            })
        
        return result
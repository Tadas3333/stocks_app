
from source.financial_modeling_prep import FinancialModelingPrep
from processing.company_data_processing import CompanyDataProcessing
from processing.news_processing import NewsProcessing
from processing.financials_processing import FinancialsProcessing
from processing.charts_intraday_processing import ChartsIntradayProcessing
from processing.charts_5days_processing import Charts5DaysProcessing
from processing.charts_daily_processing import ChartsDailyProcessing
from processing.indexes_processing import IndexesProcessing
from processing.forecast_processing import ForecastProcessing

class DataAPIConfig:
    # Config Keys
    PROCESSED_DATA_NAME = "processed_data_name"
    DATA_PROCESSING_FUNCTION = "data_processing_function"
    SOURCE_DATA_NAME = "source_data_name"
    DATA_SOURCING_FUNCTION = "data_sourcing_function"
    DATA_API_ROUTE = "data_api_route"
    ARGUMENT = "arg"

    # Source config
    SOURCING_CONFIG = [
        {
            SOURCE_DATA_NAME: "COMPANY_OUTLOOK",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_company_outlook
        },
        {
            SOURCE_DATA_NAME: "COMPANY_KEY_METRICS",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_company_key_metrics
        },
        {
            SOURCE_DATA_NAME: "STOCK_INTRADAY",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_stock_intraday
        },
        {
            SOURCE_DATA_NAME: "STOCK_5MIN",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_stock_5min
        },
        {
            SOURCE_DATA_NAME: "STOCK_DAILY",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_stock_daily
        },
        {
            SOURCE_DATA_NAME: "PRICES_OF_INDEXES",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_prices_of_indexes
        },
        {
            SOURCE_DATA_NAME: "STOCK_PRICE_TARGET_CONSENSUS",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_stock_price_target_consensus
        },
        {
            SOURCE_DATA_NAME: "STOCK_PRICE_TARGET",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_stock_price_target
        },
        {
            SOURCE_DATA_NAME: "STOCK_ESTIMATES_YEARLY",
            DATA_SOURCING_FUNCTION: FinancialModelingPrep.fetch_stock_estimates_yearly
        } 
    ]

    # Processing config
    PROCESSING_CONFIG = [
        {
            PROCESSED_DATA_NAME: "COMPANY_OVERVIEW",
            DATA_PROCESSING_FUNCTION: CompanyDataProcessing.get_company_overview
        },
        {
            PROCESSED_DATA_NAME: "STOCK_NEWS",
            DATA_PROCESSING_FUNCTION: NewsProcessing.get_stock_news
        },
        {
            PROCESSED_DATA_NAME: "INCOME_STATEMENT",
            DATA_PROCESSING_FUNCTION: FinancialsProcessing.get_income_statement
        },
        {
            PROCESSED_DATA_NAME: "BALANCE_SHEET_STATEMENT",
            DATA_PROCESSING_FUNCTION: FinancialsProcessing.get_balance_sheet_statement
        },
        {
            PROCESSED_DATA_NAME: "CASH_FLOW_STATEMENT",
            DATA_PROCESSING_FUNCTION: FinancialsProcessing.get_cash_flow_statement
        },
        {
            PROCESSED_DATA_NAME: "STOCK_INTRADAY_CHART",
            DATA_PROCESSING_FUNCTION: ChartsIntradayProcessing.get_stock_intraday_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_5DAYS_CHART",
            DATA_PROCESSING_FUNCTION: Charts5DaysProcessing.get_stock_5days_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_1MONTH_CHART",
            DATA_PROCESSING_FUNCTION: ChartsDailyProcessing.get_stock_1month_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_3MONTHS_CHART",
            DATA_PROCESSING_FUNCTION: ChartsDailyProcessing.get_stock_3months_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_6MONTHS_CHART",
            DATA_PROCESSING_FUNCTION: ChartsDailyProcessing.get_stock_6months_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_YTD_CHART",
            DATA_PROCESSING_FUNCTION: ChartsDailyProcessing.get_stock_ytd_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_1YEAR_CHART",
            DATA_PROCESSING_FUNCTION: ChartsDailyProcessing.get_stock_1year_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_3YEARS_CHART",
            DATA_PROCESSING_FUNCTION: ChartsDailyProcessing.get_stock_3years_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_5YEARS_CHART",
            DATA_PROCESSING_FUNCTION: ChartsDailyProcessing.get_stock_5years_chart
        },
        {
            PROCESSED_DATA_NAME: "PRICES_OF_INDEXES",
            DATA_PROCESSING_FUNCTION: IndexesProcessing.get_prices_of_indexes
        },
        {
            PROCESSED_DATA_NAME: "STOCK_PRICE_TARGET_CONSENSUS",
            DATA_PROCESSING_FUNCTION: ForecastProcessing.get_stock_price_target_consensus
        },
        {
            PROCESSED_DATA_NAME: "STOCK_PRICE_TARGET",
            DATA_PROCESSING_FUNCTION: ForecastProcessing.get_stock_price_target
        },
        {
            PROCESSED_DATA_NAME: "STOCK_PRICE_FORECAST_CHART",
            DATA_PROCESSING_FUNCTION: ForecastProcessing.get_stock_price_forecast_chart
        },
        {
            PROCESSED_DATA_NAME: "STOCK_REVENUE_FORECAST_CHART",
            DATA_PROCESSING_FUNCTION: ForecastProcessing.get_stock_revenue_forecast_chart
        }
    ]

    # Local data api config
    DATA_API_CONFIG = [
        {
            DATA_API_ROUTE: "update_company_overview",
            SOURCE_DATA_NAME: ["COMPANY_OUTLOOK", "COMPANY_KEY_METRICS", "STOCK_INTRADAY", "STOCK_DAILY"],
            PROCESSED_DATA_NAME: "COMPANY_OVERVIEW"
        },
        {
            DATA_API_ROUTE: "update_stock_news",
            SOURCE_DATA_NAME: "COMPANY_OUTLOOK",
            PROCESSED_DATA_NAME: "STOCK_NEWS"
        },
        {
            DATA_API_ROUTE: "update_income_statement",
            SOURCE_DATA_NAME: "COMPANY_OUTLOOK",
            PROCESSED_DATA_NAME: "INCOME_STATEMENT"
        },
        {
            DATA_API_ROUTE: "update_balance_sheet_statement",
            SOURCE_DATA_NAME: "COMPANY_OUTLOOK",
            PROCESSED_DATA_NAME: "BALANCE_SHEET_STATEMENT"
        },
        {
            DATA_API_ROUTE: "update_cash_flow_statement",
            SOURCE_DATA_NAME: "COMPANY_OUTLOOK",
            PROCESSED_DATA_NAME: "CASH_FLOW_STATEMENT"
        },
        {
            DATA_API_ROUTE: "update_stock_intraday_chart",
            SOURCE_DATA_NAME: "STOCK_INTRADAY",
            PROCESSED_DATA_NAME: "STOCK_INTRADAY_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_5days_chart",
            SOURCE_DATA_NAME: "STOCK_5MIN",
            PROCESSED_DATA_NAME: "STOCK_5DAYS_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_1month_chart",
            SOURCE_DATA_NAME: "STOCK_DAILY",
            PROCESSED_DATA_NAME: "STOCK_1MONTH_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_3months_chart",
            SOURCE_DATA_NAME: "STOCK_DAILY",
            PROCESSED_DATA_NAME: "STOCK_3MONTHS_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_6months_chart",
            SOURCE_DATA_NAME: "STOCK_DAILY",
            PROCESSED_DATA_NAME: "STOCK_6MONTHS_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_ytd_chart",
            SOURCE_DATA_NAME: "STOCK_DAILY",
            PROCESSED_DATA_NAME: "STOCK_YTD_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_1year_chart",
            SOURCE_DATA_NAME: "STOCK_DAILY",
            PROCESSED_DATA_NAME: "STOCK_1YEAR_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_3years_chart",
            SOURCE_DATA_NAME: "STOCK_DAILY",
            PROCESSED_DATA_NAME: "STOCK_3YEARS_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_5years_chart",
            SOURCE_DATA_NAME: "STOCK_DAILY",
            PROCESSED_DATA_NAME: "STOCK_5YEARS_CHART"
        },
        {
            DATA_API_ROUTE: "update_prices_of_indexes",
            SOURCE_DATA_NAME: "PRICES_OF_INDEXES",
            PROCESSED_DATA_NAME: "PRICES_OF_INDEXES"
        },
        {
            DATA_API_ROUTE: "update_stock_price_target_consensus",
            SOURCE_DATA_NAME: "STOCK_PRICE_TARGET_CONSENSUS",
            PROCESSED_DATA_NAME: "STOCK_PRICE_TARGET_CONSENSUS"
        },
        {
            DATA_API_ROUTE: "update_stock_price_target",
            SOURCE_DATA_NAME: "STOCK_PRICE_TARGET",
            PROCESSED_DATA_NAME: "STOCK_PRICE_TARGET"
        },
        {
            DATA_API_ROUTE: "update_stock_price_forecast_chart",
            SOURCE_DATA_NAME: ["STOCK_DAILY", "STOCK_PRICE_TARGET_CONSENSUS"],
            PROCESSED_DATA_NAME: "STOCK_PRICE_FORECAST_CHART"
        },
        {
            DATA_API_ROUTE: "update_stock_revenue_forecast_chart",
            SOURCE_DATA_NAME: ["COMPANY_OUTLOOK", "STOCK_ESTIMATES_YEARLY"],
            PROCESSED_DATA_NAME: "STOCK_REVENUE_FORECAST_CHART"
        }
    ]
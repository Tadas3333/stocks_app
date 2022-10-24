class ClientAPIConfig:
    # Config Keys
    PROCESSED_DATA_NAME = "processed_data_name"
    CLIENT_API_ROUTE = "client_api_route"
    DATA_API_UPDATE_ROUTE = "data_api_route"
    ARGUMENT = "arg"

    # Public data api config
    CLIENT_API_CONFIG = [
        {
            CLIENT_API_ROUTE: "get_company_overview",
            PROCESSED_DATA_NAME: "COMPANY_OVERVIEW",
            DATA_API_UPDATE_ROUTE: "update_company_overview"
        },
        {
            CLIENT_API_ROUTE: "get_stock_news",
            PROCESSED_DATA_NAME: "STOCK_NEWS",
            DATA_API_UPDATE_ROUTE: "update_stock_news"
        },
        {
            CLIENT_API_ROUTE: "get_income_statement",
            PROCESSED_DATA_NAME: "INCOME_STATEMENT",
            DATA_API_UPDATE_ROUTE: "update_income_statement"
        },
        {
            CLIENT_API_ROUTE: "get_balance_sheet_statement",
            PROCESSED_DATA_NAME: "BALANCE_SHEET_STATEMENT",
            DATA_API_UPDATE_ROUTE: "update_balance_sheet_statement"
        },
        {
            CLIENT_API_ROUTE: "get_cash_flow_statement",
            PROCESSED_DATA_NAME: "CASH_FLOW_STATEMENT",
            DATA_API_UPDATE_ROUTE: "update_cash_flow_statement"
        },
        {
            CLIENT_API_ROUTE: "get_stock_intraday_chart",
            PROCESSED_DATA_NAME: "STOCK_INTRADAY_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_intraday_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_5days_chart",
            PROCESSED_DATA_NAME: "STOCK_5DAYS_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_5days_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_1month_chart",
            PROCESSED_DATA_NAME: "STOCK_1MONTH_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_1month_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_3months_chart",
            PROCESSED_DATA_NAME: "STOCK_3MONTHS_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_3months_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_6months_chart",
            PROCESSED_DATA_NAME: "STOCK_6MONTHS_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_6months_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_1year_chart",
            PROCESSED_DATA_NAME: "STOCK_1YEAR_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_1year_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_ytd_chart",
            PROCESSED_DATA_NAME: "STOCK_YTD_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_ytd_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_3years_chart",
            PROCESSED_DATA_NAME: "STOCK_3YEARS_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_3years_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_5years_chart",
            PROCESSED_DATA_NAME: "STOCK_5YEARS_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_5years_chart"
        },
        {
            CLIENT_API_ROUTE: "get_prices_of_indexes",
            PROCESSED_DATA_NAME: "PRICES_OF_INDEXES",
            DATA_API_UPDATE_ROUTE: "update_prices_of_indexes"
        },
        {
            CLIENT_API_ROUTE: "get_stock_price_target_consensus",
            PROCESSED_DATA_NAME: "STOCK_PRICE_TARGET_CONSENSUS",
            DATA_API_UPDATE_ROUTE: "update_stock_price_target_consensus"
        },
        {
            CLIENT_API_ROUTE: "get_stock_price_target",
            PROCESSED_DATA_NAME: "STOCK_PRICE_TARGET",
            DATA_API_UPDATE_ROUTE: "update_stock_price_target"
        },
        {
            CLIENT_API_ROUTE: "get_stock_price_forecast_chart",
            PROCESSED_DATA_NAME: "STOCK_PRICE_FORECAST_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_price_forecast_chart"
        },
        {
            CLIENT_API_ROUTE: "get_stock_revenue_forecast_chart",
            PROCESSED_DATA_NAME: "STOCK_REVENUE_FORECAST_CHART",
            DATA_API_UPDATE_ROUTE: "update_stock_revenue_forecast_chart"
        }
    ]
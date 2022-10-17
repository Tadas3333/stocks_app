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
            CLIENT_API_ROUTE: "get_stock_intraday",
            PROCESSED_DATA_NAME: "STOCK_INTRADAY",
            DATA_API_UPDATE_ROUTE: "update_stock_intraday"
        },
        {
            CLIENT_API_ROUTE: "get_stock_5days",
            PROCESSED_DATA_NAME: "STOCK_5DAYS",
            DATA_API_UPDATE_ROUTE: "update_stock_5days"
        },
        {
            CLIENT_API_ROUTE: "get_stock_1month",
            PROCESSED_DATA_NAME: "STOCK_1MONTH",
            DATA_API_UPDATE_ROUTE: "update_stock_1month"
        },
        {
            CLIENT_API_ROUTE: "get_stock_3months",
            PROCESSED_DATA_NAME: "STOCK_3MONTHS",
            DATA_API_UPDATE_ROUTE: "update_stock_3months"
        },
        {
            CLIENT_API_ROUTE: "get_stock_6months",
            PROCESSED_DATA_NAME: "STOCK_6MONTHS",
            DATA_API_UPDATE_ROUTE: "update_stock_6months"
        },
        {
            CLIENT_API_ROUTE: "get_stock_1year",
            PROCESSED_DATA_NAME: "STOCK_1YEAR",
            DATA_API_UPDATE_ROUTE: "update_stock_1year"
        },
        {
            CLIENT_API_ROUTE: "get_stock_ytd",
            PROCESSED_DATA_NAME: "STOCK_YTD",
            DATA_API_UPDATE_ROUTE: "update_stock_ytd"
        },
        {
            CLIENT_API_ROUTE: "get_stock_3years",
            PROCESSED_DATA_NAME: "STOCK_3YEARS",
            DATA_API_UPDATE_ROUTE: "update_stock_3years"
        },
        {
            CLIENT_API_ROUTE: "get_stock_5years",
            PROCESSED_DATA_NAME: "STOCK_5YEARS",
            DATA_API_UPDATE_ROUTE: "update_stock_5years"
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
        }
    ]
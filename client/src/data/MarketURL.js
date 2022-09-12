export default class MarketURL {
    static NO_ARG = "NONE";

    static companyOverview(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_company_overview?arg="+tickerName;
    }

    static marketNews(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_news?arg="+tickerName;
    }

    static stockIntraday(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_intraday?arg="+tickerName;
    }

    static stock5days(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_5days?arg="+tickerName;
    }

    static stock1month(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_1month?arg="+tickerName;
    }

    static stock3months(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_3months?arg="+tickerName;
    }

    static stock6months(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_6months?arg="+tickerName;
    }

    static stockYtd(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_ytd?arg="+tickerName;
    }

    static stock1year(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_1year?arg="+tickerName;
    }

    static stock3years(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_3years?arg="+tickerName;
    }

    static stock5years(tickerName) {
        if(!tickerName) {
            return "";
        }
        
        return "/get_stock_5years?arg="+tickerName;
    }

    static statements(data, tickerName) {
        if(!data || !tickerName) {
            return "";
        }

        if(data === "INCOME_STATEMENT") {
            return "/get_income_statement?arg="+tickerName;
        }
        else if(data === "BALANCE_SHEET_STATEMENT") {
            return "/get_balance_sheet_statement?arg="+tickerName;
        }
        else if(data === "CASH_FLOW_STATEMENT") {
            return "/get_cash_flow_statement?arg="+tickerName;
        }
        else {
            return "";
        }
    }

    static pricesOfIndexes() {
        return "/get_prices_of_indexes?arg="+MarketURL.NO_ARG;
    }
}
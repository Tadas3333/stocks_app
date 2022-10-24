import { useState, useEffect } from 'react';
import Util from 'util/Util';
import URL from 'data/url/URL';

export default function useStockHistoricalPriceData(tickerSymbol, dataType) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        try {
            if(!Util.isNull(tickerSymbol) && !Util.isNull(dataType)) {
                var url = "";
                if(dataType === "1D") {
                  url = "get_stock_intraday_chart";
                } else if (dataType === "5D") {
                  url = "get_stock_5days_chart";
                } else if (dataType === "1M") {
                  url = "get_stock_1month_chart";
                } else if (dataType === "3M") {
                  url = "get_stock_3months_chart";
                } else if (dataType === "6M") {
                  url = "get_stock_6months_chart";
                } else if (dataType === "1Y") {
                  url = "get_stock_1year_chart"; 
                } else if (dataType === "3Y") {
                  url = "get_stock_3years_chart";
                } else if (dataType === "5Y") {
                  url = "get_stock_5years_chart";
                } else {
                  url = "get_stock_ytd_chart";
                }

                fetch(URL.prepareURL(url, tickerSymbol))
                .then(res => res.json())
                .then(data => {
                    setData(data);
                });
            }
        } catch(err) {
            console.log(err);
        };
    }, [tickerSymbol, dataType]);
    
    return data;
}
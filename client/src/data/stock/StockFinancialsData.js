import { useState, useEffect } from 'react';
import Util from 'util/Util';
import URL from 'data/url/URL';

export default function useStockFinancialsData(tickerSymbol, dataType) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        try {
            if(!Util.isNull(tickerSymbol) && !Util.isNull(dataType)) {
                var url = "";
                if(dataType === "INCOME_STATEMENT") {
                  url = "get_income_statement";
                } else if (dataType === "BALANCE_SHEET_STATEMENT") {
                  url = "get_balance_sheet_statement";
                } else {
                  url = "get_cash_flow_statement";
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
import { useState, useEffect } from 'react';
import Util from 'util/Util';
import URL from 'data/url/URL';

export default function useStockOverviewData(tickerSymbol) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        try {
            if(!Util.isNull(tickerSymbol)) {
                fetch(URL.prepareURL("get_company_overview", tickerSymbol))
                .then(res => res.json())
                .then(data => {
                    setData(data);
                });
            }
        } catch(err) {
            console.log(err);
        };
    }, [tickerSymbol]);
    
    return data;
}
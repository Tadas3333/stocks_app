import { useState, useEffect } from 'react';
import Util from 'util/Util';
import URL from 'data/url/URL';

export default function useStockPriceTargetConsensusData(tickerSymbol) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        try {
            if(!Util.isNull(tickerSymbol)) {
                fetch(URL.prepareURL("get_stock_price_target_consensus", tickerSymbol))
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
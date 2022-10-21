import { useState, useEffect } from 'react';
import useStockPriceTargetData from 'data/stock/StockPriceTargetData'
import Util from 'util/Util';
import Table from "components/table/Table"

export default function PriceTargetAnalysts(props) {
    const priceData = useStockPriceTargetData(props.tickerData.tickerSymbol);
    const [tableRows, setTableRows] = useState([])

    useEffect(() => {
        try {
            if(!Util.isNull(priceData)) {
                var rows = [];

                for(var i=0; i < priceData.length; i++) {
                    rows.push(
                        {
                            columns: 
                            [
                                {content: <>
                                            {
                                              (!Util.isNull(priceData[i].analystName)
                                              ?
                                              <>{priceData[i].analystName}<br/>{priceData[i].analystCompany}</>
                                              :
                                              <>{priceData[i].analystCompany}</>
                                              )
                                            }
                                        </>}, 
                                {content: <>{props.tickerData.tickerCurrencySymbol}
                                            {priceData[i].priceTarget}
                                          </>}, 
                                {content: <>+100%</>},
                                {content: <>{priceData[i].date}</>}
                            ]
                        }
                    );
                }
                setTableRows(rows);
            }
        } catch(err) {
            console.log(err);
        };
    }, [priceData, props.tickerData.tickerCurrencySymbol]);

	return (
            <Table 
            maxHeight="300px"
            headerColumns={
                ["Name / Company", 
                 "Price Target", 
                 "Upside / Downside", 
                 "Date"]}
            rows={tableRows}
            />
        );
}
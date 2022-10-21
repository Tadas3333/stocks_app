import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, 
         faArrowUp} from '@fortawesome/free-solid-svg-icons'
import useStockPriceTargetData from 'data/stock/StockPriceTargetData'
import Util from 'util/Util';
import Table from "components/table/Table"

export default function PriceTargetAnalysts(props) {
    const priceData = useStockPriceTargetData(props.tickerData.tickerSymbol);
    const [tableRows, setTableRows] = useState([])

    useEffect(() => {
        try {
            if(!Util.isNull(priceData) && !Util.isNull(props.tickerData.tickerSymbol)) {
                var rows = [];

                for(var i=0; i < priceData.length; i++) {
                    var percentageUpsideDownside = 
                        Util.roundFloatDecimals(Util.getPercentageChange(priceData[i].priceTarget,
                                                            props.tickerData.tickerPrice), 2);
                    
                    if(percentageUpsideDownside >= 0.0) {
                        percentageUpsideDownside = 
                            <span className="color-positive font-weight-500">
                                <FontAwesomeIcon icon={faArrowUp} transform="shrink-3"/>
                                <span className="ps-1">+{percentageUpsideDownside}%</span>
                            </span>;
                    } else {
                        percentageUpsideDownside = 
                            <span className="color-negative font-weight-500">
                                <FontAwesomeIcon icon={faArrowDown} transform="shrink-3"/>
                                <span className="ps-1">{percentageUpsideDownside}%</span>
                            </span>;
                    }

                    rows.push(
                        {
                            columns: 
                            [
                                {content: <>
                                            {
                                              (!Util.isNull(priceData[i].analystName)
                                              ?
                                              <>
                                                <span className="color-grey-700">{priceData[i].analystName}</span><br/>
                                                <span className="font-weight-500">{priceData[i].analystCompany}</span>
                                              </>
                                              :
                                                <span className="font-weight-500">{priceData[i].analystCompany}</span>
                                              )
                                            }
                                        </>}, 
                                {content: <span className="font-weight-500">
                                            {props.tickerData.tickerCurrencySymbol}
                                            {priceData[i].priceTarget}
                                          </span>}, 
                                {content: percentageUpsideDownside},
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
    }, [priceData, props.tickerData]);

	return (
            <Table 
            maxHeight="300px"
            headerColumns={
                [{content: <>Name / Company</>}, 
                 {content: <>Price Target</>}, 
                 {content: <>Upside / Downside</>}, 
                 {content: <>Date</>}]}
            rows={tableRows}
            />
        );
}
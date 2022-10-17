import { useState, useEffect } from 'react';

import LineForecastChartTemplate from "components/chart_templates/LineForecastChartTemplate"
import useStockHistoricalPriceData from 'data/stock/StockHistoricalPriceData'
import useStockPriceTargetConsensusData from 'data/stock/StockPriceTargetConsensusData'
import Util from 'util/Util';

export default function PriceTargetChart(props) {
    const priceData = useStockHistoricalPriceData(props.tickerSymbol, '3Y');
    const priceTargetData = useStockPriceTargetConsensusData(props.tickerSymbol);
    const [forecastValues, setForecastValues] = useState([]);

    useEffect(() => {
        try {
            if(!Util.isNull(priceTargetData)) {
                var values = [];

                if(!Util.isNull(priceTargetData["targetHigh"])) {
                    values.push(priceTargetData["targetHigh"]);
                }

                if(!Util.isNull(priceTargetData["targetLow"])) {
                    values.push(priceTargetData["targetLow"]);
                }

                if(!Util.isNull(priceTargetData["targetConsensus"])) {
                    values.push(priceTargetData["targetConsensus"]);
                }
                
                setForecastValues(values);
            }
        } catch(err) {
            console.log(err);
        };
    }, [priceTargetData]);
    

	return (
		<>
        <div className="row">
            <div className="col-6">
                <LineForecastChartTemplate 
                historicalData={priceData} 
                forecastValues={forecastValues}
                />
            </div>
        </div>
        </>
        );
}
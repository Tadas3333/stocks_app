import { useState, useEffect } from 'react';

import LineForecastChartTemplate from "components/chart_templates/LineForecastChartTemplate"
import useStockHistoricalPriceData from 'data/stock/StockHistoricalPriceData'
import useStockPriceTargetConsensusData from 'data/stock/StockPriceTargetConsensusData'
import Util from 'util/Util';

export default function PriceTargetChart(props) {
    const priceData = useStockHistoricalPriceData(props.tickerSymbol, '3Y');
    const priceTargetData = useStockPriceTargetConsensusData(props.tickerSymbol);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        try {
            if(!Util.isNull(priceData) && !Util.isNull(priceTargetData)) {
                var forecastValues = [];

                if(!Util.isNull(priceTargetData.targetHigh)) {
                    forecastValues.push(priceTargetData.targetHigh);
                }

                if(!Util.isNull(priceTargetData.targetLow)) {
                    forecastValues.push(priceTargetData.targetLow);
                }

                if(!Util.isNull(priceTargetData.targetConsensus)) {
                    forecastValues.push(priceTargetData.targetConsensus);
                }
                
                var historicalValues = []
                
                if(priceData.data.length > 100 ) {
                    for(var i=0; i < priceData.data.length; i++) {
                        if(i%5 === 0) {
                            historicalValues.push(priceData.data[i]);
                        }
                    }
                } else {
                    historicalValues = priceData.data;
                }

                var data = {
                    "historicalValues": {
                        "minValue": priceData.minValue,
                        "maxValue": priceData.maxValue,
                        "data": historicalValues
                    },
                    "futureValues": forecastValues
                }

                setChartData(data);
            }
        } catch(err) {
            console.log(err);
        };
    }, [priceData, priceTargetData]);
    

	return (
		<>
        <div className="row">
            <div className="col-6">
                {
                        !Util.isNull(chartData) && !Util.isNull(chartData.futureValues) 
                        ?
                        (
                            chartData.futureValues.length > 0
                            ?
                            <LineForecastChartTemplate 
                            data={chartData}
                            />
                            :
                            <>There are no price targets available for this ticker symbol</>
                        ) 
                        :
                        <></>
                }

            </div>
        </div>
        </>
        );
}
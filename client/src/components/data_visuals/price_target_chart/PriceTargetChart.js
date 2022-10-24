import LineTargetForecastChartTemplate from "components/chart_templates/LineTargetForecastChartTemplate"
import useStockPriceForecastChartData from 'data/stock/StockPriceForecastChartData'
import Util from 'util/Util';

export default function PriceTargetChart(props) {
    const chartData = useStockPriceForecastChartData(props.tickerSymbol, '3Y');

	return (
		<>
        {
                !Util.isNull(chartData) && !Util.isNull(chartData.futureValues) 
                ?
                (
                    chartData.futureValues.length > 0
                    ?
                    <LineTargetForecastChartTemplate 
                    data={chartData}
                    />
                    :
                    <>There are no price targets available for this ticker symbol</>
                ) 
                :
                <></>
        }
        </>
        );
}
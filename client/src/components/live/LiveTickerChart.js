import './LiveTickerChart.scss'
import {useEffect, useState} from 'react'
import Util from 'util/Util'
import useStockHistoricalPriceData from 'data/stock/StockHistoricalPriceData'
import SimpleTickerChartTemplate from 'components/chart_templates/SimpleTickerChartTemplate'
import $ from 'jquery';

export default function TickerChart(props) {
    const [chartType, setChartType] = useState("1D");
    const data = useStockHistoricalPriceData(props.tickerSymbol, chartType);

    useEffect(() => {
            $(".live-ticker-chart-navigation-button").removeClass("live-ticker-chart-navigation-button-active");
            var activeLink = $(".live-ticker-chart-navigation").find(".live-ticker-chart-" + chartType);
            if(activeLink && activeLink.length > 0) {
                activeLink = activeLink[0];
                $(activeLink).addClass("live-ticker-chart-navigation-button-active");
            }
    }, [chartType]);

	return (
		<>
            <div className="live-ticker-chart-navigation mb-2 no-select">
                <span className="live-ticker-chart-navigation-button live-ticker-chart-1D" onClick={() => setChartType('1D')}>
                    1D
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-5D" onClick={() => setChartType('5D')}>
                    5D
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-1M" onClick={() => setChartType('1M')}>
                    1M
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-3M" onClick={() => setChartType('3M')}>
                    3M
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-6M" onClick={() => setChartType('6M')}>
                    6M
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-YTD" onClick={() => setChartType('YTD')}>
                    YTD
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-1Y" onClick={() => setChartType('1Y')}>
                    1Y
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-3Y" onClick={() => setChartType('3Y')}>
                    3Y
                </span>

                <span className="live-ticker-chart-navigation-button live-ticker-chart-5Y" onClick={() => setChartType('5Y')}>
                    5Y
                </span>
            </div>

            <SimpleTickerChartTemplate data={data}
                                       currency={Util.nvl_json(props.overviewData, "currency", null)}/>
		</>
	);
}
import './TickerChart.scss'
import {useEffect, useState} from 'react'
import SimpleTickerChartTemplate from './templates/SimpleTickerChartTemplate'
import $ from 'jquery';

export default function TickerChart(props) {
    const [chartType, setChartType] = useState("1D");

    useEffect(() => {
        $(".ticker-chart-navigation-button").removeClass("ticker-chart-navigation-button-active");
        var activeLink = $(".ticker-chart-navigation").find(".ticker-chart-" + chartType);

        if(activeLink && activeLink.length > 0) {
            activeLink = activeLink[0];
            $(activeLink).addClass("ticker-chart-navigation-button-active");
        }
    }, [chartType]);

	return (
		<>
            <div className="ticker-chart-navigation mb-2 no-select">
                <span className="ticker-chart-navigation-button ticker-chart-1D" onClick={() => setChartType('1D')}>
                    1D
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-5D" onClick={() => setChartType('5D')}>
                    5D
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-1M" onClick={() => setChartType('1M')}>
                    1M
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-3M" onClick={() => setChartType('3M')}>
                    3M
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-6M" onClick={() => setChartType('6M')}>
                    6M
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-YTD" onClick={() => setChartType('YTD')}>
                    YTD
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-1Y" onClick={() => setChartType('1Y')}>
                    1Y
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-3Y" onClick={() => setChartType('3Y')}>
                    3Y
                </span>

                <span className="ticker-chart-navigation-button ticker-chart-5Y" onClick={() => setChartType('5Y')}>
                    5Y
                </span>
            </div>
            <SimpleTickerChartTemplate tickerSymbol={props.tickerSymbol} chartType={chartType} currency={props.currency}/>
		</>
	);
}
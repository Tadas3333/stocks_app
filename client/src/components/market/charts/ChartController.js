import './ChartController.scss'
import {useEffect, useState} from 'react'
import TickerChart from './TickerChart'
import $ from 'jquery';

export default function ChartController(props) {
    const [chartType, setChartType] = useState("1D");

    useEffect(() => {
        $(".chart-controller-navigation-button").removeClass("chart-controller-navigation-button-active");
        var activeLink = $(".chart-controller-navigation").find(".chart-controller-" + chartType);

        if(activeLink && activeLink.length > 0) {
            activeLink = activeLink[0];
            $(activeLink).addClass("chart-controller-navigation-button-active");
        }
    }, [chartType]);

	return (
		<>
            <div className="chart-controller-navigation mb-2 no-select">
                <span className="chart-controller-navigation-button chart-controller-1D" onClick={() => setChartType('1D')}>
                    1D
                </span>

                <span className="chart-controller-navigation-button chart-controller-5D" onClick={() => setChartType('5D')}>
                    5D
                </span>

                <span className="chart-controller-navigation-button chart-controller-1M" onClick={() => setChartType('1M')}>
                    1M
                </span>

                <span className="chart-controller-navigation-button chart-controller-3M" onClick={() => setChartType('3M')}>
                    3M
                </span>

                <span className="chart-controller-navigation-button chart-controller-6M" onClick={() => setChartType('6M')}>
                    6M
                </span>

                <span className="chart-controller-navigation-button chart-controller-YTD" onClick={() => setChartType('YTD')}>
                    YTD
                </span>

                <span className="chart-controller-navigation-button chart-controller-1Y" onClick={() => setChartType('1Y')}>
                    1Y
                </span>

                <span className="chart-controller-navigation-button chart-controller-3Y" onClick={() => setChartType('3Y')}>
                    3Y
                </span>

                <span className="chart-controller-navigation-button chart-controller-5Y" onClick={() => setChartType('5Y')}>
                    5Y
                </span>
            </div>
            <TickerChart tickerSymbol={props.tickerSymbol} chartType={chartType} currency={props.currency}/>
		</>
	);
}
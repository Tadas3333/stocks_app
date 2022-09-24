import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { faNewspaper, faListCheck, faFileInvoiceDollar, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import TickerPageLayout from 'layouts/ticker/TickerPageLayout'
import StockRoutes from 'routes/stock/StockRoutes'
import useStockOverviewData from 'data/stock/StockOverviewData'
import LiveTickerData from 'components/live/LiveTickerData'
import LiveTickerChart from 'components/live/LiveTickerChart'
import PageTopTickerName from 'components/various/PageTopTickerName'
import Util from 'util/Util';

export default function StockPage() {
	var params = useParams();
	const [tickerSymbol, setTickerSymbol] = useState();
	const overviewData = useStockOverviewData(tickerSymbol);

	useEffect(() =>
	{
		setTickerSymbol(Util.prepareTickerSymbol(params.exchange, params.symbol));
	}, [params]);
	
	return (
		<TickerPageLayout 
			tickerName=
			{
				<PageTopTickerName tickerSymbol={tickerSymbol} overviewData={overviewData}/>
			}

			tickerData=
			{
				<LiveTickerData tickerSymbol={tickerSymbol} overviewData={overviewData}/>
			}

			tickerChart=
			{
				<LiveTickerChart tickerSymbol={tickerSymbol} overviewData={overviewData}/>
			}

			subPageLinks=
			{
				[
					{
						to: "summary",
						text: "Summary",
						icon: faNewspaper
					},
					{
						to: "analysis",
						text: "Analysis",
						icon: faListCheck
					},
					{
						to: "forecast",
						text: "Forecast",
						icon: faArrowTrendUp
					},
					{
						to: "financials/income-statement",
						text: "Financials",
						icon: faFileInvoiceDollar
					}
				]
			}

			subPageRoutes=
			{
				<StockRoutes tickerSymbol={tickerSymbol} overviewData={overviewData}/>
			}
		/>
	)
}
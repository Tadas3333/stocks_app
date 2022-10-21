import { useParams } from "react-router-dom";
import { useState, useEffect} from 'react';
import { faNewspaper, faListCheck, faFileInvoiceDollar, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import TickerPageLayout from 'layouts/ticker/TickerPageLayout'
import StockRoutes from 'routes/stock/StockRoutes'
import useStockOverviewData from 'data/stock/StockOverviewData'
import LiveTickerData from 'components/live/LiveTickerData'
import LiveTickerRangesData from 'components/live/LiveTickerRangesData'
import LiveTickerChart from 'components/live/LiveTickerChart'
import PageTopTickerName from 'components/ticker/PageTopTickerName'
import Util from 'util/Util';

export default function StockPage() {
	var params = useParams();
	const [tickerSymbol, setTickerSymbol] = useState();
	const overviewData = useStockOverviewData(tickerSymbol);
	const [tickerData, setTickerData] = useState({
		tickerSymbol: null,
		tickerSymbolNoExchange: null,
		tickerName: null,
		tickerCurrency: null,
		tickerCurrencySymbol: null,
		tickerPrice: null,
		tickerPriceChange: null,
		tickerPriceChangePercentage: null,
		tickerOverview: null
	});

	useEffect(() =>
	{
		setTickerSymbol(Util.prepareTickerSymbol(params.exchange, params.symbol));
	}, [params]);

	useEffect(() =>
	{
		if(!Util.isNull(tickerSymbol) && 
		   !Util.isNull(overviewData) && 
		   !Util.isNull(overviewData.currency)) {
			
			setTickerData({
				tickerSymbol: tickerSymbol,
				tickerSymbolNoExchange: Util.removeExchange(tickerSymbol),
				tickerName: overviewData.name,
				tickerCurrency: overviewData.currency,
				tickerCurrencySymbol: Util.getCurrencySymbol(overviewData.currency),
				tickerPrice: overviewData.price,
				tickerPriceChange: overviewData.priceChange,
				tickerPriceChangePercentage: overviewData.priceChangePercentage,
				tickerOverview: overviewData
			});
		}
	}, [tickerSymbol, overviewData]);
	
	return (
		<TickerPageLayout 
			tickerName=
			{
				<PageTopTickerName tickerData={tickerData}/>
			}

			tickerData=
			{
				<LiveTickerData tickerData={tickerData}/>
			}

			tickerChart=
			{
				<LiveTickerChart tickerData={tickerData}/>
			}

			tickerRangesData=
			{
				<LiveTickerRangesData tickerData={tickerData}/>
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
				<StockRoutes tickerData={tickerData}/>
			}
		/>
	)
}
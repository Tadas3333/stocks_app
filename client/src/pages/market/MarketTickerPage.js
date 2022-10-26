import { useState, useEffect} from 'react';
import StockPage from 'pages/market/stock/StockPage';
import useStockOverviewData from 'data/stock/StockOverviewData'
import Util from 'util/Util';

export default function MarketTickerPage(props) {
	const [tickerData, setTickerData] = useState({
		tickerSymbol: null,
		tickerSymbolNoExchange: null,
		tickerName: null,
		tickerCurrency: null,
		tickerCurrencySymbol: null,
		tickerPrice: null,
		tickerPriceChange: null,
		tickerPriceChangePercentage: null,
		tickerOverview: null,
		tickerIsLoading: true
	});

	const overviewData = useStockOverviewData(props.tickerSymbol);

	useEffect(() =>
	{
		if(!Util.isNull(overviewData)) {
			setTickerData({
				tickerSymbol: Util.nvl_json(overviewData, "symbol", null),
				tickerSymbolNoExchange: Util.nvl_json(overviewData, "symbolNoExchange", null),
				tickerName: Util.nvl_json(overviewData, "name", null),
				tickerCurrency: Util.nvl_json(overviewData, "currency", null),
				tickerCurrencySymbol: Util.getCurrencySymbol(Util.nvl_json(overviewData, "currency", null)),
				tickerPrice: Util.nvl_json(overviewData, "price", null),
				tickerPriceChange: Util.nvl_json(overviewData, "priceChange", null),
				tickerPriceChangePercentage: Util.nvl_json(overviewData, "priceChangePercentage", null),
				tickerOverview: overviewData,
				tickerIsLoading: false
			});
		}
	}, [overviewData]);

	const marketPages = {
		"stock": <StockPage tickerData={tickerData}/>
	}

	if(Util.isNull(marketPages[props.page])) {
		return <>Invalid market page</>
	}

	if(tickerData.tickerIsLoading) {
		return <></> //Loading...
	}

	if(Util.isNull(tickerData.tickerSymbol)) {
		<>Ticker symbol not found</>
	}

	return (
		<>
			{marketPages[props.page]}
		</>
	)
}
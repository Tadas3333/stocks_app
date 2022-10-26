import { faNewspaper, faListCheck, faFileInvoiceDollar, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import MarketTickerLayout from 'layouts/market/MarketTickerLayout'
import StockRoutes from 'routes/stock/StockRoutes'
import LiveTickerData from 'components/data_visuals/live/LiveTickerData'
import LiveTickerRangesData from 'components/data_visuals/live/LiveTickerRangesData'
import LiveTickerChart from 'components/data_visuals/live/LiveTickerChart'
import PageTopTickerName from 'components/data_visuals/page_top_ticker_name/PageTopTickerName'
import Watchlist from 'components/data_visuals/watchlist/Watchlist'

export default function StockPage(props) {
	return (
		<MarketTickerLayout 
			tickerName=
			{
				<PageTopTickerName tickerData={props.tickerData}/>
			}

			tickerData=
			{
				<LiveTickerData tickerData={props.tickerData}/>
			}

			tickerChart=
			{
				<LiveTickerChart tickerData={props.tickerData}/>
			}

			tickerRangesData=
			{
				<LiveTickerRangesData tickerData={props.tickerData}/>
			}

			watchlist=
			{
				<Watchlist tickerData={props.tickerData}/>
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
				<StockRoutes tickerData={props.tickerData}/>
			}
		/>
	)
}
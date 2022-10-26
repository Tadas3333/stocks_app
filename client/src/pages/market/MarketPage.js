import { useParams } from "react-router-dom";
import MarketLayout from 'layouts/market/MarketLayout';
import MarketTickerPage from 'pages/market/MarketTickerPage';
import Util from 'util/Util';

export default function MarketPage() {
	var params = useParams();
	
	return (
		<MarketLayout
		body={
			(
				Util.isNull(params) || Util.isNull(params.page) || Util.isNull(params.exchange) ||
				Util.isNull(params.symbol)
				? <>Invalid market page path</>
				: <MarketTickerPage 
						page={params.page}
						tickerSymbol={Util.nvl(params.exchange, "") + "-" + Util.nvl(params.symbol, "")} />
			)
		}/>
		
	)
}
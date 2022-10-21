import './PageTopTickerName.scss'
import Util from 'util/Util'

export default function PageTopTickerName(props) {
	if(Util.isNull(props.tickerData.tickerSymbol)) {
	   return (<></>);
	}

	return (
		<>
		<div className="row">
			<div className="col">
				<div className="d-flex align-items-center page-top-ticker-name-wrap">
					<img src={props.tickerData.tickerOverview.image} 
							 alt={props.tickerData.tickerName} className="page-top-ticker-name-image"></img>
					<div className="ms-3 page-top-ticker-name">{props.tickerData.tickerName}</div>
					<div className="ms-3 font-size-14">{props.tickerData.tickerOverview.exchange}:</div>
					<div className="ms-2 font-weight-600 font-size-14">{props.tickerData.tickerSymbolNoExchange}</div>
					<div className="ms-3 font-size-14">Market Cap:</div>
					<div className="ms-2 font-weight-600 font-size-14">{Util.prettifyAmount(props.tickerData.tickerOverview.marketCap)}</div>
					<div className="ms-3 font-size-14">Currency:</div>
					<div className="ms-2 font-weight-600 font-size-14">{props.tickerData.tickerCurrency}</div>
				</div>
			</div>
		</div>
		</>
	);
}
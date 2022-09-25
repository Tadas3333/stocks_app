import './PageTopTickerName.scss'
import Util from 'util/Util'

export default function PageTopTickerName(props) {
	if(Util.isNull(props.tickerSymbol) || Util.isNull(props.overviewData) ||
	   Util.isNull(props.overviewData["name"])) {
	   return (<></>); //Loading
	}

	return (
		<>
		<div className="row">
			<div className="col">
				<div className="d-flex align-items-center page-top-ticker-name-wrap">
					<img src={props.overviewData["image"]} alt={props.overviewData["name"]} className="page-top-ticker-name-image"></img>
					<div className="ms-3 page-top-ticker-name">{props.overviewData["name"]}</div>
					<div className="ms-3 font-size-14">{props.overviewData["exchange"]}:</div>
					<div className="ms-2 font-weight-600 font-size-14">{Util.removeExchange(props.tickerSymbol)}</div>
					<div className="ms-3 font-size-14">Currency:</div>
					<div className="ms-2 font-weight-600 font-size-14">{props.overviewData["currency"]}</div>
					<div className="ms-3 font-size-14">Market Cap:</div>
					<div className="ms-2 font-weight-600 font-size-14">{Util.prettifyAmount(props.overviewData["marketCap"])}</div>
				</div>
			</div>
		</div>
		</>
	);
}
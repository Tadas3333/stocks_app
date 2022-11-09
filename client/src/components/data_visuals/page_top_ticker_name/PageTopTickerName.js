import Image from 'components/images/image/Image'
import Util from 'util/Util'
import './PageTopTickerName.scss'

export default function PageTopTickerName(props) {
	return (
		<div className="row page-top-ticker-name-wrap section-border-bottom">
			<div className="col">
				<div className="d-flex align-items-center h-100">
					<Image src={Util.nvl_json(props.tickerData.tickerOverview, "image", null)}
							alt={props.tickerData.tickerName} 
							width="40px"
							height="auto"
							maxHeight="40px"
							classes="me-3 border-radius-7"
							/>
					<div className="page-top-ticker-name">{props.tickerData.tickerName}</div>
					<div className="ms-3 font-size-14">{Util.nvl_json(props.tickerData.tickerOverview, "exchange", "")}:</div>
					<div className="ms-2 font-weight-600 font-size-14">{props.tickerData.tickerSymbolNoExchange}</div>
					<div className="ms-3 font-size-14">Market Cap:</div>
					<div className="ms-2 font-weight-600 font-size-14">{Util.prettifyAmount(Util.nvl_json(props.tickerData.tickerOverview, "marketCap", null))}</div>
					<div className="ms-3 font-size-14">Currency:</div>
					<div className="ms-2 font-weight-600 font-size-14">{props.tickerData.tickerCurrency}</div>
				</div>
			</div>
		</div>
	);
}
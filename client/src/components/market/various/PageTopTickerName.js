import './PageTopTickerName.scss'

export default function PageTopTickerName(props) {
	if(!props.companyOverviewData["name"] || !props.tickerSymbol) {
		return (<></>); //Loading
	}

	return (
		<>
		<div className="row">
			<div className="col">
				<div className="d-flex align-items-center page-top-ticker-name-wrap">
					<img src={props.companyOverviewData["image"]} alt="Tesla" className="page-top-ticker-name-image"></img>
					<div className="ms-3 page-top-ticker-name">{props.companyOverviewData["name"]}</div>
					<div className="ms-3">{props.tickerSymbol}</div>
					<div className="ms-3">{props.companyOverviewData["exchange"]}</div>
				</div>
			</div>
		</div>
		</>
	);
}
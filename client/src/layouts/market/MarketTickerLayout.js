import SubPageNavigation from 'layouts/navigation/SubPageNavigation'

export default function MarketTickerLayout(props) {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-9">
						<div className="row">
							<div className="col">
								{props.tickerName}
							</div>
						</div>
											
						<div className="row mt-4">
							<div className="col-4">
								{props.tickerData}
							</div>
							<div className="col-8">
								{props.tickerChart}
							</div>
						</div>

						<div className="row">
							<div className="col">
								{props.tickerRangesData}
							</div>
						</div>
					</div>
					<div className="col-3 section-border-left">
						{props.watchlist}
					</div>
				</div>
			</div>

			<div className="container">
					<div className="row section-border-bottom section-border-top py-1 mb-2">
						<div className="col">
							<SubPageNavigation 
								links={props.subPageLinks}
							/>
						</div>
					</div>
					<div className="row pt-3">
						<div className="col">
							{props.subPageRoutes}
						</div>
					</div>
			</div>
		</>
	);
}
import MainNavigation from 'layouts/navigation/MainNavigation'
import SubPageNavigation from 'layouts/navigation/SubPageNavigation'
import MarketIndexes from 'layouts/market_indexes/MarketIndexes'
import Advertisement from 'components/advertisement/Advertisement'
import Footer from 'layouts/footer/Footer'

export default function TickerPageLayout(props) {
	return (
		<>
			<MainNavigation />

			<div className="container-fluid background-grey section-border-bottom">
				<div className="container">
					<div className="row">
						<div className="col py-3">
							<MarketIndexes />
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row py-3 section-border-bottom">
					<div className="col">
						{props.tickerName}
					</div>
				</div>
									
				<div className="row">
					<div className="col-9">
						<div className="row mt-4">
							<div className="col-4">
								{props.tickerData}
							</div>
							<div className="col-8">
								{props.tickerChart}
							</div>
						</div>
						<div className="row mt-2">
							<div className="col">
								{props.tickerRangesData}
							</div>
						</div>
					</div>
					<div className="col-3 mt-4">
						<Advertisement />
					</div>
				</div>
			</div>

			<div className="container py-3">
					<div className="row section-border-bottom pb-3">
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

			<Footer />
		</>
	);
}
import MarketIndexes from 'components/data_visuals/market_indexes/MarketIndexes'

export default function MarketLayout(props) {
	return (
		<>
			<div className="container-fluid background-grey section-border-bottom">
				<div className="container">
					<div className="row">
						<div className="col py-3">
							<MarketIndexes />
						</div>
					</div>
				</div>
			</div>
            {props.body}
		</>
	);
}
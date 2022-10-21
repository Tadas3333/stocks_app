import SectionTitle from "components/structure/SectionTitle"
import PriceTargetChart from "components/data_visuals/price_target_chart/PriceTargetChart"
import PriceTargetAnalysts from "components/data_visuals/price_target_analysts/PriceTargetAnalysts"

export default function StockForecastSubPage(props) {
	return (
		<>
			<div className="row"> 
                <div className="col-6">
                    <SectionTitle 
                    title={props.tickerData.tickerSymbolNoExchange + " Price Target"} />

                    <PriceTargetChart tickerSymbol={props.tickerData.tickerSymbol}/>
                </div>
                <div className="col-6">
                    <SectionTitle 
                    title={"Analysts"} />

                    <PriceTargetAnalysts tickerData={props.tickerData}/>
                </div>
			</div>
        </>
        );
}
import SectionTitle from "components/structure/SectionTitle"
import PriceTargetChart from "components/data_visuals/price_target_chart/PriceTargetChart"
import PriceTargetAnalysts from "components/data_visuals/price_target_analysts/PriceTargetAnalysts"
import Util from "util/Util";

export default function StockForecastSubPage(props) {
	return (
		<>
			<div className="row"> 
                <div className="col-6">
                    <SectionTitle 
                    title={Util.nvl(props.tickerData.tickerSymbolNoExchange, "") + " Price Target"} />

                    <PriceTargetChart tickerSymbol={props.tickerData.tickerSymbol}/>
                </div>
                <div className="col-6">
                    <SectionTitle title="Analyst" />

                    <PriceTargetAnalysts tickerData={props.tickerData}/>
                </div>
			</div>
            <div className="row mt-1">
                <div className="col-6">
                    <SectionTitle  title="Revenue Forecast" />
                </div>
            </div>
        </>
        );
}
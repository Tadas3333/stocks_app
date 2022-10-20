import SectionTitle from "components/structure/SectionTitle"
import PriceTargetChart from "components/data_visuals/price_target_chart/PriceTargetChart"
import PriceTargetAnalysts from "components/data_visuals/price_target_analysts/PriceTargetAnalysts"

import Util from 'util/Util'

export default function StockForecastSubPage(props) {
	return (
		<>
			<div className="row"> 
                <div className="col-6">
                    <SectionTitle 
                    title={Util.removeExchange(props.tickerSymbol) + " Price Target"} />

                    <PriceTargetChart tickerSymbol={props.tickerSymbol}/>
                </div>
                <div className="col-6">
                    <SectionTitle 
                    title={"Analysts"} />

                    <PriceTargetAnalysts tickerSymbol={props.tickerSymbol}/>
                </div>
			</div>
        </>
        );
}
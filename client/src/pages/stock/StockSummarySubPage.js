
import SectionTitle from "components/structure/SectionTitle"
import DataCol from "components/structure/DataCol"
import DataRow from "components/structure/DataRow"
import NewsContainer from "components/data_visuals/news/NewsContainer"
import Util from "util/Util"

export default function StockSummarySubPage(props) {
	return (
		<>
			<div className="row mt-3"> 
				<div className="col-9">
					<div className="row mt-2">
						<DataRow layout="col-6" label="Last Close" data={Util.nvl_json(props.tickerData.tickerOverview, "lastClose", "-")} />
						<DataRow layout="col-6" 
								 label="Market Cap" 
								 data={Util.prettifyAmount(Util.nvl_json(props.tickerData.tickerOverview, "marketCap", null), null, "-")} />
						<DataRow layout="col-6" label="Open" data={Util.nvl_json(props.tickerData.tickerOverview, "openPrice", "-")} />
						<DataRow layout="col-6" label="P/S Ratio (TTM)" data={Util.nvl_json(props.tickerData.tickerOverview, "priceToSalesRatio", "-")} />
						<DataRow layout="col-6" label="Day's Low" data={Util.nvl_json(props.tickerData.tickerOverview, "dayRangeLow", "-")} />
						<DataRow layout="col-6" label="P/E Ratio (TTM)" data={Util.nvl_json(props.tickerData.tickerOverview, "priceToEarningsRatio", "-")} />
						<DataRow layout="col-6" label="Day's High" data={Util.nvl_json(props.tickerData.tickerOverview, "dayRangeHigh", "-")} />
						<DataRow layout="col-6" label="EPS (TTM)?" data={Util.nvl_json(props.tickerData.tickerOverview, "earningsPerShare", "-")} />
						<DataRow layout="col-6" label="52 Week Open" data={Util.nvl_json(props.tickerData.tickerOverview, "52WeekOpen", "-")} />
						<DataRow layout="col-6" label="Dividend Yield?" data={Util.nvl_json(props.tickerData.tickerOverview, "dividendYield", "-")} />
						<DataRow layout="col-6" label="52 Week Low" data={Util.nvl_json(props.tickerData.tickerOverview, "52WeekLow", "-")} />
						<DataRow layout="col-6" label="x" data="x" />
						<DataRow layout="col-6" label="52 Week High" data={Util.nvl_json(props.tickerData.tickerOverview, "52WeekHigh", "-")}  />
						<DataRow layout="col-6" label="x" data="x" />
						<DataRow layout="col-6" label="Beta" data={Util.nvl_json(props.tickerData.tickerOverview, "beta", "-")}  />
						<DataRow layout="col-6" label="x" data="x" />
					</div>

					<div className="row mt-3"> 
						<div className="col">
							<SectionTitle title="Stock News" />
							<div className="mt-3">
								<NewsContainer tickerSymbol={props.tickerData.tickerSymbol}/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<SectionTitle title="About" />
						</div>
					</div>
					<div className="row mt-3">
						{ /*<DataCol layout="col-3" label="CEO" data="Elon Musk" /> */}
						<DataCol layout="col" label="Exchange" data={Util.nvl_json(props.tickerData.tickerOverview, "exchange", "-")} />
						<DataCol layout="col" label="Sector" data={Util.nvl_json(props.tickerData.tickerOverview, "sector", "-")}/>
						<DataCol layout="col" label="Industry" data={Util.nvl_json(props.tickerData.tickerOverview, "industry", "-")}/>
					</div>
					<div className="row mt-3">
						<div className="col">
						{Util.nvl_json(props.tickerData.tickerOverview, "companyDescription", "-")}
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className="row">
						<div className="col">
							<SectionTitle title="Financials" />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<SectionTitle title="Earnings" />
						</div>
					</div>
				</div>
			</div>
        </>
        );
}
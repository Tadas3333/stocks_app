
import SectionTitle from "components/structure/SectionTitle"
import DataCol from "components/structure/DataCol"
import DataRow from "components/structure/DataRow"
import NewsContainer from "components/news/NewsContainer"
import Util from "util/Util"

export default function StockSummarySubPage(props) {
	return (
		<>
			<div className="row mt-3"> 
				<div className="col-9">
					<div className="row mt-2">
						<DataRow layout="col-6" label="Last Close" data={Util.nvl_json(props.overviewData, "lastClose", "-")} />
						<DataRow layout="col-6" 
								 label="Market Cap" 
								 data={Util.prettifyAmount(Util.nvl_json(props.overviewData, "marketCap", null), null, "-")} />
						<DataRow layout="col-6" label="Open" data={Util.nvl_json(props.overviewData, "openPrice", "-")} />
						<DataRow layout="col-6" label="P/S Ratio (TTM)" data={Util.nvl_json(props.overviewData, "priceToSalesRatio", "-")} />
						<DataRow layout="col-6" label="Day's Low" data={Util.nvl_json(props.overviewData, "dayRangeLow", "-")} />
						<DataRow layout="col-6" label="P/E Ratio (TTM)" data={Util.nvl_json(props.overviewData, "priceToEarningsRatio", "-")} />
						<DataRow layout="col-6" label="Day's High" data={Util.nvl_json(props.overviewData, "dayRangeHigh", "-")} />
						<DataRow layout="col-6" label="EPS (TTM)?" data={Util.nvl_json(props.overviewData, "earningsPerShare", "-")} />
						<DataRow layout="col-6" label="52 Week Open" data={Util.nvl_json(props.overviewData, "52WeekOpen", "-")} />
						<DataRow layout="col-6" label="Dividend Yield?" data={Util.nvl_json(props.overviewData, "dividendYield", "-")} />
						<DataRow layout="col-6" label="52 Week Low" data={Util.nvl_json(props.overviewData, "52WeekLow", "-")} />
						<DataRow layout="col-6" label="x" data="x" />
						<DataRow layout="col-6" label="52 Week High" data={Util.nvl_json(props.overviewData, "52WeekHigh", "-")}  />
						<DataRow layout="col-6" label="x" data="x" />
						<DataRow layout="col-6" label="Beta" data={Util.nvl_json(props.overviewData, "beta", "-")}  />
						<DataRow layout="col-6" label="x" data="x" />
					</div>

					<div className="row mt-3"> 
						<div className="col">
							<SectionTitle title="Stock News" />
							<div className="mt-3">
								<NewsContainer tickerSymbol={props.tickerSymbol}/>
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
						<DataCol layout="col" label="Exchange" data={Util.nvl_json(props.overviewData, "exchange", "-")} />
						<DataCol layout="col" label="Sector" data={Util.nvl_json(props.overviewData, "sector", "-")}/>
						<DataCol layout="col" label="Industry" data={Util.nvl_json(props.overviewData, "industry", "-")}/>
					</div>
					<div className="row mt-3">
						<div className="col">
						{Util.nvl_json(props.overviewData, "companyDescription", "-")}
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
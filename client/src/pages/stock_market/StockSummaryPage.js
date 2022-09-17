
import SectionTitle from "../../components/data_visuals/SectionTitle"
import DataCol from "../../components/data_visuals/DataCol"
import DataRow from "../../components/data_visuals/DataRow"
import NewsContainer from "../../components/market/news/NewsContainer"
import RevenueAndEarningsChart from "../../components/market/charts/RevenueAndEarningsChart"
import ScatterChartTemplate from "../../components/market/charts/templates/ScatterChartTemplate"
import Common from "../../data/Common"
import './StockSummaryPage.scss'

export default function StockSummaryPage(props) {
	return (
		<>
			<div className="row mt-3"> 
				<div className="col-9">
					<div className="row mt-2">
						<DataRow layout="col-6" label="Last Close" data={Common.nvl(props.companyOverviewData["lastClose"], "-")} />
						<DataRow layout="col-6" label="Market Cap" data={Common.prettify_amount(props.companyOverviewData["marketCap"], null, "-")} />
						<DataRow layout="col-6" label="Open" data={Common.nvl(props.companyOverviewData["openPrice"], "-")} />
						<DataRow layout="col-6" label="P/S Ratio (TTM)" data={Common.nvl(props.companyOverviewData["priceToSalesRatio"], "-")} />
						<DataRow layout="col-6" label="Day's Low" data={Common.nvl(props.companyOverviewData["dayRangeLow"], "-")} />
						<DataRow layout="col-6" label="P/E Ratio (TTM)" data={Common.nvl(props.companyOverviewData["priceToEarningsRatio"], "-")} />
						<DataRow layout="col-6" label="Day's High" data={Common.nvl(props.companyOverviewData["dayRangeHigh"], "-")} />
						<DataRow layout="col-6" label="EPS (TTM)?" data={Common.nvl(props.companyOverviewData["earningsPerShare"], "-")} />
						<DataRow layout="col-6" label="52 Week Open" data={Common.nvl(props.companyOverviewData["52WeekOpen"], "-")} />
						<DataRow layout="col-6" label="Dividend Yield?" data={Common.nvl(props.companyOverviewData["dividendYield"], "-")} />
						<DataRow layout="col-6" label="52 Week Low" data={Common.nvl(props.companyOverviewData["52WeekLow"], "-")} />
						<DataRow layout="col-6" label="x" data="x" />
						<DataRow layout="col-6" label="52 Week High" data={Common.nvl(props.companyOverviewData["52WeekHigh"], "-")}  />
						<DataRow layout="col-6" label="x" data="x" />
						<DataRow layout="col-6" label="Beta" data={Common.nvl(props.companyOverviewData["beta"], "-")}  />
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
						<DataCol layout="col" label="Exchange" data={Common.nvl(props.companyOverviewData["exchange"], "-")} />
						<DataCol layout="col" label="Sector" data={Common.nvl(props.companyOverviewData["sector"], "-")}/>
						<DataCol layout="col" label="Industry" data={Common.nvl(props.companyOverviewData["industry"], "-")}/>
					</div>
					<div className="row mt-3">
						<div className="col">
						{Common.nvl(props.companyOverviewData["companyDescription"], "-")}
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className="row">
						<div className="col">
							<SectionTitle title="Financials" />
							<RevenueAndEarningsChart tickerSymbol={props.tickerSymbol} />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<SectionTitle title="Earnings" />
							<ScatterChartTemplate tickerSymbol={props.tickerSymbol} />
						</div>
					</div>
				</div>
			</div>
        </>
        );
}
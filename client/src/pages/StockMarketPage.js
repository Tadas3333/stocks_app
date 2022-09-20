import {Routes, Route, useParams, Navigate, NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faListCheck, faFileInvoiceDollar, faUser, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import useFetch from "react-fetch-hook"
/*
import Footer from '../components/Footer';
import PageTopTickerName from "../components/market/various/PageTopTickerName"
import LiveTickerDataSection from "../components/market/various/LiveTickerDataSection"
import MarketIndexes from "../components/market/market_indexes/MarketIndexes"
import MarketURL from "../data/MarketURL"
import StockSummaryPage from "./sub_pages/StockSummaryPage"
import StockAnalysisPage from "./sub_pages/StockAnalysisPage"
import StockFinancialsPage from "./sub_pages/StockFinancialsPage"
import TickerChart from "../components/market/charts/TickerChart"*/

import TickerPageLayout from 'layouts/TickerPageLayout'
import './StockMarketPage.scss'

export default function StockMarket() {
	return (
		<TickerPageLayout />
	)
	/*
	const { tickerSymbol } = useParams();
	const {data: companyOverviewData = []} = useFetch(MarketURL.companyOverview(tickerSymbol), {}, [tickerSymbol]);

	return (
		<>
			<div className="container-fluid background-grey section-border-bottom">
				<div className="container">
					<div className="row pt-3 pb-4">
						<div className="col">
							<MarketIndexes />
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid py-4">
				<div className="container pb-5">
					<div className="row">
						<div className="col">
							<PageTopTickerName tickerSymbol={tickerSymbol} companyOverviewData={companyOverviewData}/>
						</div>
					</div>
										
					<div className="row">
						<div className="col-9">
							<div className="row mt-4">
								<div className="col-4">
									<LiveTickerDataSection tickerSymbol={tickerSymbol} companyOverviewData={companyOverviewData}/>
								</div>
								<div className="col-8">
									<TickerChart tickerSymbol={tickerSymbol} currency={companyOverviewData["currency"]}/>
								</div>
							</div>
						</div>
						<div className="col-3">
							<img src="/ad.jpg" alt="Ad" className="stock-market-page-top-ad"></img>
						</div>
					</div>
				</div>

				<div className="container py-3">
					<div className="row section-border-bottom pb-3">
						<div className="col">
							<div className="stock-market-page-navigation">
								<NavLink to="summary">
									<FontAwesomeIcon icon={faNewspaper}/><span className="ps-2">Summary</span>
								</NavLink>

								<NavLink to="analysis">
									<FontAwesomeIcon icon={faListCheck}/><span className="ps-2">Analysis</span>
								</NavLink> 

								<NavLink to="forecast">
									<FontAwesomeIcon icon={faArrowTrendUp}/><span className="ps-2">Forecast</span>
								</NavLink>

								<NavLink to="financials/income-statement">
									<FontAwesomeIcon icon={faFileInvoiceDollar}/><span className="ps-2">Financials</span>
								</NavLink>

								<NavLink to="discussion">
									<FontAwesomeIcon icon={faUser}/><span className="ps-2">Discussion</span>
								</NavLink>
							</div>
						</div>
					</div>
					<div className="row pt-3">
						<div className="col">
							<Routes>
								<Route path="summary" element={<StockSummaryPage tickerSymbol={tickerSymbol} companyOverviewData={companyOverviewData} />} />
								<Route path="analysis" element={<StockAnalysisPage />} />
								<Route path="financials/*" element={<StockFinancialsPage tickerSymbol={tickerSymbol} />} />
								<Route path="*" element={<Navigate replace to="/404"/>} />
							</Routes>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);*/
}
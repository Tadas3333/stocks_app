import {Routes, Route, Navigate, NavLink} from "react-router-dom";
import StockIncomeStatementPage from "./stock_financials/StockIncomeStatementPage"
import StockBalanceSheetStatementPage from "./stock_financials/StockBalanceSheetStatementPage"
import StockCashFlowStatementPage from "./stock_financials/StockCashFlowStatementPage"
import './StockFinancialsPage.scss'

export default function StockFinancialsPage(props) {
	return (
		<>
            <div className="row">
                <div className="col">
                    <div className="stock-financials-page-links">
                        <NavLink to="income-statement">
                            Income Statement
                        </NavLink>
                        <NavLink to="balance-sheet-statement">
                            Balance Sheet
                        </NavLink>
                        <NavLink to="cash-flow-statement">
                            Cash Flow
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <Routes>
						<Route path="income-statement" element={<StockIncomeStatementPage tickerSymbol={props.tickerSymbol} />} />
                        <Route path="balance-sheet-statement" element={<StockBalanceSheetStatementPage tickerSymbol={props.tickerSymbol} />} />
                        <Route path="cash-flow-statement" element={<StockCashFlowStatementPage tickerSymbol={props.tickerSymbol} />} />
						<Route path="*" element={<Navigate replace to="/404"/>} />
					</Routes>
                </div>
            </div>
        </>
    );
}
import {Routes, Route, Navigate, NavLink} from "react-router-dom";
import FinancialsTable from "../../components/market/financials/FinancialsTable"
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
						<Route path="income-statement" element={<FinancialsTable data="INCOME_STATEMENT" tickerSymbol={props.tickerSymbol} />} />
                        <Route path="balance-sheet-statement" element={<FinancialsTable data="BALANCE_SHEET_STATEMENT" tickerSymbol={props.tickerSymbol} />} />
                        <Route path="cash-flow-statement" element={<FinancialsTable data="CASH_FLOW_STATEMENT"tickerSymbol={props.tickerSymbol} />} />
						<Route path="*" element={<Navigate replace to="/404"/>} />
					</Routes>
                </div>
            </div>
        </>
    );
}
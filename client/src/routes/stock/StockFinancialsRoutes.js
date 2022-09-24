import { Routes, Route, Navigate } from "react-router-dom";
import FinancialsTable from 'components/financials/FinancialsTable';

export default function StockFinancialsRoutes(props) {
	return (
		<>
        {
        <Routes>
            <Route path="income-statement" element={<FinancialsTable dataType="INCOME_STATEMENT" tickerSymbol={props.tickerSymbol} />} />
            <Route path="balance-sheet-statement" element={<FinancialsTable dataType="BALANCE_SHEET_STATEMENT" tickerSymbol={props.tickerSymbol} />} />
            <Route path="cash-flow-statement" element={<FinancialsTable dataType="CASH_FLOW_STATEMENT" tickerSymbol={props.tickerSymbol} />} />
            <Route path="*" element={<Navigate replace to="/404"/>} />
        </Routes>
        }
		</>
	);
}

import { Routes, Route, Navigate } from "react-router-dom";
import StockSummarySubPage from 'pages/stock/StockSummarySubPage';
import StockFinancialsSubPage from 'pages/stock/StockFinancialsSubPage';

export default function StockRoutes(props) {
	return (
		<>
        {
        <Routes>
            <Route path="summary" 
                   element={<StockSummarySubPage tickerSymbol={props.tickerSymbol} 
                                               overviewData={props.overviewData} />} />
            <Route path="financials/*" 
                   element={<StockFinancialsSubPage tickerSymbol={props.tickerSymbol} />} />
            <Route path="*" 
                    element={<Navigate replace to="/404"/>} />
        </Routes>}
		</>
	);
}
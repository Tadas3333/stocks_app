import { Routes, Route, Navigate } from "react-router-dom";
import StockSummarySubPage from 'pages/market/stock/StockSummarySubPage';
import StockAnalysisSubPage from 'pages/market/stock/StockAnalysisSubPage';
import StockForecastSubPage from 'pages/market/stock/StockForecastSubPage';
import StockFinancialsSubPage from 'pages/market/stock/StockFinancialsSubPage';

export default function StockRoutes(props) {
	return (
		<>
        {
        <Routes>
            <Route path="summary" 
                   element={<StockSummarySubPage tickerData={props.tickerData} />} />
            <Route path="analysis" 
                   element={<StockAnalysisSubPage tickerData={props.tickerData} />} />
            <Route path="forecast" 
                   element={<StockForecastSubPage tickerData={props.tickerData}/>} />
            <Route path="financials/*" 
                   element={<StockFinancialsSubPage tickerData={props.tickerData}/>} />
            <Route path="*" 
                    element={<Navigate replace to="/404"/>} />
        </Routes>}
		</>
	);
}
import { Routes, Route, Navigate } from "react-router-dom";
import StockSummarySubPage from 'pages/stock/StockSummarySubPage';
import StockAnalysisSubPage from 'pages/stock/StockAnalysisSubPage';
import StockForecastSubPage from 'pages/stock/StockForecastSubPage';
import StockFinancialsSubPage from 'pages/stock/StockFinancialsSubPage';

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
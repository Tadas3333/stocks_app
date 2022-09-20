import { Routes, Route, Navigate } from "react-router-dom";
import Home from 'pages/Home';
import StockMarketPage from 'pages/StockMarketPage';
import Error404Page from 'pages/Error404Page';

export default function App() {
	return (
		<>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="market/stock/:exchange/:symbol/*" element={<StockMarketPage/>} />
			<Route path="404" element={<Error404Page/>}/>
			<Route path="*" element={<Navigate replace to="/404"/>} />
		</Routes>
		</>
	);
}
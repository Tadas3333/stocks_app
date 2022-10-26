import { Routes, Route, Navigate } from "react-router-dom";
import Home from 'pages/Home';
import MarketPage from 'pages/market/MarketPage';
import Error404Page from 'pages/Error404Page';

export default function MainRoutes() {
	return (
		<>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="market/:page/:exchange/:symbol/*" element={<MarketPage type="stock"/>} />
			<Route path="404" element={<Error404Page/>}/>
			<Route path="*" element={<Navigate replace to="/404"/>} />
		</Routes>
		</>
	);
}
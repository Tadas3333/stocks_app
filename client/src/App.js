import "./App.scss"
import "./styles/CommonStyles.scss"
import "./styles/Colors.scss"
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Navigation from './components/Navigation';
import StockMarketPage from './pages/StockMarketPage';
import Error404Page from './pages/Error404Page';

export default function App() {
	return (
		<>
		<div className="app-font">
			<Navigation />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="market/stock/:tickerSymbol/*" element={<StockMarketPage/>} />
				<Route path="404" element={<Error404Page/>}/>
				<Route path="*" element={<Navigate replace to="/404"/>} />
			</Routes>
		</div>
		</>
	);
}
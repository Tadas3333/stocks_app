import {NavLink} from "react-router-dom";
import StockFinancialsRoutes from "routes/stock/StockFinancialsRoutes"
import './StockFinancialsSubPage.scss'

export default function StockFinancialsSubPage(props) {
	return (
		<>
            <div className="row">
                <div className="col">
                    <div className="stock-financials-sub-page-links">
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
                    <StockFinancialsRoutes tickerData={props.tickerData}/>
                </div>
            </div>
        </>
    );
}
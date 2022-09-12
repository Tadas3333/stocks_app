import FinancialsTable from "../../../components/market/financials_table/FinancialsTable"
import './StockCashFlowStatementPage.scss'

export default function StockCashFlowStatementPage(props) {
	return (
		<>
            <div className="row mt-2">
                <div className="col">
                    <FinancialsTable data="CASH_FLOW_STATEMENT" tickerSymbol={props.tickerSymbol}/>
                </div>
            </div>
        </>
    );
}
import FinancialsTable from "../../../components/market/financials/FinancialsTable"
import './StockBalanceSheetStatementPage.scss'

export default function StockBalanceSheetStatementPage(props) {
	return (
		<>
            <div className="row mt-3">
                <div className="col">
                    <FinancialsTable data="BALANCE_SHEET_STATEMENT" tickerSymbol={props.tickerSymbol}/>
                </div>
            </div>
        </>
    );
}
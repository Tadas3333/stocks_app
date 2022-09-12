import FinancialsTable from "../../../components/market/financials_table/FinancialsTable"
import IncomeStatementChart from "../../../components/market/charts/financials_page/IncomeStatementChart"
import './StockIncomeStatementPage.scss'

export default function StockIncomeStatementPage(props) {
	return (
		<>
            <div className="row mt-2">
                <div className="col">
                    <IncomeStatementChart />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <FinancialsTable data="INCOME_STATEMENT" tickerSymbol={props.tickerSymbol}/>
                </div>
            </div>
        </>
    );
}
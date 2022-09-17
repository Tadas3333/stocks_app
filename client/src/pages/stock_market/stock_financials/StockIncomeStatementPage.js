import FinancialsTable from "../../../components/market/financials_table/FinancialsTable"
import BarsChartTemplate from "../../../components/market/charts/templates/BarsChartTemplate"
import './StockIncomeStatementPage.scss'

export default function StockIncomeStatementPage(props) {
	return (
		<>
            <div className="row mt-2">
                <div className="col">
                    <BarsChartTemplate />
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
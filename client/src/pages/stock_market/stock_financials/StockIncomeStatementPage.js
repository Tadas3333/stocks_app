import FinancialsTable from "../../../components/market/financials_table/FinancialsTable"
import BarsChartTemplate from "../../../components/market/charts/templates/BarsChartTemplate"
import './StockIncomeStatementPage.scss'

export default function StockIncomeStatementPage(props) {
	return (
		<>
            <div className="row mt-2">
                <div className="col">
                    <BarsChartTemplate 
                        categories={["2018", "2019", "2020", "2021", "2022"]}
                        data={
                        [
                            {
                                name: "Revenue",
                                values: [21461268000, 24578000000, 31536000000, 53823000000, 67166000000]
                            },
                            {
                                name: "Net Income",
                                values: [-976091000, -862000000, 690000000, 5519000000, 49516000000]
                            },
                        ]
                        }/>
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
import {useEffect, useState, useRef} from 'react'
import useStockFinancialsData from 'data/stock/StockFinancialsData'
import FinancialsTableRow from "./FinancialsTableRow"
import BarsChartTemplate from "../chart_templates/BarsChartTemplate"
import Util from "util/Util"

export default function FinancialsTable(props) {
    const data = useStockFinancialsData(props.tickerSymbol, props.dataType);
    const [rows, setRows] = useState([]);
    const chartCategories = useRef([]);
    const chartData = useRef([]);

    useEffect(() => {
        try {
            if(!Util.isNull(data) && !Util.isNull(data["statements"]) && data["statements"].length > 0) {
                var statements = data["statements"];
                var result = [];
                var val = "";
                var col1 = "";
                var col2 = "";
                var col3 = "";
                var col4 = "";
                var col5 = "";
                var chartValues = [];
                var keysToDisplayInChart = [];
                
                if(props.dataType) {
                    if(props.dataType === "INCOME_STATEMENT") {
                        keysToDisplayInChart = ["Revenue", "Net Income"];
                    } else if(props.dataType === "BALANCE_SHEET_STATEMENT") {
                        keysToDisplayInChart = ["Total Assets", "Total Liabilities"];
                    } else if(props.dataType === "CASH_FLOW_STATEMENT") {
                        keysToDisplayInChart = ["Operating Cash Flow", "Investing Cash Flow", "Financing Cash Flow"];
                    }
                }
                
                chartCategories.current = [];
                chartData.current = [];
    
                for (var x = 0; x < statements.length; x++) {
                    chartCategories.current.push(statements[x]["-"]);
                }
    
                // Get json keys from array index 0
                for(var key in statements[0]) {
                    chartValues = [];
    
                    for (var i = 0; i < statements.length; i++) {
                        val = statements[i][key];
                        chartValues.push(Util.nvl(val, 0));
                        val = Util.nvl(val, "-");
    
                        if(i === 0) col1 = val;
                        else if(i === 1) col2 = val;
                        else if(i === 2) col3 = val;
                        else if(i === 3) col4 = val;
                        else  col5 = val;
                    }
    
                    if(keysToDisplayInChart.includes(key)) {
                        chartData.current.push(
                            {
                                name: key,
                                values: chartValues
                            }
                        );
                    }
    
                    result.push(
                        <FinancialsTableRow key={key} label={key} col1={col1} col2={col2} col3={col3} col4={col4} col5={col5} />
                    );
                }
    
                setRows(result);
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [data, props.dataType]);

	return (
		<>
            <div className="row mt-2">
                <div className="col">
                    <BarsChartTemplate 
                        categories={chartCategories.current}
                        data={chartData.current}/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    {rows}
                </div>
            </div>
        </>
    );
}
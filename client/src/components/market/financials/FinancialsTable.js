import {useEffect, useState} from 'react'
import useFetch from "react-fetch-hook"
import MarketURL from "../../../data/MarketURL"
import FinancialsTableRow from "./FinancialsTableRow"
import BarsChartTemplate from "../charts/templates/BarsChartTemplate"
import Common from "../../../data/Common"
import './FinancialsTable.scss'

export default function FinancialsTable(props) {
    const {data: financials = {"statements": []}} = useFetch(MarketURL.statements(props.data, props.tickerSymbol), {}, [props.data, props.tickerSymbol]);
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        try {
            var result = [];
            var val = "";
            var col1 = "";
            var col2 = "";
            var col3 = "";
            var col4 = "";
            var col5 = "";

            // Get json keys from array index 0
            for(var key in financials["statements"][0]) {
                for (var i = 0; i < financials["statements"].length; i++) {
                    val = Common.nvl(financials["statements"][i][key], "-");

                    if(i === 0) col1 = val;
                    else if(i === 1) col2 = val;
                    else if(i === 2) col3 = val;
                    else if(i === 3) col4 = val;
                    else  col5 = val;
                }

                result.push(
                    <FinancialsTableRow label={key} col1={col1} col2={col2} col3={col3} col4={col4} col5={col5} />
                );
            }

            setRows(result);
        }
        catch (error) {
            console.log(error);
        }
    }, [financials]);

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
                    {rows}
                </div>
            </div>
        </>
    );
}
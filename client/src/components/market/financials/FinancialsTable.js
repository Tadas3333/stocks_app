import {useEffect, useRef} from 'react'
import useFetch from "react-fetch-hook"
import MarketURL from "../../../data/MarketURL"
import FinancialsTableRow from "./FinancialsTableRow"
import Common from "../../../data/Common"
import './FinancialsTable.scss'

export default function FinancialsTable(props) {
    const {data: financials = {"statements": []}} = useFetch(MarketURL.statements(props.data, props.tickerSymbol), {}, [props.tickerSymbol]);
    const rows = useRef([]);
    
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

            rows.current = result;
        }
        catch (error) {
            console.log(error);
        }
    }, [financials]);

	return (
		<>
            {rows.current}
        </>
    );
}
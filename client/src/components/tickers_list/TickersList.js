import TickersListItem from "components/tickers_list/TickersListItem"

export default function TickersList(props) {
	return (
        <>
            <table className="w-100 my-2">
                <tbody>
                    <tr className="font-size-14 font-weight-500 section-border-bottom-l color-grey-700">
                        <td className="align-middle py-2">
                            Symbol
                        </td>
                        <td className="align-middle text-end py-2">
                            Price
                        </td>
                        <td className="align-middle text-end py-2">
                            Chg
                        </td>
                        <td className="align-middle text-end py-2">
                            Chg %
                        </td>
                    </tr>
                    {props.tickerSymbols.map(
                        (symbol, index) => 
                            <TickersListItem tickerSymbol={symbol} key={index}/>
                    )}
                </tbody>
            </table>
         </>
        );
}
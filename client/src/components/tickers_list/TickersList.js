import TickersListItem from "components/tickers_list/TickersListItem"
import Util from 'util/Util';

export default function TickersList(props) {
    const scrollableList = {
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: props.maxHeight
    };

	return (
        <>
            <div style={(!Util.isNull(props.maxHeight) ? scrollableList : {})}>
                <table className="w-100 mb-2 font-size-14 font-weight-500">
                    <thead className="sticky-top background-white section-border-bottom-inset">
                        <tr className="color-grey-700">
                            <td className="align-middle pb-2">
                                Symbol
                            </td>
                            <td className="align-middle text-end pb-2">
                                Price
                            </td>
                            <td className="align-middle text-end pb-2">
                                Chg
                            </td>
                            <td className="align-middle text-end pb-2">
                                Chg %
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.tickerSymbols.map(
                            (symbol, index) => 
                                <TickersListItem tickerSymbol={symbol} key={index}/>
                        )}
                    </tbody>
                </table>
            </div>
         </>
        );
}
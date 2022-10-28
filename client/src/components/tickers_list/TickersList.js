import TickersListItem from "components/tickers_list/TickersListItem"
import "./TickersList.scss"

export default function TickersList(props) {
	return (
            <div className="row">
                <div className="col px-0">
                    <div className="section-border-bottom tickers-list-header">
                        <div className="px-3 font-weight-600 tickers-list-header-title">
                            Recently Viewed
                        </div>
                        <table className="tickers-list-table w-100 
                                          font-size-14 font-weight-500">
                            <tbody>
                                <tr className="color-grey-700">
                                    <td className="align-middle pb-2 ps-3 tickers-list-symbol-td">
                                        Symbol
                                    </td>
                                    <td className="align-middle text-end pb-2 tickers-list-price-td">
                                        Price
                                    </td>
                                    <td className="align-middle text-end pb-2 tickers-list-chg-td">
                                        Chg
                                    </td>
                                    <td className="align-middle text-end pb-2 pe-3 tickers-list-chgp-td">
                                        Chg %
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <table className="tickers-list-table custom-scrollbar w-100 font-size-14 font-weight-500">
                        <tbody className="custom-scrollbar"
                            style={{height: props.listHeight}}>
                            {props.tickerSymbols.map(
                                (symbol, index) => 
                                    <TickersListItem tickerSymbol={symbol} key={index}/>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
}
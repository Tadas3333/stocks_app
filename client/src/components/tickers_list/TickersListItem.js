import useStockOverviewData from 'data/stock/StockOverviewData'
import Image from 'components/images/image/Image'
import DefaultTickerImage from 'components/images/default_ticker_image/DefaultTickerImage'
import Util from 'util/Util';

export default function TickersListItem(props) {
    const overviewData = useStockOverviewData(props.tickerSymbol);

    return (
        <>
        {(!Util.isNull(props.tickerSymbol) && 
          !Util.isNull(overviewData) && 
          !Util.isNull(overviewData.price) &&
          !Util.isNull(overviewData.priceChange) &&
          !Util.isNull(overviewData.priceChangePercentage) &&
          !Util.isNull(overviewData.currency))
            ?
                <tr className="section-border-bottom-l">
                    <td className="align-middle py-2 ps-3 tickers-list-symbol-td">
                        <div className="d-flex align-items-center">
                            <Image src={overviewData.image}
                                   classes="border-radius-7"
                                   width="20px"
                                   maxHeight="20px"
                                   
                                   replaceInvalidWith={
                                     <DefaultTickerImage 
                                        width="20px" 
                                        height="20px"
                                        tickerSymbol={
                                            Util.removeExchange(props.tickerSymbol).substring(0, 1)
                                        }
                                        />
                                   }
                                   />
                            <span className="ps-2">{Util.removeExchange(props.tickerSymbol)}</span>
                        </div>
                    </td>
                    <td className="align-middle text-end py-2 tickers-list-price-td">
                        {Util.getCurrencySymbol(overviewData.currency)}{overviewData.price}
                    </td>
                    <td className={"align-middle text-end py-2 tickers-list-chg-td " + 
                                   (overviewData.priceChange >= 0 ? "color-positive" : "color-negative")}>
                        {(overviewData.priceChange >= 0) ? "+" : ""}{overviewData.priceChange}
                    </td>
                    <td className={"align-middle text-end py-2 pe-3 tickers-list-chgp-td " + 
                                   (overviewData.priceChangePercentage >= 0 ? "color-positive" : "color-negative")}>
                        {(overviewData.priceChangePercentage >= 0) ? "+" : ""}{overviewData.priceChangePercentage}%
                    </td>
                </tr>
            :   <></>
        }
        </>
    );
}
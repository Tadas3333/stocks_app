import {useEffect, useRef} from 'react'
import useStockOverviewData from 'data/stock/StockOverviewData'
import Util from 'util/Util';

import './TickersListItem.scss';

export default function TickersListItem(props) {
    const overviewData = useStockOverviewData(props.tickerSymbol);
    const imgClass = useRef("ticker-list-item-image d-none");

    useEffect(() => {
        if(!Util.isNull(overviewData) && !Util.isNull(overviewData.image)) {
            imgClass.current = "ticker-list-item-image";
        } else {
            imgClass.current = "ticker-list-item-image d-none";
        }
    }, [overviewData]);

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
                    <td className="align-middle py-2">
                        <div className="d-flex align-items-center">
                            <img src={Util.nvl(overviewData.image, "")}
                                 alt="" 
                                 className={imgClass.current}></img>
                            <span className="ps-2">{Util.removeExchange(props.tickerSymbol)}</span>
                        </div>
                    </td>
                    <td className="align-middle text-end py-2">
                        {Util.getCurrencySymbol(overviewData.currency)}{overviewData.price}
                    </td>
                    <td className={"align-middle text-end py-2 " + 
                                   (overviewData.priceChange >= 0 ? "color-positive" : "color-negative")}>
                        {(overviewData.priceChange >= 0) ? "+" : ""}{overviewData.priceChange}
                    </td>
                    <td className={"align-middle text-end py-2 " + 
                                   (overviewData.priceChangePercentage >= 0 ? "color-positive" : "color-negative")}>
                        {(overviewData.priceChangePercentage >= 0) ? "+" : ""}{overviewData.priceChangePercentage}%
                    </td>
                </tr>
            :   <></>
        }
        </>
    );
}
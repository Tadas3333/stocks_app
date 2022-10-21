import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, 
         faArrowUp, 
         faMoon, 
         faCloudSun, 
         faSun} from '@fortawesome/free-solid-svg-icons'
import Util from "util/Util"
import './LiveTickerData.scss'

export default function LiveTickerData(props) {
    if(Util.isNull(props.tickerData.tickerSymbol)) {
        return (<></>);
    }
    var marketStatusID = 2;
    var marketStatus = "";
    var marketStatusIcon;

    if(marketStatusID === 2) {
        marketStatusIcon = <FontAwesomeIcon icon={faMoon} transform="up-2" />;
        marketStatus = "After Hours";
    }
    else if(marketStatusID === 0) {
        marketStatusIcon = <FontAwesomeIcon icon={faCloudSun} transform="up-2" />;
        marketStatus = "Premarket"
    }
    else if(marketStatusID === 3) {
        marketStatusIcon = <FontAwesomeIcon icon={faCloudSun} transform="up-2" />;
        marketStatus = "Past 5 days";
    } else {
        marketStatusIcon = <FontAwesomeIcon icon={faSun} transform="up-2" />;
        marketStatus = "Open"
    }

    var icon;
    var colorClass = "";
    var tickerPriceChange = props.tickerData.tickerPriceChange;
    var tickerPriceChangePercentage = props.tickerData.tickerPriceChangePercentage;
    if(props.tickerData.tickerPriceChange >= 0) {
        icon = <FontAwesomeIcon icon={faArrowUp} transform="shrink-3"/>;
        colorClass = "color-positive";
        tickerPriceChange = "+" + props.tickerData.tickerPriceChange;
        tickerPriceChangePercentage = "+" + props.tickerData.tickerPriceChangePercentage;
    } else{
        icon = <FontAwesomeIcon icon={faArrowDown} transform="shrink-3"/>;
        colorClass = "color-negative";
    }

	return (
        <>
        <div className="live-ticker-data-section-market-status mt-1">
            <span className="live-ticker-data-section-market-status-icon">{marketStatusIcon}</span> {marketStatus}
        </div>
        <div className="live-ticker-data-section">
            <div className="liver-ticker-data-price">{props.tickerData.tickerPrice}</div>
            <div className="live-ticker-data-section-currency">{props.tickerData.tickerCurrencySymbol}</div> 
        </div>
        <div className="live-ticker-data-section-price-change">
                <span className={colorClass}>{icon} {tickerPriceChange} ({tickerPriceChangePercentage}%)</span>
        </div>
        <div className="mt-2 text-end font-size-12">
            Last Updated: August 26 04:00PM EDT
        </div>
        <div className="text-end font-size-12">
            Previous Close: 
            <span className="px-1">{props.tickerData.tickerCurrencySymbol}{props.tickerData.tickerPrice}</span>
            <span className={colorClass}>{icon} {tickerPriceChange} ({tickerPriceChangePercentage}%)</span>
        </div>
        </>
    );
}		 
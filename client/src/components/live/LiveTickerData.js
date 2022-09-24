import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faMoon, faCloudSun, faSun} from '@fortawesome/free-solid-svg-icons'
import Util from "util/Util"
import './LiveTickerData.scss'

export default function LiveTickerData(props) {
    if(Util.isNull(props.overviewData) ||Util.isNull(props.overviewData["price"])) {
        return (<></>);
    }

    var currentPrice = props.overviewData["price"];
    var priceChange = props.overviewData["priceChange"];
    var priceChangePercentage = props.overviewData["priceChangePercentage"];
    var currency = Util.getCurrencySymbol(props.overviewData["currency"]);
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
    if(priceChange >= 0) {
        icon = <FontAwesomeIcon icon={faArrowUp} transform="shrink-3"/>;
        colorClass = "color-positive";
        priceChange = "+" + priceChange;
        priceChangePercentage = "+" + priceChangePercentage;
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
            <div className="liver-ticker-data-price">{currentPrice}</div>
            <div className="live-ticker-data-section-currency">{currency}</div> 
        </div>
        <div className="live-ticker-data-section-price-change">
                <span className={colorClass}>{icon} {priceChange} ({priceChangePercentage}%)</span>
        </div>
        <div className="live-ticker-data-section-ticker-details mt-4">
            Last Updated: August 26 04:00PM EDT
        </div>
        </>
    );
}		 
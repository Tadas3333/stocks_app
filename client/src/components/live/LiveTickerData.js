import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, 
         faArrowTurnDown, 
         faArrowUp, 
         faMoon, 
         faCloudSun, 
         faSun} from '@fortawesome/free-solid-svg-icons'
import Util from "util/Util"
import RangeSlider from "components/sliders/RangeSlider"
import Progress from "components/progress/Progress"
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
        <div className="mt-2 text-end font-size-12">
            Last Updated: August 26 04:00PM EDT
        </div>
        <div className="text-end font-size-12">
            Previous Close: 
            <span className="px-1">{currency}{currentPrice}</span>
            <span className={colorClass}>{icon} {priceChange} ({priceChangePercentage}%)</span>
        </div>

        <div className="row mt-3">
            <div className="col-6 text-center font-size-12">
                Day Range:<br/>
                <span className="font-size-10"><RangeSlider /></span>
            </div>
            <div className="col-6 text-center font-size-12">
                52 Week Range:<br/>
                <span className="font-size-10"><RangeSlider /></span>
            </div>
        </div>
        <div className="mt-3 font-size-12">
            <div className="row">
                <div className="col-6 pe-0">
                    Volume: 45.44M
                </div>
                <div className="col-6 position-relative ps-0">
                    <div className="live-ticker-data-volume-icon">
                        <FontAwesomeIcon icon={faArrowTurnDown} transform="flip-h"/>
                    </div>
                    <span className="ps-2">Avg Volume: 34.81M</span>
                </div>
            </div>
            <div className="mt-1"><Progress /></div>
        </div>
        </>
    );
}		 
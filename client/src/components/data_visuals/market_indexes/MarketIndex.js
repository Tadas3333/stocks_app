import MarketIndexChart from "components/data_visuals/market_indexes/MarketIndexChart"
import './MarketIndex.scss'

export default function MarketIndex(props) {
  var price = props.tickerData["price"];
  var changeInPrice = props.tickerData["change"];
  var changeInPercentage = props.tickerData["changeInPercentage"];

  var isPositive;
  var colorClass = "color-black";
  var backgroundClass = "background-grey";

  if(changeInPrice !== "-") {
    if(changeInPrice && parseFloat(changeInPrice) >= 0) {
      isPositive = true;
      changeInPrice = "+" + changeInPrice;
      changeInPercentage = "+" + changeInPercentage;
      colorClass = "color-positive";
      backgroundClass = "background-positive";
    } else{
      isPositive = false;
      colorClass = "color-negative";
      backgroundClass = "background-negative";
    }
  }

	return (
        <div className="row py-2 market-index-wrap section-borders background-white gx-1">
          <div className="col-3 my-0 p-0 ps-2">
            <div className={"market-index-chart-wrap " + backgroundClass}>
              <MarketIndexChart tickerSymbol={props.tickerSymbol} isLoading={props.isLoading} isPositive={isPositive}/>
            </div>
          </div>
          <div className="col-5 my-0 p-0 ps-2 pe-2">
            <span className="market-index-name">{props.tickerName}</span><br/>
            <span className="market-index-price">{price}</span>
          </div>

          <div className="col-4 my-0 p-0 pe-2 text-end">
            <span className={"market-index-percentage-change " + colorClass}>{changeInPercentage}</span><br/>
            <span className={"market-index-price-change " + colorClass}>{changeInPrice}</span>
          </div>
        </div>
	);
}
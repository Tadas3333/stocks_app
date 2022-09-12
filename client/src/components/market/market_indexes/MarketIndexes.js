import {useEffect, useState, useRef} from 'react'
import MarketIndex from "./MarketIndex"
import Common from "../../../data/Common"
import MarketURL from "../../../data/MarketURL"
import './MarketIndexes.scss'

export default function MarketIndexes() {
    const [data, setData] = useState({});
    const isLoading = useRef(true);

    var defaultData = {
        "price": "-",
        "changeInPercentage": "-",
        "change": "-"
    }

    useEffect(() => {
        try {
            var url = MarketURL.pricesOfIndexes();

            fetch(url)
            .then(res => res.json())
            .then(data => {
                isLoading.current = false;
                setData(data);
            });
  
        } catch(err) {
          console.log(err);
        }
      }, []);

	return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <span className="market-indexes-category-selector"><span className="market-indexes-category-selector-active">US</span></span>
                        <span className="market-indexes-category-selector">Europe</span>
                        <span className="market-indexes-category-selector">Asia</span>
                        <span className="market-indexes-category-selector">Rates</span>
                        <span className="market-indexes-category-selector">Futures</span>
                        <span className="market-indexes-category-selector">FX</span>
                        <span className="market-indexes-category-selector">Crypto</span>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <MarketIndex tickerSymbol="^DJI" tickerName="DOW" tickerData={Common.nvl(data["^DJI"], defaultData)} isLoading={isLoading.current}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^GSPC" tickerName="S&P 500" tickerData={Common.nvl(data["^GSPC"], defaultData)} isLoading={isLoading.current}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^IXIC" tickerName="NASDAQ" tickerData={Common.nvl(data["^IXIC"], defaultData)} isLoading={isLoading.current}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^RUT" tickerName="RUS 2000" tickerData={Common.nvl(data["^RUT"], defaultData)} isLoading={isLoading.current}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^RUT" tickerName="RUS 2000" tickerData={Common.nvl(data["^RUT"], defaultData)} isLoading={isLoading.current}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^VIX" tickerName="VIX" tickerData={Common.nvl(data["^VIX"], defaultData)} isLoading={isLoading.current}/>
                    </div>
                </div>
            </div>
        </div>
	);
}
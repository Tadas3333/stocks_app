import useMarketIndexesData from 'data/market_indexes/MarketIndexesData';
import MarketIndex from "./MarketIndex"
import Util from "util/Util"
import './MarketIndexes.scss'

export default function MarketIndexes() {
    const indexesData = useMarketIndexesData();

    var defaultData = {
        "price": "-",
        "changeInPercentage": "-",
        "change": "-"
    }

	return (
        <div className="row">
            <div className="col">
                {/*
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
                </div>*/}

                <div className="row">
                    <div className="col">
                        <MarketIndex tickerSymbol="^DJI" 
                                     tickerName="DOW" 
                                     tickerData={Util.nvl_json(indexesData, "^DJI", defaultData)} 
                                     isLoading={Util.nvl_json(indexesData, "^DJI", true)}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^GSPC" 
                                     tickerName="S&P 500" 
                                     tickerData={Util.nvl_json(indexesData, "^GSPC", defaultData)} 
                                     isLoading={Util.nvl_json(indexesData, "^GSPC", true)}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^IXIC" 
                                     tickerName="NASDAQ" 
                                     tickerData={Util.nvl_json(indexesData, "^IXIC", defaultData)} 
                                     isLoading={Util.nvl_json(indexesData, "^IXIC", true)}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^RUT" 
                                     tickerName="RUS 2000" 
                                     tickerData={Util.nvl_json(indexesData, "^RUT", defaultData)} 
                                     isLoading={Util.nvl_json(indexesData, "^RUT", true)}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^RUT" 
                                     tickerName="RUS 2000" 
                                     tickerData={Util.nvl_json(indexesData, "^RUT", defaultData)} 
                                     isLoading={Util.nvl_json(indexesData, "^RUT", true)}/>
                    </div>
                    <div className="col">
                        <MarketIndex tickerSymbol="^VIX" 
                                     tickerName="VIX" 
                                     tickerData={Util.nvl_json(indexesData, "^VIX", defaultData)} 
                                     isLoading={Util.nvl_json(indexesData, "^VIX", true)}/>
                    </div> 
                </div>
            </div>
        </div>
	);
}
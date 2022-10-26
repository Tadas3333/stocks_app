import TickersList from "components/tickers_list/TickersList"

export default function Watchlist(props) {
    var tickerSymbols = ["NASDAQ-MSFT", 
                         "NASDAQ-TSLA", 
                         "NASDAQ-AAPL", 
                         "NYSE-PLTR",
                         "NASDAQ-SOFI",
                         "NASDAQ-NFLX",
                         "NASDAQ-AMZN",
                         "NASDAQ-META",
                         "NYSE-SQ",
                         "NASDAQ-PYPL"]
	return (
        <>
            <div className="watch-list-selection py-3 font-weight-600">
                Recently Viewed
            </div>
            <TickersList tickerSymbols={tickerSymbols} maxHeight="340px"/>
        </>
        );
}
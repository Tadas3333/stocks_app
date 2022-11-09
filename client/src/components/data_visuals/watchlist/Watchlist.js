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
                         "NASDAQ-RUM",
                         "NASDAQ-PYPL"]
	return (
        <>
            <TickersList tickerSymbols={tickerSymbols} 
                         listHeight="360px"/>
        </>
        );
}
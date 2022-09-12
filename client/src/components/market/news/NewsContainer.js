import useFetch from "react-fetch-hook"
import MarketURL from "../../../data/MarketURL"
import NewsRow from './NewsRow';
import './NewsContainer.scss';

export default function NewsContainer(props) {
    const {data: newsData = {"news_feed": []}} = useFetch(MarketURL.marketNews(props.tickerSymbol), {}, [props.tickerSymbol]);

    return (
    <>
    <div className="row mb-3">
    {newsData["news_feed"].map((news) => <NewsRow time={news.time} source={news.source} title={news.title} image={news.image} url={news.url}/>)}
    </div>
    </>
    );

    /*
    return <>
        <NewsRow />
        <NewsRow />
        <NewsRow />
        <NewsRow />
        <NewsRow />
    </>;*/
}
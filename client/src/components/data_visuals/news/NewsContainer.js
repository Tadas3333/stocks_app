import useStockNewsData from 'data/stock/StockNewsData';
import NewsRow from './NewsRow';
import './NewsContainer.scss';
import Util from 'util/Util';

export default function NewsContainer(props) {
    const data = useStockNewsData(props.tickerSymbol);

    return (
    <div className="row mb-3">
        {Util.nvl_json(data, "news_feed", []).map(
            (news, index) => 
            <NewsRow key={index}
                     time={Util.nvl(news.time, "-")} 
                     source={Util.nvl(news.source, "-")} 
                     title={Util.nvl(news.title, "-")} 
                     image={news.image} 
                     url={Util.nvl(news.url, "-")}/>
         )
        }
    </div>
    );
}
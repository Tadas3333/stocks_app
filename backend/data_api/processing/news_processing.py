
from datetime import datetime

class NewsProcessing:
    def get_stock_news(data:dict):
        result = {}

        if data is None or "stockNews" not in data or data["stockNews"] == []:
            return result

        count = 0  
        news_feed = []

        for news in data["stockNews"]:
            news_feed.append({
                "time": datetime.strptime(news["publishedDate"], "%Y-%m-%d %H:%M:%S").strftime("%I:%M %p, %b %d") if "publishedDate" in news else None,
                "source": news["site"] if "site" in news else None,
                "title": news["title"] if "title" in news else None,
                "image": news["image"] if "image" in news else None,
                "url": news["url"] if "url" in news else None
            })

            count = count + 1

            if count == 5:
                break

        return {
            "news_feed": news_feed
        }
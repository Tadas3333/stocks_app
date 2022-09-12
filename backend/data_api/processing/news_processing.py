
from datetime import datetime

class NewsProcessing:
    def get_stock_news(data:dict):
        result = {"news_feed": []}

        count = 0  

        for news in data["stockNews"]:
            result["news_feed"].append({
                "time": datetime.strptime(news["publishedDate"], "%Y-%m-%d %H:%M:%S").strftime("%I:%M %p, %b %d") if "publishedDate" in news else None,
                "source": news["site"] if "site" in news else None,
                "title": news["title"] if "title" in news else None,
                "image": news["image"] if "image" in news else None,
                "url": news["url"] if "url" in news else None
            })

            count = count + 1

            if count == 5:
                break

        return result
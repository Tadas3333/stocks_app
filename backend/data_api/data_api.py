import os
import sys

# Add root backend folder path for imports
current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)

from flask import Flask, request
from waitress import serve
from common.config import Config
from common.util import Util
from common.errors import Errors
from config import DataAPIConfig
from api.data_api import DataAPI

app = Flask(__name__)

def get_request_argument(argument_name:str) -> str:
  value = request.args.get(argument_name, type = str)
  return value

# http://127.0.0.1:4000/update_stock_news?arg=TSLA
@app.route("/<func>")
def route(func) -> str:
  url = ""

  try:
    if func == "favicon.ico":
      return "x"

    url = "# " + Config.DATA_API_URL + "/" + func + " " + str(request.args)
    print(url)

    data_api_config = Util.query_data_array(DataAPIConfig.DATA_API_CONFIG, DataAPIConfig.DATA_API_ROUTE, func)

    if data_api_config is None:
      raise Exception("Invalid route: " + func)

    arg = get_request_argument(DataAPIConfig.ARGUMENT)
    
    if Util.is_valid_ticker_name(arg) == False:
      raise Exception("Invalid ticker name: " + str(arg))

    # Raise exception if analysis fails
    Util.analyze_ticker_name(arg)

    DataAPI.update_data(data_api_config, arg)

    return "1"
  except Exception as e:
    Errors.log("URL:" + str(url) + ", EXCEPTION: " + str(e))
    return "0"

if __name__ == '__main__':
  #app.run(host="127.0.0.1", port=4000, debug=False, threaded=True)
  print("Runing data api server...")
  serve(app, host=Config.HOST_IP, port=Config.DATA_API_PORT, threads=Config.DATA_API_THREADS)
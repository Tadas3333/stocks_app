import os
import sys

# Add root backend folder path for imports
current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)

from flask import Flask, request
from waitress import serve
import json
from common.config import Config
from common.util import Util
from common.errors import Errors
from config import ClientAPIConfig
from api.client_api import ClientAPI

app = Flask(__name__)

def get_request_argument(argument_name:str) -> str:
  value = request.args.get(argument_name, type = str)
  return value

# http://127.0.0.1:5000/get_stock_news?arg=TSLA
@app.route("/<func>")
def route(func) -> str:
  try:
    if func == "favicon.ico":
      return "x"
    
    print("# " + Config.CLIENT_API_URL + "/" + func + " " + str(request.args))

    public_api_config = Util.query_data_array(ClientAPIConfig.CLIENT_API_CONFIG, ClientAPIConfig.CLIENT_API_ROUTE, func)

    if public_api_config is None:
      raise Exception("Invalid route: " + func)

    arg = get_request_argument(ClientAPIConfig.ARGUMENT)
    
    if Util.is_valid_ticker_name(arg) == False:
      raise Exception("Invalid ticker name: " + str(arg))

    return json.dumps(ClientAPI.get_data(public_api_config, arg))
  except Exception as e:
    Errors.log(str(e))
    return "{}"

if __name__ == '__main__':
  #app.run(host="127.0.0.1", port=5000, debug=False, threaded=True)
  print("Runing client api server...")
  serve(app, host=Config.HOST_IP, port=Config.CLIENT_API_PORT, threads=Config.CLIENT_API_THREADS)
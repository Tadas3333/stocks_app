from common.database import Database
from common.config import Config
from config import ClientAPIConfig
from common.util import Util
import requests
import json

class ProcessedData:
    def __init__(self, data_name:str, data_arg:str, database:Database):
        self.db = database
        self.data_name = data_name
        self.data_arg = data_arg
        self.data = None
    
    def load(self):
        self.data = self.db.get_processed_data(self.data_name, self.data_arg)

        if self.is_data_expired() == True:
            response = "0"
            
            # Call update function url
            conf = Util.query_data_array(ClientAPIConfig.CLIENT_API_CONFIG, ClientAPIConfig.PROCESSED_DATA_NAME, self.data_name)
            response = requests.get(Config.DATA_API_URL + "/" + conf[ClientAPIConfig.DATA_API_UPDATE_ROUTE] + "?" + ClientAPIConfig.ARGUMENT + "=" + self.data_arg)
            response = response.content.decode('utf-8')

            if response and response == "1":
                # New data has been prepared, load it
                self.data = self.db.get_processed_data(self.data_name, self.data_arg)

    def get_data(self) -> dict:
        if self.data:
            return json.loads(self.data["data"])
        else:
            return {}

    def save_to_processed_data(self, data:dict):
        self.db.save_to_processed_data(self.data_name, self.data_arg, data)
    
    def is_data_expired(self) -> bool:
        if self.data is None or self.data["is_expired"] == 1:
            print("Data is expired")
            return True
        else:
            print("Using data")
            return False
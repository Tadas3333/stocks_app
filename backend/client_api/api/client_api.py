from common.database import Database
from api.processed_data import ProcessedData
from config import ClientAPIConfig


class ClientAPI:
    def get_data(client_api_config:dict, arg:str)->str:
        processed_data = ProcessedData(client_api_config[ClientAPIConfig.PROCESSED_DATA_NAME], arg, Database())
        processed_data.load()
        return processed_data.get_data()
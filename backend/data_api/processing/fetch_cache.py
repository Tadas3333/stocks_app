from common.database import Database
from config import DataAPIConfig
from common.util import Util
from threading import Lock
import json

class FetchCache:
    fc_dict_lock = Lock()
    fc_locks = {}

    def __init__(self, cache_name:str, cache_arg:str, database:Database):
        self.db = database
        self.cache_name = cache_name
        self.cache_arg = cache_arg
        self.cache_result = None
    
    def load(self):
        lock_name = self.cache_name + "!@#$" + self.cache_arg

        # Create a lock if needed
        with FetchCache.fc_dict_lock:
            if lock_name not in FetchCache.fc_locks:
                FetchCache.fc_locks[lock_name] = Lock()

        if FetchCache.fc_locks[lock_name].locked():
            # Fetch cache is already being updated, wait for it to finish:
            with FetchCache.fc_locks[lock_name] as f:
                a = 1

        # Loadf fetch cache
        self.cache_result = self.db.get_cache(self.cache_name, self.cache_arg)

        if self.is_cache_expired() == True:
            # If fetch cache is expired, then lock it and fetch new data
            with FetchCache.fc_locks[lock_name] as f:
                new_data = None

                sourcing_config = Util.query_data_array(DataAPIConfig.SOURCING_CONFIG, DataAPIConfig.SOURCE_DATA_NAME, self.cache_name)
                new_data = sourcing_config[DataAPIConfig.DATA_SOURCING_FUNCTION](self.cache_arg)

                if new_data is not None and new_data != {}:
                    self.db.save_to_cache(self.cache_name, self.cache_arg, new_data)
                    self.cache_result = {
                        "data": json.dumps(new_data),
                        "is_expired": 0
                    }

    def get_cache(self) -> dict:
        if self.cache_result:
            return json.loads(self.cache_result["data"])
        else:
            return {}
    
    def is_cache_expired(self) -> bool:
        if self.cache_result is None or self.cache_result["is_expired"] == 1:
            print("Cache is expired")
            return True
        else:
            print("Using cache")
            return False

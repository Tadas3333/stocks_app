from threading import Lock
from common.database import Database
from common.util import Util
from config import DataAPIConfig
from processing.fetch_cache import FetchCache
from threading import Thread

class DataAPI:
    def fetch_cache_thread(db:Database, arg:str, source:str, results:list, result_index:int, results_lock:Lock):
        cache = FetchCache(source, arg, db)
        cache.load()
        data = cache.get_cache()

        with results_lock:
            results[result_index] = data


    uco_dict_lock = Lock()
    uco_locks = {}
    def update_data(local_api_config:dict, arg:str)->str:
        processed_data_name = local_api_config[DataAPIConfig.PROCESSED_DATA_NAME] 
        lock_name = processed_data_name+ "!@#$" + arg

        # Create a lock if needed
        with DataAPI.uco_dict_lock:
            if lock_name not in DataAPI.uco_locks:
                DataAPI.uco_locks[lock_name] = Lock()

        if DataAPI.uco_locks[lock_name].locked():
            # Data is already being updated, wait for it to finish and exit:
            with DataAPI.uco_locks[lock_name] as f:
                return
        else:
            # Data is not yet being updated, updated it:
            with DataAPI.uco_locks[lock_name]:
                processing_config = Util.query_data_array(DataAPIConfig.PROCESSING_CONFIG, DataAPIConfig.PROCESSED_DATA_NAME, processed_data_name)
                
                if processing_config is None:
                    raise Exception("processing_config is None for arg " + str(arg) + ", processed_data_name: " + str(processed_data_name))
                
                processed_name = processing_config[DataAPIConfig.PROCESSED_DATA_NAME]
                processing_function = processing_config[DataAPIConfig.DATA_PROCESSING_FUNCTION]
                source = local_api_config[DataAPIConfig.SOURCE_DATA_NAME]
                results = None
                results_lock = Lock()
                
                if type(source) == list:
                    # Is a list, use multi threads to source data
                    sources_count = len(source)
                    results = [None] * sources_count
                    threads = []

                    # Create threads and let them source the data
                    for indx, s in enumerate(source):
                        db = Database()
                        thread = Thread(target = DataAPI.fetch_cache_thread, args = (db, arg, s, results, indx, results_lock))
                        thread.start()
                        threads.append(thread)
                    
                    # Wait for all threads to finish
                    for t in threads:
                        t.join()

                    result = {}

                    # Call processing function depending on data count
                    if sources_count == 1:
                        result = processing_function(results[0])
                    elif sources_count == 2:
                        result = processing_function(results[0], results[1])
                    elif sources_count == 3:
                        result = processing_function(results[0], results[1], results[2])
                    elif sources_count == 4:
                        result = processing_function(results[0], results[1], results[2], results[3])     
                    else:
                        result = processing_function(results[0], results[1], results[2], results[3], results[4])                    

                    db.save_to_processed_data(processed_name, arg, result) 
                else:
                    # Not a list, use single thread to source data
                    results = [None]
                    db = Database()
                    DataAPI.fetch_cache_thread(db, arg, source, results, 0, results_lock)
                    result = processing_function(results[0])
                    db.save_to_processed_data(processed_name, arg, result) 
        





                
                
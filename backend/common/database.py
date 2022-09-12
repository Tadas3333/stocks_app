import psycopg2
import json
from common.config import Config

class Database:
    def __init__(self):
        self.db = psycopg2.connect(host=Config.DB_HOST,
                                   database=Config.DB_NAME,
                                   user=Config.DB_USERNAME,
                                   password=Config.DB_PASSWORD)
    
    def __del__(self):
        if self.db is not None:
            self.db.close()

    def execute_select(self, sql:str, args:dict) -> dict:
        cur = self.db.cursor()
        cur.execute(sql, args)
        result = cur.fetchall()
        cur.close()
        return result

    def execute_insert(self, sql:str, args:dict) -> int:
        cur = self.db.cursor()
        cur.execute(sql, args)
        self.db.commit()
        result = cur.rowcount
        cur.close()
        return result

    def execute_delete(self, sql:str, args:dict) -> int:
        cur = self.db.cursor()
        cur.execute(sql, args)
        self.db.commit()
        result = cur.rowcount
        cur.close()
        return result

    def get_cache(self, cache_name:str, cache_arg:str) -> dict:
        sql = "select data, case when expiration_tmstmp >= now() then 0 else 1 end is_expired \
               from   fetch_cache \
               where  name = %(cache_name)s \
               and    arguments = %(cache_arg)s"

        args = {
            "cache_name": cache_name,
            "cache_arg": cache_arg
        }

        result = self.execute_select(sql, args)

        if result == []:
            return None

        result_json = {
            "data": result[0][0],
            "is_expired": result[0][1]
        }
        
        return result_json
    
    def save_to_cache(self, cache_name:str, cache_arg:str, data:dict):
        data = json.dumps(data)
        
        args = {
            "cache_name": cache_name,
            "cache_arg": cache_arg,
            "cache_data": data
        }

        sql = "delete from fetch_cache \
               where  name = %(cache_name)s \
               and    arguments = %(cache_arg)s"
        
        self.execute_delete(sql, args)

        #now() + interval '1 second' * duration_sec, \

        sql = "insert into fetch_cache \
               (name, arguments, update_tmstmp, expiration_tmstmp, data) \
               select %(cache_name)s, \
                      %(cache_arg)s, \
                      now(), \
                      date_trunc(update_interval_truncate, now()) + update_interval::interval, \
                      %(cache_data)s \
               from   fetch_cache_config \
               where  name = %(cache_name)s"

        self.execute_insert(sql, args)

    def get_processed_data(self, data_name:str, data_arg:str) -> dict:
        sql = "select data, case when expiration_tmstmp >= now() then 0 else 1 end is_expired \
               from   processed_data \
               where  name = %(data_name)s \
               and    arguments = %(data_arg)s"

        args = {
            "data_name": data_name,
            "data_arg": data_arg
        }

        result = self.execute_select(sql, args)

        if result == []:
            return None

        result_json = {
            "data": result[0][0],
            "is_expired": result[0][1]
        }
        
        return result_json
    
    def save_to_processed_data(self, data_name:str, data_arg:str, data:dict):
        data = json.dumps(data)
        
        args = {
            "data_name": data_name,
            "data_arg": data_arg,
            "data": data
        }

        sql = "delete from processed_data \
               where  name = %(data_name)s \
               and    arguments = %(data_arg)s"
        
        self.execute_delete(sql, args)

        #now() + interval '1 second' * duration_sec, \

        sql = "insert into processed_data \
               (name, arguments, update_tmstmp, expiration_tmstmp, data) \
               select %(data_name)s, \
                      %(data_arg)s, \
                      now(), \
                      date_trunc(update_interval_truncate, now())  + update_interval::interval, \
                      %(data)s \
               from   processed_data_config \
               where  name = %(data_name)s"

        self.execute_insert(sql, args)
    
    def save_to_errors_log(self, error:str, traceback:str):
        args = {
            "error": error,
            "traceback": traceback
        }

        print(error)
        print(traceback)

        sql = "insert into errors_log \
               (timestmp, error, traceback) \
               values (now(), %(error)s, %(traceback)s)"

        self.execute_insert(sql, args)

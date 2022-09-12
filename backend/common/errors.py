import traceback

class Errors:
    def log(e:str):
        print(e + ", traceback: " + traceback.format_exc())
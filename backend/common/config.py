class Config:
    HOST_IP = "127.0.0.1"
    DATA_API_PORT = "4000"
    CLIENT_API_PORT = "5000"
    DATA_API_URL = "http://" + HOST_IP + ":" + DATA_API_PORT
    CLIENT_API_URL = "http://" + HOST_IP + ":" + CLIENT_API_PORT

    DATA_API_THREADS = 8
    CLIENT_API_THREADS = 8

    DB_HOST = "127.0.0.1"
    DB_NAME = "postgres"
    DB_USERNAME = "postgres"
    DB_PASSWORD = "admin"
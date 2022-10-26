from decimal import Decimal

class Util:
	def get_percentage_change(new_price:float, old_price:float)->float:
		if new_price is not None and old_price is not None:
			if old_price == 0:
				return new_price * 100

			return (new_price - old_price) / old_price * 100
		else:
			return 0
		
	def is_valid_ticker_name(ticker_name:str) -> bool:
		if ticker_name is None or ticker_name == "":
			return False
		else:
			return True
	
	def is_global_ticker_name(ticker_name:str) -> bool:
		if ticker_name == "@@@@":
			return True
		else:
			return False
	
	def analyze_ticker_name(ticker_name:str) -> dict:
		if ticker_name.find("-") != -1:
			split = ticker_name.split("-", 1)

			if len(split) != 2 or split[0] is None or split[1] is None \
				or split[0] == "" or split[1] == "":
				raise Exception("analyze_ticker_name failed, ticker_name: " + str(ticker_name))
			
			return {
				"exchange": split[0],
				"symbol": split[1]
			}
			
		return {
			"exchange": None,
			"symbol": ticker_name
		}

	
	def query_data_array(data:dict, key:str, whereValue)->dict:
		for item in data:
			if key in item:
				if item[key] == whereValue:
					return item
		
		return None

	# Round using Decimal library
	# Float round 222.415 returns 222.41 (sometimes)
	# Decimal round 222.415 returns 222.42
	def d_round(value, digits=0)->float:
		return float(round(Decimal(str(value)), digits))

    #0.7899434381 -> 0.79
	def two_decimal_float(value:str)->str:
		if value is not None:
			return "{:.2f}".format(Util.d_round(value,2))
		return ""
	
	#0.7876504381 -> 0.7877
	def four_decimal_float(value:str)->str:
		if value is not None:
			return "{:.4f}".format(Util.d_round(value,4))
		return ""

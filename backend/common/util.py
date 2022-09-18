
class Util:
	def get_percentage_change(new_price:float, old_price:float)->float:
		if new_price is not None and old_price is not None:
			if old_price == 0:
				return new_price * 100

			return (new_price - old_price) / old_price * 100
		else:
			return 0
		
	def is_valid_ticker_name(ticker_name:str) -> bool:
		if ticker_name is None or ticker_name == "" or len(ticker_name) > 5:
			return False
		else:
			return True
	
	def query_data_array(data:dict, key:str, whereValue)->dict:
		for item in data:
			if key in item:
				if item[key] == whereValue:
					return item
		
		return None

    #0.7899434381 -> 0.79
	def two_decimal_float(value:str)->str:
		if value is not None:
			value = round(float(value), 2)
			return "{:.2f}".format(value)
		return ""
	
	#0.7876504381 -> 0.7877
	def four_decimal_float(value:str)->str:
		if value is not None:
			value = round(float(value), 4)
			return "{:.4f}".format(value)
		return ""

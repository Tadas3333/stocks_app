export default class Util {
    static isNull(value) {
        if(typeof value === 'undefined' || (!value && value !== 0)) {
            return true;
        }
        return false;
    }

    static nvl(valueToCheck, valueIfNull) {
        if(!Util.isNull(valueToCheck)) {
            return valueToCheck;
        }
        return valueIfNull;
    }

    static nvl_json(jsonToCheck, keyToCheck, valueIfNull) {
        if(!Util.isNull(jsonToCheck) && !Util.isNull(jsonToCheck[keyToCheck])) {
            return jsonToCheck[keyToCheck];
        }
        return valueIfNull; 
    }

    static getAmountUnit(value) {
        if(!Util.isNull(value)) {
            value = Number(value);

            if(value < 0) {
                value = value * -1;
            }

            var len = Math.round(value).toString().length;

            if(len > 12) {
                return "T";
            }
            else if(len > 9) {
                return "B";
            }
            else if(len > 6) {
                return "M";
            }
            else if(len > 3) {
                return "K";
            }
    
        }
        return "";
    }

    static prettifyAmount(value, currency=null, ifNull="", unit=null) {
        if(!Util.isNull(value)) {
            if(!unit) {
                unit = Util.getAmountUnit(value);
            }

            if(unit === "T") {
                value = parseFloat((value / 1000000000000).toFixed(2));
            }
            else if(unit === "B") {
                value = parseFloat((value / 1000000000).toFixed(2));
            }
            else if(unit === "M") {
                value = parseFloat((value / 1000000).toFixed(2));
            }
            else if(unit === "K") {
                value = parseFloat((value / 1000).toFixed(2));
            }

            value = value + unit;
    
            if(currency) {
                return currency + " " + value;
            }
            else {
                return value;
            }
        } 
        return ifNull
    }

    static getCurrencySymbol(currency) {
        if(!Util.isNull(currency)) {
            if(currency === "USD") {
                return "$";
            }

            return currency;
        }
        return "";
    }

    static getPercentageChange(newValue, oldValue) {
		if(!Util.isNull(newValue) && !Util.isNull(oldValue)) {
			if(oldValue === 0) return newValue * 100

			return (newValue - oldValue) / oldValue * 100
        }
		else return 0;
    }

    static prepareTickerSymbol(exchange, symbol) {
        exchange = Util.nvl(exchange, "");
        symbol = Util.nvl(symbol, "");
        return exchange + "-" + symbol;
    }

    static removeExchange(symbol) {
        if(Util.isNull(symbol)) {
            return symbol;
        }

        var split = symbol.split("-", 2);
        return split[split.length-1];
    }

    static roundFloatDecimals(value, decimals) {
        if(Util.isNull(value) || Util.isNull(decimals)) {
            return "";
        }

        var parsedFloat = parseFloat(value);

        if(Util.isNull(parsedFloat)) {
            return "";
        }

        return parsedFloat.toFixed(decimals);
    }
}
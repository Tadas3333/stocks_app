export default class Common {
    static nvl(valueToCheck, valueIfUndefined) {
        if(valueToCheck) {
            return valueToCheck;
        }
        return valueIfUndefined;
    }

    static prettify_amount(value, currency=null, ifNull="") {
        if(value) {
            value = Number(value);
            var len = Math.round(value).toString().length;

            if(len > 12) {
                value = parseFloat((value / 1000000000000).toFixed(2)) + "T";
            }
            else if(len > 9) {
                value = parseFloat((value / 1000000000).toFixed(2)) + "B";
            }
            else if(len > 6) {
                value = parseFloat((value / 1000000).toFixed(2)) + "M";
            }
            else if(len > 3) {
                value = parseFloat((value / 1000).toFixed(2)) + "K";
            }
    
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
        if(currency) {
            if(currency === "USD") {
                return "$";
            }

            return currency;
        }
        return "";
    }

    static getPercentageChange(newValue, oldValue) {
		if(typeof newValue !== 'undefined' && typeof oldValue !== 'undefined') {
			if(oldValue === 0) return newValue * 100

			return (newValue - oldValue) / oldValue * 100
        }
		else return 0;
    }
}
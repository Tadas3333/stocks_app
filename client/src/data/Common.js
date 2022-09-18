export default class Common {
    static isNull(value) {
        if(typeof value === 'undefined' || (!value && value !== 0)) {
            return true;
        }
        return false;
    }

    static nvl(valueToCheck, valueIfNull) {
        if(!Common.isNull(valueToCheck)) {
            return valueToCheck;
        }
        return valueIfNull;
    }

    static getAmountUnit(value) {
        if(!Common.isNull(value)) {
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
        if(!Common.isNull(value)) {
            if(!unit) {
                unit = Common.getAmountUnit(value);
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
        if(!Common.isNull(currency)) {
            if(currency === "USD") {
                return "$";
            }

            return currency;
        }
        return "";
    }

    static getPercentageChange(newValue, oldValue) {
		if(!Common.isNull(newValue) && !Common.isNull(oldValue)) {
			if(oldValue === 0) return newValue * 100

			return (newValue - oldValue) / oldValue * 100
        }
		else return 0;
    }
}
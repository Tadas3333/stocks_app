import Util from 'util/Util';

export default class Colors {
    static blueChartColor = "0,119,238";
    static moreDarkBlueChartColor = "0,40,80";

    static lightRedChartColor = "249,231,232";
    static redChartColor = "224,38,54";
    static darkRedChartColor = "185,27,40";

    static lightGreenChartColor = "229,244,234";
    static greenChartColor = "9,159,85";
    static darkGreenChartColor = "9,147,85";

    static orangeChartColor = "225,93,45";
    static yellowChartColor = "238,191,51";
    static purpleChartColor = "167,78,255";
    static lightGreyChartColor = "243,243,243";
    static whiteChartColor = "255,255,255";

    static getBlueChartColor(opacity=1) {
        return Colors.getColor(Colors.blueChartColor, opacity);
    }

    static getMoreDarkBlueChartColor(opacity=1) {
        return Colors.getColor(Colors.moreDarkBlueChartColor, opacity);
    }

    static getLightRedChartColor(opacity=1) {
        return Colors.getColor(Colors.lightRedChartColor, opacity);
    }

    static getRedChartColor(opacity=1) {
        return Colors.getColor(Colors.redChartColor, opacity);
    }

    static getDarkRedChartColor(opacity=1) {
        return Colors.getColor(Colors.darkRedChartColor, opacity);
    }

    static getLightGreenChartColor(opacity=1) {
        return Colors.getColor(Colors.lightGreenChartColor, opacity);
    }

    static getGreenChartColor(opacity=1) {
        return Colors.getColor(Colors.greenChartColor, opacity);
    }

    static getDarkGreenChartColor(opacity=1) {
        return Colors.getColor(Colors.darkGreenChartColor, opacity);
    }

    static getOrangeChartColor(opacity=1) {
        return Colors.getColor(Colors.orangeChartColor, opacity);
    }

    static getYellowChartColor(opacity=1) {
        return Colors.getColor(Colors.yellowChartColor, opacity);
    }

    static getPurpleChartColor(opacity=1) {
        return Colors.getColor(Colors.purpleChartColor, opacity);
    }

    static getLightGreyColor(opacity=1) {
        return Colors.getColor(Colors.lightGreyChartColor, opacity);
    }

    static getWhiteChartColor(opacity=1) {
        return Colors.getColor(Colors.whiteChartColor, opacity);
    }

    static getColor(rgb, opacity) {
        if(!Util.isNull(opacity)) {
            return "rgba(" + rgb + ", " + opacity + ")";
        } else {
            return "rgb(" + rgb + ")";
        }
    }
}
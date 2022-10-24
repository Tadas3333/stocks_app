import Util from 'util/Util';

export default class Colors {
    static blueChartColor = "26,121,216";
    static moreDarkBlueChartColor = "0,40,80";

    static lightRedChartColor = "249,231,234";
    static redChartColor = "207,74,88";
    static darkRedChartColor = "186,58,71";

    static lightGreenChartColor = "229,244,236";
    static greenChartColor = "63,173,107";
    static darkGreenChartColor = "57,157,97";

    static orangeChartColor = "225,93,45";
    static yellowChartColor = "238,191,51";
    static purpleChartColor = "167,78,255";
    static lightGreyChartColor = "243,243,243";
    static blackChartColor = "0,0,0";
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

    static getBlackChartColor(opacity=1) {
        return Colors.getColor(Colors.blackChartColor, opacity);
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
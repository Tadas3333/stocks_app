import Util from 'util/Util';

export default class Colors {
    static blueChartColor = "0,119,238";
    static moreDarkBlueChartColor = "0,40,80";
    static darkRedChartColor = "185,27,40";
    static greenChartColor = "33,157,53";
    static darkGreenChartColor = "29,136,46";
    static orangeChartColor = "225,93,45";
    static yellowChartColor = "238,191,51";
    static purpleChartColor = "167,78,255";
    static lightGreyChartColor = "243,243,243";

    static getBlueChartColor(opacity=1) {
        return Colors.getColor(Colors.blueChartColor, opacity);
    }

    static getMoreDarkBlueChartColor(opacity=1) {
        return Colors.getColor(Colors.moreDarkBlueChartColor, opacity);
    }

    static getDarkRedChartColor(opacity=1) {
        return Colors.getColor(Colors.darkRedChartColor, opacity);
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

    static getColor(rgb, opacity) {
        if(!Util.isNull(opacity)) {
            return "rgba(" + rgb + ", " + opacity + ")";
        } else {
            return "rgb(" + rgb + ")";
        }
    }
}
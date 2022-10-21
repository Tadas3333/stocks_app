import {useEffect, useState} from 'react'
import Util from "util/Util"
import ReactEcharts from "echarts-for-react"
import Colors from "assets/styles/Colors"
import Main from "assets/styles/Main"
import './LineTargetForecastChartTemplate.scss'

export default function LineSeriesForecastChartTemplate(props) {
    const [option, setOption] = useState({});

    const getForecastLineStyle = (from, to, isMinValue) => {
      var itemClr;
      var areaClr;
      var z_indx;
      var lineType = "dashed";
      var lineWidth = 1;

      if(to > from) {
        areaClr = Colors.getLightGreenChartColor();
        itemClr = Colors.getDarkGreenChartColor();

        z_indx = 0;
      } else {
        if(isMinValue) {
          areaClr = Colors.getWhiteChartColor();
          z_indx = 2;
        }else{
          areaClr = Colors.getLightRedChartColor();
          z_indx = 1;
        }

        if(from === to) {
          lineType = "solid";
          lineWidth = 1.5;
          itemClr = Colors.getBlueChartColor();
        } else {
          itemClr = Colors.getDarkRedChartColor();
        }
      }
      return {
        name: "Price2",
        data: [from, to],
        type: 'line',
        showSymbol: false,
        silent: true,
        itemStyle: {
          color: itemClr
        },
        lineStyle: {
          type: lineType,
          width: lineWidth
        },
        emphasis: {
          disabled: true
        },
        areaStyle: {
          color: areaClr,
          opacity: 1
        },
        symbol:'circle',
        symbolSize: 8,
        xAxisIndex: 1,
        yAxisIndex: 1,
        z: z_indx
      }
    };

    useEffect(() => {
      try {
        var params = props.data;
          
        if(!Util.isNull(params) && !Util.isNull(params.historicalValues) &&
             !Util.isNull(params.futureValues)) {

            var echarts = require("echarts");

            var t_labels = [];
            var t_data = [];
            //var crncy = Util.getCurrencySymbol(props.currency);

            for(var i = 0; i < params.historicalValues["data"].length; i++) {
                t_labels.push(params.historicalValues["data"][i]["category"]);

                if(params.historicalValues["data"][i]["value"]) {
                  t_data.push(params.historicalValues["data"][i]["value"]);
                }
            }

            var lastValue = t_data[t_data.length-1];
            var lowestForecastedValue = lastValue;
            var minValue = parseFloat(params.historicalValues["minValue"]);
            var maxValue = parseFloat(params.historicalValues["maxValue"]);

            //Update min and max values
            for(var o=0; o < params.futureValues.length; o++) {
              if(params.futureValues[o] < minValue) {
                minValue = params.futureValues[o];
              }

              if(params.futureValues[o] < lowestForecastedValue) {
                lowestForecastedValue = params.futureValues[o];
              }

              if(params.futureValues[o] > maxValue) {
                maxValue = params.futureValues[o];
              }
            }

            var forecastLines = [];

            //Base forecast line
            forecastLines.push(getForecastLineStyle(lastValue, 
                                                    lastValue, 
                                                    (lastValue === lowestForecastedValue ? true : false)));

            //Additional forecast lines
            for(var a=0; a < params.futureValues.length; a++) {
              forecastLines.push(getForecastLineStyle(lastValue, 
                                                      params.futureValues[a],
                                                      (params.futureValues[a] === 
                                                      lowestForecastedValue ? true : false)));
            }

            var diff = (maxValue - minValue) * 0.1;

            maxValue += diff;
            minValue -= diff;
            if(minValue < 0) minValue = 0;

            setOption({
                animation: false,
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderColor: 'rgba(0, 0, 0, 0.9)',
                    formatter: function (params) {
                      return "";
                    }
                },
                xAxis: [
                  //Historical Data X axis
                  {
                      type: 'category',
                      data: t_labels,
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        show: false                       
                      },
                      splitLine: {
                        show: false
                      },
                      splitArea: {
                        show: false
                      },
                      axisLabel: {
                        interval: function (index, value) {
                          return false;
                        },
                        formatter: function (value) {
                          return "";
                        },
                        color: '#000000'
                      },
                      boundaryGap: false,
                      gridIndex: 0
                    },
                    //Forecast Data X Axis
                    {
                      type: 'category',
                      data: ["Current", "Forecast"],
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        show: false                       
                      },
                      splitLine: {
                        show: false
                      },
                      splitArea: {
                        show: false
                      },
                      boundaryGap: false,
                      axisLabel: {
                        interval: function (index, value) {
                          return false;
                        },
                        formatter: function (value) {
                          return "";
                        },
                        color: '#000000'
                      },
                      gridIndex: 1
                    }
                  ],
                  yAxis: [
                    // Historical Data Y axis
                    {
                      type: 'value',
                      gridIndex: 0,
                      scale: true,
                      position: 'right',
                      axisLabel: {
                        show: false
                      },
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        show: false                       
                      },
                      splitLine: {
                        show: false
                      }
                    },
                    // Forecast Data Y axis
                    {
                      type: 'value',
                      gridIndex: 1,
                      scale: true,
                      position: 'right',
                      axisLabel: {
                        color: '#000000',
                        fontFamily: Main.getAppFontFamily(),
                        fontWeight: '500'
                      },
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        show: false                       
                      },
                      splitLine: {
                        show: false
                      }
                    }
                  ],
                  grid: [
                    {
                      top: '5%%',
                      bottom: '10%',
                      left: '0',
                      right: '50%'
                    },
                    {
                      top: '5%%',
                      bottom: '10%',
                      left: '50%',
                      right: '7%'
                    }
                  ],
                  series: [
                    {
                      name: "Price",
                      data: t_data,
                      type: 'line',
                      showSymbol: false,
                      silent: true,
                      itemStyle: {
                        color: Colors.getBlueChartColor()
                      },
                      lineStyle: {
                        width: 2.5
                      },
                      emphasis: {
                        disabled: true
                      },
                      areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: Colors.getBlueChartColor(0.25)
                        },
                        {
                            offset: 1,
                            color: Colors.getBlueChartColor(0.05)
                        }])
                      },
                      symbol:'circle',
                      symbolSize: 8
                    },
                    {
                      name: 'MinValue',
                      type: 'line',
                      data: [minValue],
                      itemStyle: {
                        opacity: 0
                      },
                      xAxisIndex: 0,
                      yAxisIndex: 0
                    },
                    {
                      name: 'MaxValue',
                      type: 'line',
                      data: [maxValue],
                      itemStyle: {
                        opacity: 0
                      },
                      xAxisIndex: 0,
                      yAxisIndex: 0
                    },
                    {
                      name: 'MinValue',
                      type: 'line',
                      data: [minValue],
                      itemStyle: {
                        opacity: 0
                      },
                      xAxisIndex: 1,
                      yAxisIndex: 1
                    },
                    {
                      name: 'MaxValue',
                      type: 'line',
                      data: [maxValue],
                      itemStyle: {
                        opacity: 0
                      },
                      xAxisIndex: 1,
                      yAxisIndex: 1
                    }
                  ].concat(forecastLines)
                }
            );
          }
      } catch(err) {
        console.log(err);
      }
    }, [props.data]);

	return (
        <div className="line-series-forecast-chart-template">
          <ReactEcharts option={option} 
                        style={{height: '100%', width: '100%'}}
                        notMerge={true}
                        opts={{renderer: 'svg'}}
                        />
        </div>
	);
}
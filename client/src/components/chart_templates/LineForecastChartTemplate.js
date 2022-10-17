import {useEffect, useState} from 'react'
import Util from "util/Util"
import ReactEcharts from "echarts-for-react"
import Colors from "assets/styles/Colors"
import Main from "assets/styles/Main"
import './LineForecastChartTemplate.scss'

export default function LineForecastChartTemplate(props) {
    const [option, setOption] = useState({});

    useEffect(() => {
      try {
          if(!Util.isNull(props.historicalData) && !Util.isNull(props.historicalData["data"]) &&
             !Util.isNull(props.forecastValues)) {
            var t_labels = [];
            var t_data = [];
            var crncy = Util.getCurrencySymbol(props.currency);

            for(var i = 0; i < props.historicalData["data"].length; i++) {
                t_labels.push(props.historicalData["data"][i]["category"]);

                if(props.historicalData["data"][i]["value"]) {
                  t_data.push(props.historicalData["data"][i]["value"]);
                }
            }

            var lastValue = t_data[t_data.length-1];
            var originalLabelsCount = t_labels.length;

            //Add extra labels to split graph to 2 parts and create forecast line
            for(var z=0; z < originalLabelsCount; z++) {
              t_labels.push("");
            }

            var extendedLabelsCount = t_labels.length;
            var forecastLines = [];

            //Base forecast line
            forecastLines.push(
              [{
                coord: [originalLabelsCount, lastValue],
                symbol: 'none'
              },
              {
                coord: [extendedLabelsCount-1, lastValue],
                symbol: 'none'
              }]
            );

            //Additional forecast lines
            for(var a=0; a < props.forecastValues; a++) {
              forecastLines.push(
                [
                {
                  coord: [originalLabelsCount, lastValue],
                  symbol: 'none'
                },
                {
                  coord: [extendedLabelsCount-1, props.forecastValues[a]],
                  symbol: 'none'
                }]
              );
            }

            var minValue = parseFloat(props.historicalData["minValue"]);
            var maxValue = parseFloat(props.historicalData["maxValue"]);
            var diff = (maxValue - minValue) * 0.1;

            maxValue += diff;
            minValue -= diff;
            if(minValue < 0) minValue = 0;

            var echarts = require("echarts");

            setOption({
                animationEasingUpdate: 'cubicOut',
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderColor: 'rgba(0, 0, 0, 0.9)',
                    formatter: function (params) {
                      /*
                      var priceSeries;
                      for (var j = 0; j < params.length; j++){
                        if(params[j].seriesName === "Price") {
                          priceSeries = params[j];
                        }
                      }

                      var str = [];
                      var currentPrice = parseFloat(priceSeries.data);
                      str.push("<div class='app-font' style='color: #eeeeee; width: 100%; text-align: center;'>" + crncy + currentPrice.toFixed(2) + "<span class='ps-2'>Aug 22, 09:30 AM ET</span></div>");

                      return str.join("");*/
                      return "";
                    }
                },
                xAxis: [
                  //Price X axis
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
                      gridIndex: 0
                    }
                  ],
                  yAxis: [
                    // Price Y axis
                    {
                      type: 'value',
                      gridIndex: 0,
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
                      right: '7%'
                    }
                  ],
                  axisPointer: {
                    link: [
                      {
                        xAxisIndex: 'all'
                      }
                    ]
                  },
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
                            color: Colors.getBlueChartColor(0)
                        }])
                      },
                      markLine: {
                        data: forecastLines
                      },
                      symbol:'circle',
                      symbolSize: 8
                    },
                    {
                      //Adding this value to improve chart scaling
                      name: 'MinValue',
                      type: 'line',
                      data: [minValue],
                      itemStyle: {
                        opacity: 0
                      }
                    },
                    {
                      //Adding this value to improve chart scaling
                      name: 'MaxValue',
                      type: 'line',
                      data: [maxValue],
                      itemStyle: {
                        opacity: 0
                      }
                    }
                  ]
                }
            );
          }
      } catch(err) {
        console.log(err);
      }
    }, [props.historicalData, props.currency, props.forecastValues]);

	return (
        <div className="line-forecast-chart-template">
          <ReactEcharts option={option} 
                        style={{height: '100%', width: '100%'}}
                        notMerge={true}
                        opts={{renderer: 'svg'}}
                        />
        </div>
	);
}
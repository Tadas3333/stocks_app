import {useEffect, useState} from 'react'
import Util from "util/Util"
import ReactEcharts from "echarts-for-react"
import Colors from "assets/styles/Colors"
import Main from "assets/styles/Main"
import './SimpleTickerChartTemplate.scss'

export default function SimpleTickerChartTemplate(props) {
    const [option, setOption] = useState({});

    useEffect(() => {
      try {
          if(!Util.isNull(props.data) && !Util.isNull(props.data["data"])) {
            var t_labels = [];
            var t_data = [];
            var t_volume = [];
            var lastClosePrice = props.data["lastClosePrice"];
            var crncy = Util.getCurrencySymbol(props.currency);

            for(var i = 0; i < props.data["data"].length; i++) {
                t_labels.push(props.data["data"][i]["category"]);

                if(props.data["data"][i]["value"]) {
                  t_data.push(props.data["data"][i]["value"]);
                  t_volume.push(props.data["data"][i]["volume"]);
                }
            }

            var markLineJSON = {};

            if(lastClosePrice) {
              markLineJSON = {
                label: {
                  //formatter: 'Previous\nclose\n{c}',
                  show: false
                },
                silent: true,
                lineStyle: {
                  type: 'dotted',
                  color: 'rgba(0, 0, 0, 0.2)',
                  width: 1.5
                },
                symbol:['none', 'none'],
                data: [
                  {
                    yAxis: lastClosePrice
                  }
                ]
              }
            }

            var minValue = parseFloat(props.data["minValue"] > lastClosePrice ? lastClosePrice : props.data["minValue"]);
            var maxValue = parseFloat(props.data["maxValue"] < lastClosePrice ? lastClosePrice : props.data["maxValue"]);
            var diff = (maxValue - minValue) * 0.1;

            maxValue += diff;
            minValue -= diff;
            if(minValue < 0) minValue = 0;

            var isPositive;
            var lastValue = t_data[t_data.length-1];

            if(lastValue >= lastClosePrice) {
              isPositive = true;
            } else {
              isPositive = false;
            }

            var echarts = require("echarts");

            setOption({
                animation: false,
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderColor: 'rgba(0, 0, 0, 0.9)',
                    formatter: function (params) {
                      var priceSeries;
                      for (var j = 0; j < params.length; j++){
                        if(params[j].seriesName === "Price") {
                          priceSeries = params[j];
                        }
                      }

                      var str = [];
                      var currentPrice = parseFloat(priceSeries.data);
                      str.push("<div class='app-font' style='color: #eeeeee; width: 100%; text-align: center;'>" + crncy + currentPrice.toFixed(2) + "<span class='ps-2'>Aug 22, 09:30 AM ET</span></div>");

                      return str.join("");
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
                      boundaryGap: false,
                      axisLabel: {
                        interval: function (index, value) {
                          /*
                          value = value.split(" ")[1]; //Gets clock time
                          var sp = value.split(":");
                          var hour = sp[0];
                          var min = sp[1];

                          if(min !== "00" || hour === "04") {
                            return false;
                          }

                          return true;*/
                          return false;
                        },
                        formatter: function (value) {
                          var sp = value.split(" "); // Splits label
                          var hour = sp[1].split(":")[0]; //Gets hour

                          hour = parseInt(hour).toString();
                          return hour + sp[2];
                        },
                        color: '#000000'
                      },
                      gridIndex: 0
                    },
                    //Volume X axis
                    {
                      type: 'category',
                      data: t_labels,
                      show: false,
                      boundaryGap: false,
                      gridIndex: 1,
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
                      splitLine: {
                        show: true,
                        lineStyle: {
                          color: Colors.getLightGreyColor()
                        }
                      },
                    },
                    // Volume Y axis
                    {
                      type: 'value',
                      scale: true,
                      show: false,
                      gridIndex: 1
                    }
                  ],
                  grid: [
                    //Price grid
                    {
                      top: '5%%',
                      bottom: '10%',
                      left: '0',
                      right: '7%'
                    }, 
                    //Volume grid
                    { 
                      height: '10%',
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
                        color: (isPositive ? Colors.getGreenChartColor() : Colors.getRedChartColor())
                      },
                      lineStyle: {
                        width: 2
                      },
                      emphasis: {
                        disabled: true
                      },
                      areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: (isPositive ? Colors.getGreenChartColor(0.4) : Colors.getRedChartColor(0.4))
                        },
                        {
                            offset: 1,
                            color: (isPositive ? Colors.getGreenChartColor(0) : Colors.getRedChartColor(0))
                        }])
                      },
                      markLine: markLineJSON,
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
                    },
                    {
                      //Adding this value to improve chart scaling
                      name: 'LastClose',
                      type: 'line',
                      data: [lastClosePrice],
                      itemStyle: {
                        opacity: 0
                      }
                    },
                    {
                      name: 'Volume',
                      type: 'bar',
                      data: t_volume,
                      xAxisIndex: 1,
                      yAxisIndex: 1,
                      itemStyle: {color: 'rgba(0, 0, 0, 0.15)'}
                    },
                  ]
                }
            );
          }
      }catch(err) {
        console.log(err);
      }
    }, [props.data, props.currency]);

	return (
        <div className="simple-ticker-chart-template">
          <ReactEcharts option={option} 
                        style={{height: '100%', width: '100%'}}
                        notMerge={true}
                        opts={{renderer: 'svg'}}
                        />
        </div>
	);
}
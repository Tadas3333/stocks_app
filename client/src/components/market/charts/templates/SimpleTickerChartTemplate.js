import {useEffect, useState} from 'react'
import Common from "../../../../data/Common"
import MarketURL from "../../../../data/MarketURL"
import ReactEcharts from "echarts-for-react"
import Colors from "../../../../styles/Colors"
import './SimpleTickerChartTemplate.scss'

export default function SimpleTickerChartTemplate(props) {
    const [option, setOption] = useState({});

    useEffect(() => {
      try {
        var url = "";
        if(!props.chartType || props.chartType === "1D") {
          url = MarketURL.stockIntraday(props.tickerSymbol);
        } else if (props.chartType === "5D") {
          url = MarketURL.stock5days(props.tickerSymbol)
        } else if (props.chartType === "1M") {
          url = MarketURL.stock1month(props.tickerSymbol)
        } else if (props.chartType === "3M") {
          url = MarketURL.stock3months(props.tickerSymbol)
        } else if (props.chartType === "6M") {
          url = MarketURL.stock6months(props.tickerSymbol)
        } else if (props.chartType === "1Y") {
          url = MarketURL.stock1year(props.tickerSymbol)
        } else if (props.chartType === "3Y") {
          url = MarketURL.stock3years(props.tickerSymbol)
        } else if (props.chartType === "5Y") {
          url = MarketURL.stock5years(props.tickerSymbol)
        } else if (props.chartType === "YTD") {
          url = MarketURL.stockYtd(props.tickerSymbol)
        }
        fetch(url)
        .then(res => res.json())
        .then(data => {
            var t_labels = [];
            var t_data = [];
            var t_volume = [];
            var lastClosePrice = data["lastClosePrice"];
            var crncy = Common.getCurrencySymbol(props.currency);

            for(var i = 0; i < data["data"].length; i++) {
                t_labels.push(data["data"][i]["date"]);

                if(data["data"][i]["open"]) {
                  t_data.push(data["data"][i]["open"]);
                  t_volume.push(data["data"][i]["volume"]);
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

            var minValue = parseFloat(data["minValue"] > lastClosePrice ? lastClosePrice : data["minValue"]);
            var maxValue = parseFloat(data["maxValue"] < lastClosePrice ? lastClosePrice : data["maxValue"]);
            var diff = (maxValue - minValue) * 0.1;

            maxValue -= diff;
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
                      var priceSeries;
                      for (var j = 0; j < params.length; j++){
                        if(params[j].seriesName === "Price") {
                          priceSeries = params[j];
                        }
                        //if(params[j].seriesName === "Volume") {
                        //  volumeSeries = params[j];
                        //}
                      }

                      var str = [];
                      // String is split into array to avoid ES5 support warning
                      //var label = priceSeries.name.split(" ");
                      //str.push("<div class='app-font' style='font-weight: 700; color: #bbbbbb; width: 100%; text-align: center;'>Aug 22, 09:30 AM ET</div>");
                      
                      /*
                      if(label[1] && label[2] && label[3]) {
                        str.push("<span class='app-font' style='font-weight: 700; color: #bbbbbb;'>Aug 22, 09:30 AM ET</span><br/>");
                        //str.push("<span class='app-font' style='font-weight: 700; padding-left: 5px; color: #bbbbbb; float:right;'>" +label[1] + " " + label[2] + " " + label[3] + "</span><br/>");
                      } else {
                        str.push("<div class='app-font' style='font-weight: 700; color: #bbbbbb; width: 100%; text-align: center;'>Aug 22, 2022</div>");
                      }*/


                      var currentPrice = parseFloat(priceSeries.data);
                      /*
                      var lastPrice = parseFloat(lastClosePrice);
                      var diff = currentPrice - lastPrice;
                      var perc = Common.getPercentageChange(currentPrice, lastPrice);

                      var s = "";
                      var color = "color-positive";

                      if(diff >= 0) {
                        s = "+";
                      } else {
                        color  = "color-negative";
                      }

                      var vol = volumeSeries.data;
                      vol = Common.prettifyAmount(vol);

                      str.push("<span style='color: #ffffff; font-weight: 700; padding-right: 3px;' class='app-font'>" + crncy + " " + currentPrice.toFixed(2) + "</span>");
                      str.push(" <span style='font-weight: 700;' class='app-font " + color + "'>" + s + diff.toFixed(2) + "<span style='padding-left: 6px; padding-right: 3px;'>" + s + perc.toFixed(2) + "%</span></span>");
                      str.push(" <span style='font-weight: 700;' class='app-font color-focus'>" + vol + "</span><br/>");*/

                      str.push("<div class='app-font' style='color: #eeeeee; width: 100%; text-align: center;'>" + crncy + currentPrice.toFixed(2) + "<span class='ps-2'>Aug 22, 09:30 AM ET</span></div>");

                      return str.join("");
                    }
                },
                xAxis: [
                  //Price X axis
                  {
                      type: 'category',
                      data: t_labels,
                      splitLine: {
                        show: true,
                        lineStyle: {
                          color: Colors.getLightGreyColor(),
                          shadowBlur: 0
                        }
                      },
                      splitArea: {
                        show: false
                      },
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
                        color: '#000000'
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
                            color: Colors.getBlueChartColor(0.3)
                        },
                        {
                            offset: 1,
                            color: Colors.getBlueChartColor(0)
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
        });
      }catch(err) {
        console.log(err);
      }
    }, [props.tickerSymbol, props.chartType, props.currency]);

	return (
        <div className="simple-ticker-chart-template">
          <ReactEcharts option={option} 
                        style={{height: '100%', width: '100%'}}
                        opts={{renderer: 'svg'}}
                        />
        </div>
	);
}
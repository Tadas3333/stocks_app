import {useEffect, useState, useRef} from 'react'
import Common from "../../../data/Common"
import Colors from "../../../styles/Colors"
import MarketURL from "../../../data/MarketURL"
import ReactEcharts from "echarts-for-react"
import './MarketIndexChart.scss'

export default function MarketIndexChart(props) {
    const [option, setOption] = useState({});
    //Load data before showing it, wait for index prices to load first
    const [cachedOption, setCachedOption] = useState({}); 

    useEffect(() => {
      try {
            var t_labels = [];
            var t_data = [];
            var url = MarketURL.stockIntraday(props.tickerSymbol);
            fetch(url)
            .then(res => res.json())
            .then(data => {
                var indx = -1;
                for(var i = 0; i < data["data"].length; i++) {
                    indx += 1;

                    if(indx === 0) {
                        //t_labels.push(data["data"][i]["date"]);

                        if(data["data"][i]["open"]) {
                            t_data.push(data["data"][i]["open"]);
                        }
                    } else {
                        if(indx === 8) {
                            indx = -1;
                        }
                    }
                }

                setCachedOption(
                {
                    animationEasingUpdate: 'cubicOut',
                    xAxis: [
                      {
                          type: 'category',
                          data: t_labels,
                          axisLine: {
                            show: false
                          },
                          axisTick: {
                            show: false
                          },
                          axisLabel: {
                            show: false
                          },
                          splitLine: {
                            show: false
                          }
                      }
                    ],
                    yAxis: [
                      {
                          type: 'value',
                          scale: true,
                          position: 'right',
                          axisLine: {
                            show: false
                          },
                          axisTick: {
                            show: false
                          },
                          axisLabel: {
                            show: false
                          },
                          splitLine: {
                            show: false
                          }
                        },
                    ],
                    grid: [
                      {
                        top: '15%',
                        bottom: '15%',
                        left: '15%',
                        right: '15%'
                      }, 
                    ],
                    series: [
                      {
                        name: 'Price',
                        type: 'line',
                        data: t_data,
                        silent: true,
                        lineStyle: {
                            width: 1.7
                        },
                        emphasis: {
                            disabled: true
                        },
                        smooth: true
                      }
                    ],
                });
            });

      } catch(err) {
        console.log(err);
      }
    }, [props.tickerSymbol]);

    useEffect(() => {
     try {  
        if(props.isLoading === false) {
           var v = cachedOption;

           if(v["series"] && v["series"].length > 0) {
              v["series"][0]["itemStyle"] = {
                  color: (props.isPositive ? Colors.getDarkGreenChartColor() : Colors.getDarkRedChartColor())
              };
            }
           setOption(v);
        }
      } catch(err) {
        console.log(err);
      }
    }, [cachedOption, props.isLoading, props.isPositive]);

	return (
        <ReactEcharts option={option}  style={{height: '100%', width: '100%'}}/>
	);
}
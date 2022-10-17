import {useEffect, useState} from 'react'
import Colors from "assets/styles/Colors"
import ReactEcharts from "echarts-for-react"
import useStockHistoricalPriceData from 'data/stock/StockHistoricalPriceData';
import Util from 'util/Util';

export default function MarketIndexChart(props) {
    const data = useStockHistoricalPriceData(props.tickerSymbol, "1D");
    const [option, setOption] = useState({});
    //Load data before showing it, wait for index prices to load first
    const [cachedOption, setCachedOption] = useState({}); 

    useEffect(() => {
      try {
          if(!Util.isNull(data)) {
            var t_labels = [];
            var t_data = [];
            var indx = -1;

            for(var i = 0; i < data["data"].length; i++) {
                indx += 1;

                if(indx === 0) {
                    //t_labels.push(data["data"][i]["date"]);

                    if(data["data"][i]["value"]) {
                        t_data.push(data["data"][i]["value"]);
                    }
                } else {
                    //Skip 8 array elements
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
          }
      } catch(err) {
        console.log(err);
      }
    }, [data]);

    useEffect(() => {
     try {  
        if(props.isLoading !== true) {
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
        <ReactEcharts option={option}  
                      style={{height: '100%', width: '100%'}}
                      opts={{renderer: 'svg'}}
                      />
	);
}
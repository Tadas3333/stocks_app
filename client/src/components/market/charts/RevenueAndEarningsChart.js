import {useEffect, useState} from 'react'
import Common from "../../../data/Common"
import Colors from "../../../styles/Colors"
import ReactEcharts from "echarts-for-react"
import './RevenueAndEarningsChart.scss'

export default function RevenueAndEarningsChart(props) {
    const [option, setOption] = useState({});

    useEffect(() => {
      try {
            setOption({
                  animationEasingUpdate: 'cubicOut',
                  legend: {
                    bottom: 0,
                    left: 0,
                    align: 'left',
                    itemWidth: 14,
                    itemHeight: 10,
                    textStyle: {
                      fontSize: 10
                    }
                  },
                  tooltip: {
                    show:true,
                    trigger: 'axis'
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: ["2018", "2019", "2020", "2021", "2022"]
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      position: 'right',
                      axisLabel: {
                        formatter: function (value) {
                          return Common.prettifyAmount(value);
                        }
                      },
                      splitLine: {
                        lineStyle: {
                          color: Colors.getLightGreyColor(),
                          shadowBlur: 0
                        }
                      }
                    },
                    {
                      type: 'value',
                      position: 'right',
                      splitLine: {
                        show: false
                      },
                      axisLabel: {
                        show: false
                      }
                    }
                  ],
                  grid: [
                    {
                      top: '5%',
                      bottom: '20%',
                      left: '0%',
                      right: '10%'
                    }, 
                  ],
                  series: [
                    {
                      name: 'Revenue',
                      type: 'bar',
                      data: [21461268000, 24578000000, 31536000000, 53823000000, 67166000000],
                      itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 0 ,0 ],
                            color: Colors.getBlueChartColor()
                        }
                      }
                    },
                    {
                      name: 'Earnings',
                      type: 'bar',
                      data: [-976091000, -862000000, 690000000, 5519000000, 49516000000],
                      itemStyle: {
                        
                        normal: {
                          barBorderRadius: [5, 5, 0 ,0 ],
                          color: Colors.getGreenChartColor()
                        }
                      }
                    },
                    {
                      name: 'Profit Margin %',
                      type: 'line',
                      yAxisIndex: 1,
                      data: [-16.68, -4.55, -3.54, 2.19, 10.26],
                      itemStyle: {
                          color: Colors.getPurpleChartColor()
                      }
                    }        
                  ],
            });

      } catch(err) {
        console.log(err);
      }
    }, [props.tickerSymbol]);

	return (
        <div className="revenue-and-earnings-chart-container mb-3">
          <ReactEcharts option={option}  
                        style={{height: '100%', width: '100%'}}
                        opts={{renderer: 'svg'}}/>
        </div>
	);
}
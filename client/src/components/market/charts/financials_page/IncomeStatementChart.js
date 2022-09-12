import {useEffect, useState, useRef} from 'react'
import Common from "../../../../data/Common"
import MarketURL from "../../../../data/MarketURL"
import ReactEcharts from "echarts-for-react"
import Colors from "../../../../styles/Colors"
import './IncomeStatementChart.scss'

export default function IncomeStatementChart(props) {
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
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: "rgba(0, 0, 0, 0.02)"
                        }
                    },
                    position: [0, 0]
                  },
                  grid: {
                    top: '10px',
                    left: 0,
                    right: '10px',
                    bottom: '30px', //For legend
                    containLabel: true
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
                      splitNumber: 4,
                      axisLabel: {
                        formatter: function (value) {
                          return Common.prettify_amount(value);
                        }
                      },
                      splitLine: {
                        lineStyle: {
                          color: Colors.getLightGreyColor(),
                          shadowBlur: 0
                        }
                      },
                    }
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
                      name: 'Net Income',
                      type: 'bar',
                      data: [-976091000, -862000000, 690000000, 5519000000, 49516000000],
                      itemStyle: {
                        
                        normal: {
                          barBorderRadius: [5, 5, 0 ,0 ],
                          color: Colors.getYellowChartColor()
                        }
                      }
                    },
                  ],
            });

      } catch(err) {
        console.log(err);
      }
    }, [props.tickerSymbol]);

	return (
        <div className="income-statement-chart mb-3">
          <ReactEcharts option={option}  style={{height: '100%', width: '100%'}}/>
        </div>
	);
}
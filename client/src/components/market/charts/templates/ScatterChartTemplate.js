import {useEffect, useState} from 'react'
import Colors from "../../../../styles/Colors"
import ReactEcharts from "echarts-for-react"
import './ScatterChartTemplate.scss'

export default function ScatterChartTemplate(props) {
    const [option, setOption] = useState({});

    useEffect(() => {
      try {
            setOption({
                  animationEasingUpdate: 'cubicOut',
                  legend: {
                    data: ['Consensus EPS'],
                    bottom: 0,
                    left: 0,
                    align: 'left'
                  },
                  tooltip: {
                    show:true,
                    trigger: 'axis'
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: ["2021 Q3", "2021 Q4", "2022 Q1", "2022 Q2", "2022 Q3", "2022 Q4"]
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      position: 'right'
                    }
                  ],
                  grid: [
                    {
                      top: '10%',
                      bottom: '20%',
                      left: '0%',
                      right: '10%'
                    }, 
                  ],
                  series: [
                    {
                      name: 'Consensus EPS',
                      type: 'scatter',
                      symbolSize: 26,
                      data: [1.0, 1.2, 1.8, 1.4, 1.3, 1.8],
                      itemStyle: {
                        color: '#ffffff',
                        borderColor: Colors.getBlueChartColor(),
                        borderWidth: 2,
                        opacity: 1
                      }
                    },
                    {
                      name: 'Actual EPS',
                      type: 'scatter',
                      symbolSize: 25,
                      data: [1.2, 1.2, 2, 1.5, 1.4],
                      itemStyle: {
                          color: Colors.getGreenChartColor(),
                          opacity: 1
                      }
                    },          
                  ],
            });

      } catch(err) {
        console.log(err);
      }
    }, [props.tickerSymbol]);

	return (
        <div className="scatter-chart-template mb-3">
          <ReactEcharts option={option} 
                        style={{height: '100%', width: '100%'}}
                        opts={{renderer: 'svg'}}
                        />
        </div>
	);
}
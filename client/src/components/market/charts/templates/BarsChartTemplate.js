import {useEffect, useState} from 'react'
import Common from "../../../../data/Common"
import ReactEcharts from "echarts-for-react"
import Colors from "../../../../styles/Colors"
import './BarsChartTemplate.scss'

export default function BarsChartTemplate(props) {
    const [option, setOption] = useState({});

    useEffect(() => {
      try {
            var categories = ["2018", "2019", "2020", "2021", "2022"];
            setOption({
                  animationEasingUpdate: 'cubicOut',
                  legend: {
                    bottom: 0,
                    left: 0,
                    align: 'left',
                    itemWidth: 14,
                    itemHeight: 10,
                    formatter: function (name) {
                      return <><span class='app-font'>{name}</span></>;
                    }
                  },
                  tooltip: {
                    show:true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: "rgba(0, 0, 0, 0.03)"
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.98)',
                    borderColor: '#777777',
                    formatter: function (params) {
                      var str = [];
                      str.push("<div class='app-font' style='width: 170px; color: #ffffff; text-align: left;'>");
                      for (var j = 0; j < params.length; j++){
                        str.push("<div class='row p-0 m-0'>"); 
                        str.push("<div class='col-6 p-0 m-0'>" + params[j].marker + " " + params[j].seriesName + ":</div>");
                        str.push("<div class='col-6 p-0 ps-2 m-0 text-end'>" + Common.prettify_amount(params[j].data) + "</div>");
                        str.push("</div>");
                      }
                      str.push("</div>");
                      str.push("<div class='bars-chart-template-arrow-down'></div>");
                      return str.join("");
                    },
                    position: function (point, params, dom, rect, size) {
                      var yLabelsWidth = 41;
                      var categoryWidth = (size.viewSize[0]-yLabelsWidth)/categories.length;
                      var currentCategory = params[0].axisValue;
                      var tooltipPopupWidth = size.contentSize[0];
                      var tooltipOffset = (categoryWidth/2) - (tooltipPopupWidth/2);

                      var currentCategoryArrayIndex = 0;
                      var arrLenght = categories.length
                      for (var i = 0; i < arrLenght; i++) {
                          if(categories[i] === currentCategory) {
                            currentCategoryArrayIndex = i;
                            break;
                          }
                      }

                      return {left: categoryWidth * currentCategoryArrayIndex + tooltipOffset, top: -30};
                    }
                  },
                  grid: {
                    top: '10px', // To fit y axis labels
                    left: 0,
                    right: '10px',
                    bottom: '30px', //For legend
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: categories
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
                  ]
            });

      } catch(err) {
        console.log(err);
      }
    }, [props.tickerSymbol]);

	return (
        <div className="bars-chart-template mb-3">
          <ReactEcharts option={option} 
                        style={{height: '100%', width: '100%'}} 
                        className="app-font"
                        />
        </div>
	);
}
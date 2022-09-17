import {useEffect, useRef} from 'react'
import Common from "../../../../data/Common"
import ReactEcharts from "echarts-for-react"
import Colors from "../../../../styles/Colors"
import CommonStyles from "../../../../styles/CommonStyles"
import './BarsChartTemplate.scss'

export default function BarsChartTemplate(props) {
    const option = useRef({});

    useEffect(() => {
      try {
            var categories = [];
            var data = [];
            var colors = [
              Colors.getBlueChartColor(),
              Colors.getYellowChartColor()
            ]

            if(!Common.isNull(props.categories)){
              categories = props.categories;
            }

            if(!Common.isNull(props.data)){
              data = props.data;
            }
            
            var dataSeries = [];
            var arrLength = data.length;
            var valuesArrLength;
            var maxValue = null;

            for(var i=0; i < arrLength; i++){
              valuesArrLength = data[i].values.length;
              // Find the max value in received data
              for(var x=0; x < valuesArrLength; x++) {
                if(Common.isNull(maxValue)) {
                  maxValue = data[i].values[x];
                } else if(maxValue < data[i].values[x]) {
                  maxValue = data[i].values[x];
                }
              }
              
              // Create series for a chart from received data
              dataSeries.push(
                {
                  name: data[i].name,
                  type: 'bar',
                  data: data[i].values,
                  itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 0 ,0 ],
                        color: colors[i]
                    }
                  },
                  cursor: 'default'
                }
              );
            }

            if(Common.isNull(maxValue)) {
              maxValue = 0;
            }

            // Get a value unit for formatting Y axis labels
            var valueUnit = Common.getAmountUnit(maxValue);

            option.current = {
                  animationEasingUpdate: 'cubicOut',
                  legend: {
                    bottom: 0,
                    left: 0,
                    align: 'left',
                    itemWidth: 14,
                    itemHeight: 8,
                    textStyle: {
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: CommonStyles.getAppFontFamily()
                    }
                  },
                  tooltip: {
                    show:true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: "rgba(0, 40, 80, 0.03)"
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
                        str.push("<div class='col-6 p-0 ps-2 m-0 text-end'>" + Common.prettifyAmount(params[j].data) + "</div>");
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

                      return {left: categoryWidth * currentCategoryArrayIndex + tooltipOffset, top: -62};
                    }
                  },
                  grid: {
                    top: '10px', // To fit y axis labels
                    left: 0,
                    right: '-20px',
                    bottom: '30px', //For legend
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: categories,
                      axisLabel: {
                        color: '#000000',
                        fontFamily: CommonStyles.getAppFontFamily(),
                        fontWeight: '500'
                      },
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        show: false
                      }
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      position: 'right',
                      splitNumber: 4,
                      axisLabel: {
                        color: '#000000',
                        fontFamily: CommonStyles.getAppFontFamily(),
                        fontWeight: '500',
                        align: 'right',
                        margin: 45,
                        formatter: function (value) {
                          return Common.prettifyAmount(value, null, "", valueUnit);
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
                  series: dataSeries
            };

      } catch(err) {
        console.log(err);
      }
    }, [props.categories, props.data]);

	return (
        <div className="bars-chart-template mb-3">
          <ReactEcharts option={option.current} 
                        style={{height: '100%', width: '100%'}} 
                        className="app-font"
                        opts={{renderer: 'svg'}}
                        />
        </div>
	);
}
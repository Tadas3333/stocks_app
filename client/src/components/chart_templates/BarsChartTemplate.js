import {useEffect, useState, useRef} from 'react'
import Util from "util/Util"
import ReactEcharts from "echarts-for-react"
import Colors from "assets/styles/Colors"
import Main from "assets/styles/Main"
import $ from 'jquery';
import './BarsChartTemplate.scss'


export default function BarsChartTemplate(props) {
    const [option, setOption] = useState({});
    const tooltipOffset = useRef(0);

    useEffect(() => {
      try {
            var categories = [];
            var data = [];
            var colors = [
              Colors.getBlueChartColor(),
              Colors.getYellowChartColor(),
              Colors.getPurpleChartColor()
            ]

            if(!Util.isNull(props.categories)){
              categories = props.categories;
            }

            if(!Util.isNull(props.data)){
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
                if(Util.isNull(maxValue)) {
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
                  barMaxWidth: 30,
                  itemStyle: {
                    borderRadius: 3,
                    color: colors[i]
                  },
                  cursor: 'default'
                }
              );
            }

            var seriesCount = dataSeries.length;

            if(Util.isNull(maxValue)) {
              maxValue = 0;
            }

            // Get a value unit for formatting Y axis labels
            var valueUnit = Util.getAmountUnit(maxValue);

            setOption({
              animation: false,
                  legend: {
                    bottom: 0,
                    left: 0,
                    align: 'left',
                    itemWidth: 14,
                    itemHeight: 8,
                    textStyle: {
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: Main.getAppFontFamily()
                    }
                  },
                  tooltip: {
                    show:true,
                    trigger: 'axis',
                    axisPointer: {
                        animation: false,
                        type: 'shadow',
                        shadowStyle: {
                            //Don't change this, because it is used in position algorithm
                            color: Colors.getMoreDarkBlueChartColor(0.03)
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.98)',
                    borderColor: '#777777',
                    transitionDuration: 0,
                    formatter: function (params) {
                      var str = [];
                      str.push("<div class='app-font' style='color: #ffffff; text-align: left;'>");
                      for (var j = 0; j < params.length; j++){
                        str.push("<div class='row p-0 m-0'>"); 
                        str.push("<div class='col-6 p-0 m-0'>" + params[j].marker + " " + params[j].seriesName + ":</div>");
                        str.push("<div class='col-6 p-0 ps-2 m-0 text-end'>" + Util.prettifyAmount(params[j].data) + "</div>");
                        str.push("</div>");
                      }
                      str.push("</div>");
                      str.push("<div class='bars-chart-template-arrow-down'></div>");
                      return str.join("");
                    },
                    position: function (point, params, dom, rect, size) {
                      try {
                        var fill;
                        var fillOpacity;
                        var bBox;

                        $('.bars-chart-template svg g path').each(function(i, obj) {
                          fill = $(obj).attr('fill');
                          fillOpacity = $(obj).attr('fill-opacity');
                          
                          //Temporary solution
                          //It is a very bad solution, but for now I couldn't find a way to do find
                          //highlighted chart coordinates natively with current Echarts version
                          if(fill === Colors.getMoreDarkBlueChartColor(null) && fillOpacity === "0.03") {
                            bBox = $(obj)[0].getBBox();
                          }
                        });

                        var tooltipPopupWidth = size.contentSize[0];

                        if(!Util.isNull(bBox)) {
                          tooltipOffset.current = bBox.x + (bBox.width/2) - (tooltipPopupWidth/2);
                        } else {
                          tooltipOffset.current = null;
                        }
                      } catch(err) {
                        console.log(err);
                        tooltipOffset.current = null;
                      }

                      // Setting -1000000 to not display popup for split second in a wrong position
                      // This is a workaround needed for temporary tooltip offset solution
                      return {left: Util.nvl(tooltipOffset.current, -1000000), 
                              top: (22 + (seriesCount * 20)) * -1};
                    }
                  },
                  grid: {
                    top: '10px', // To fit y axis labels
                    left: 0,
                    right: 0,
                    bottom: '30px', //For legend
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: categories,
                      axisLabel: {
                        color: '#000000',
                        fontFamily: Main.getAppFontFamily(),
                        fontWeight: '500'
                      },
                      axisTick: {
                        lineStyle: {
                          color: '#000000'
                        }
                      },
                      axisLine: {
                        lineStyle: {
                          color: '#000000'
                        }                        
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
                        fontFamily: Main.getAppFontFamily(),
                        fontWeight: '500',
                        formatter: function (value) {
                          return Util.prettifyAmount(value, null, "", valueUnit);
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
            });

      } catch(err) {
        console.log(err);
      }
    }, [props.categories, props.data]);

	return (
        <div className="bars-chart-template mb-3">
          <ReactEcharts option={option}
                        style={{height: '100%', width: '100%'}} 
                        notMerge={true}
                        opts={{renderer: 'svg'}}
                        />
        </div>
	);
}
/* 
 *    Copyright 2022 Insight authors
 *   
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *  
 *        http://www.apache.org/licenses/LICENSE-2.0
 *  
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import * as echarts from 'echarts';

export default function( dom, myChart, dataList, rank, itemColor){
  const data = dataList.filter(item => item.rank == rank)

  if (myChart!= null && myChart!= "" && myChart!= undefined) {
    myChart.dispose();
  }
  myChart = echarts.init(dom);
  
  var option;

  option = {
    tooltip:{
      show:true,
    },
    title:{
      text:rank
    },
    xAxis: {
      type: 'value',
      splitLine:false,
      axisLabel:{
        show:false
      }
    },
    yAxis: {
      type: 'category',
      triggerEvent:true,
      data: data.map(item => item.name)
    },
    dataZoom:data.length > 40?{
      id: 'dataZoomY',
      type: 'slider',
      yAxisIndex: [0],
      filterMode: 'empty',
      end:3000/data.length,
    }:null,
    series: [
      {
        data: data.map(item => item.score),
        type: 'bar',
        showBackground: true,
        label:{
          show:true
        },
        itemStyle:{
          color:itemColor
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };

  option && myChart.setOption(option);

  return myChart
}

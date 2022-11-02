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

import * as echarts from 'echarts'


function isDataEmpty(xAxis){
  if(xAxis.length === 0){
    return true
  }
  return false
}

export default function(title, dom, config, myChart){

  if (myChart!= null && myChart!= "" && myChart!= undefined) {
    myChart.dispose();
  }
  myChart = echarts.init(dom);

  const {series, xAxis} = config
  
  const option = {
    title: {
      text: title,
      top:0,
      left: 0
    },
    grid: {
      top:'20%',
      left:80,
      right:30,
      bottom:30,
    },
    legend:{
      show:true
    },
    tooltip:{
      trigger:'axis'
    },
    xAxis:{
      type: 'category',
      data:xAxis
    },

    yAxis: [{
        type: 'value',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true
        },
        axisLabel: {
          formatter: '{value}'
        }
    }],
    series: series
  };
  myChart.setOption(option);
  if (isDataEmpty(xAxis)) {
    myChart.showLoading({
      text: 'No data for display',
      showSpinner: false,
      textColor: '#9d9d9d',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      fontSize: '25px',
      fontWeight: 'bold',
      fontFamily: 'Microsoft YaHei'
    });
  }

  return myChart
}
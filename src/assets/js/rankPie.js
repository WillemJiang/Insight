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

export default function( dom,myChart, dataList){

  if (myChart!= null && myChart!= "" && myChart!= undefined) {
    myChart.dispose();
  }
  myChart = echarts.init(dom);
  
  const option = {
    title: {
      text: 'Project Activity Rank',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: ['Super Healthy', 'Healthy','Mostly Okay', 'Unhealthy', 'Action required', 'URGENT ACTION REQUIRED']
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: [
          {
            value: dataList.filter(item => item.rank == 'Super Healthy').length,
            name: 'Super Healthy',
            itemStyle:{
              color:'#62bddd'
            }
          },{ 
            value: dataList.filter(item => item.rank == 'Healthy').length, 
            name: 'Healthy',
            itemStyle:{
              color:'#27717a'
            }
          },{ 
            value: dataList.filter(item => item.rank == 'Mostly Okay').length, 
            name: 'Mostly Okay',
            itemStyle:{
              color:'#9ac961'
            }
          },{ 
            value: dataList.filter(item => item.rank == 'Unhealthy').length, 
            name: 'Unhealthy',
            itemStyle:{
              color:'#f6d762'
            }
          },{ 
            value: dataList.filter(item => item.rank == 'Action required').length, 
            name: 'Action required',
            itemStyle:{
              color:'#f2a33a'
            }
          },{ 
            value: dataList.filter(item => item.rank == 'URGENT ACTION REQUIRED').length, 
            name: 'URGENT ACTION REQUIRED',
            itemStyle:{
              color:'#d54e4a'
            }
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        select:{
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label:{
            fontSize:24
          }
        }
      }
    ]
  };
  
  option && myChart.setOption(option);

  return myChart
}


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


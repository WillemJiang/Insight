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
            name: 'Super Healthy'
          },{ 
            value: dataList.filter(item => item.rank == 'Healthy').length, 
            name: 'Healthy' 
          },{ 
            value: dataList.filter(item => item.rank == 'Mostly Okay').length, 
            name: 'Mostly Okay' 
          },{ 
            value: dataList.filter(item => item.rank == 'Unhealthy').length, 
            name: 'Unhealthy' 
          },{ 
            value: dataList.filter(item => item.rank == 'Action required').length, 
            name: 'Action required' 
          },{ 
            value: dataList.filter(item => item.rank == 'URGENT ACTION REQUIRED').length, 
            name: 'URGENT ACTION REQUIRED' 
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  
  option && myChart.setOption(option);

  return myChart
}


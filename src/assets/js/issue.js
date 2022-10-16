import * as echarts from 'echarts'


function getData(data){
  let x = [], y=[]
  for(var key in data){   
    x.push(key.slice(0,4) + '-' + key.slice(4))
    y.push(data[key])   
  }   
  return {
    'xAxis':x,
    'values':y
  }
}

var myChart

export default function issue(dom, rawData){

  if (myChart != null && myChart != "" && myChart != undefined) {
    myChart.dispose(); 
  }

  myChart = echarts.init(dom);
  const data = getData(rawData)
  const option = {
    title: {
      text: 'ISSUE-OPEN',
      top:0,
      left: 0
    },
    grid: {
      top:'20%',
      left:30,
      right:30,
      bottom:30,
    },
    xAxis: [
      {
        type: 'category',
        data:data['xAxis']
      }
    ],
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
    series: [
      {
        type: 'bar',
        data: data.values
      }
    ]
  };
  myChart.setOption(option);

  return myChart
}
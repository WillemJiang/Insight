import * as echarts from 'echarts'

var myChart
export default function PMCGrowth(dom, data){
  if (myChart != null && myChart != "" && myChart != undefined) {

    myChart.dispose(); //销毁

  }
  myChart = echarts.init(dom);
  const option = {
    title: {
      text: 'PMC Member Growth',
      subtext: data['description'],
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
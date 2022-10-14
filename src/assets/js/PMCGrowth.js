import * as echarts from 'echarts'

export default function PMCGrowth(dom, data){
  console.log(data);
  const mychart = echarts.init(dom);
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
  mychart.setOption(option);
  
  return mychart
}
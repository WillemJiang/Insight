import * as echarts from 'echarts'

function getSeries(data){
  let xAxis = []

  data.forEach(el => {
    xAxis.push(...Object.keys(el.data))
  });
  xAxis = xAxis.filter((item,index) => xAxis.indexOf(item) === index ) 

  const series = data.map((el, index) =>{
    return {
      name:el.name,
      type:'bar',
      data:xAxis.map(el => {
        return data[index]['data'][el] ? data[index]['data'][el] : 0
      })
  }
  })

  return {
    series:series,
    xAxis:xAxis
  }

}
var myChart
export default function(dom, data){
  const {series,xAxis} = getSeries(data)
  if (myChart != null && myChart != "" && myChart != undefined) {

    myChart.dispose(); //销毁

  }
  myChart = echarts.init(dom);
  const option = {
    title: {
      text: 'PR'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data:xAxis
    },
    yAxis: {
      type: 'value',
    },
    series: series
  };
  myChart.setOption(option);
  window.onresize = () => {
    myChart.resize()
  }
  return myChart
}

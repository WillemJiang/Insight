import * as echarts from 'echarts'

function toNum(a){
  if (a.length == 5){
    return a.slice(0,4) + '0' + a.slice(4) - 0
  }
  return a - 0
}

function toMonth(a){
  return a.slice(0,4) + '-' + a.slice(4)
}

function getSeries(data){
  let xAxis = []

  data.forEach(el => {
    xAxis.push(...Object.keys(el.data))
  });
  xAxis = xAxis.filter((item,index) => xAxis.indexOf(item) === index ) 
  xAxis.sort((a,b) => {return toNum(a) - toNum(b)})

  const series = data.map((el, index) =>{
    return {
      name:el.name,
      type:'bar',
      data:xAxis.map(el => {
        return data[index]['data'][el] ? data[index]['data'][el] : 0
      })
  }
  })

  xAxis = xAxis.map(toMonth)

  return {
    series:series,
    xAxis:xAxis
  }

}
var commentChart

export default function(dom, data){
  if (commentChart != null && commentChart != "" && commentChart != undefined) {

    commentChart.dispose(); //销毁

  }
  const {series,xAxis} = getSeries(data)
  commentChart = echarts.init(dom,'roma');
  const option = {
    title: {
      text: 'COMMENT'
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
  commentChart.setOption(option);
  window.onresize = () => {
    commentChart.resize()
  }
  return commentChart
}

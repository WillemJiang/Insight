const toNum = (a) => {
  if (a.length == 5){
    return a.slice(0,4) + '0' + a.slice(4) - 0
  }
  return a - 0
}

const toMonth = (a) => {
  return a.slice(0,4) + '-' + a.slice(4)
}

const getBarSeries = (data) =>{

  let xAxis = []

  data.forEach(el => {
    let x = el.data? Object.keys(el.data) : []
    xAxis.push(...x)
  });

  xAxis = xAxis.filter((item,index) => xAxis.indexOf(item) === index ) 
  xAxis.sort((a,b) => {return toNum(a) - toNum(b)})

  const series = data.map((el, index) =>{
    return {
      name:el.name,
      type:'bar',
      data:xAxis.map(el => {
        return (data[index]['data'] && data[index]['data'][el])? data[index]['data'][el] : 0
      })
  }
  })

  xAxis = xAxis.map(toMonth)

  return {
    series:series,
    xAxis:xAxis
  }

}
export default {
  bar: getBarSeries,
}
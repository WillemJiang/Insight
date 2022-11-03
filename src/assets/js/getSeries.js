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

const toNum = (a) => {
  if (a.length == 5){
    return a.slice(0,4) + '0' + a.slice(4) - 0
  }
  return a - 0
}

const toMonth = (a) => {
  return a.slice(0,4) + '-' + a.slice(4)
}

const completeDates = ( date ) =>{
  let xAxisNew = []
  var now = new Date()
  const year = (date + '').slice(0,4)
  const nowYear = now.getFullYear()
  for (let y = year; y <= nowYear ; y++){
    for (let m = 1; m <= 12; m ++){
      xAxisNew.push(y.toString() + m.toString())
    }
  }
  return xAxisNew
}

const getBarSeries = (data) =>{

  let xAxis = []

  data.forEach(el => {
    let x = el.data? Object.keys(el.data) : []
    xAxis.push(...x)
  });

  xAxis = xAxis.filter((item,index) => xAxis.indexOf(item) === index ) 
  xAxis.sort((a,b) => {return toNum(a) - toNum(b)})

  if (xAxis[0]){
    xAxis = completeDates(xAxis[0])
  }
  
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
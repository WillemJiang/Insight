import * as echarts from 'echarts'
import getSeries from './getSeries';

export default function line(dom, data, title, close_func){
    let {series, xAxis} = getSeries.bar([{
        name:'PMC',
        data:data['pmc']
      }])
    const lineData = getTotal(series[0]['data']) 
    const myChart = echarts.init(dom,'roma');
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        title: {
            text: title,
            subtext: data['description'],
            top:20,
            left: 'center'
        },
        grid: {
            top:100,
            right: '10%'
        },
        legend: {
            top:60,
            right:30,
            data: ['new', 'total']
        },
        toolbox: {
            top:10,
            right:20,
            feature: {
                myClose: {
                    show: true,
                    title: 'close',
                    icon: 'path://M704.28672 309.20704l28.95872 28.9792L334.6432 736.78848l-28.95872-28.9792z M341.03296 315.5968l398.60224 398.60224-28.95872 28.95872-398.60224-398.60224z',
                    onclick:() =>{
                        close_func()
                    } 
                }
            }
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis
            }
        ],
        yAxis: [{
            type: 'value',
            name: 'scale',
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
            name: 'new',
            type: 'bar',
            data: series[0]['data']
        },
        {
            name: 'total',
            type: 'line',
            data: lineData
        }]
    };
    myChart.setOption(option);
    window.onresize = () => {
        myChart.resize()
    }
    return myChart
}


function getTotal(raw_list){
    console.log(raw_list);
    let list =[]
    let  a = 0
    raw_list.forEach(el => {
        a = a + el
        list.push(a)
    })
    return list
}
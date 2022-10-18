import * as echarts from 'echarts'

export default function line(dom, data, title, close_func){
    const lineValue = getTotal(data.values)
    const established = data['established'].split('/')[1] + '-'+(data['established'].split('/')[0] - 0)
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
                data:data['xAxis']
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
            data: data.values
        },
        {
            name: 'total',
            type: 'line',
            data: lineValue
        },
        {
            data: [[data['xAxis'].indexOf(established),lineValue[data['xAxis'].indexOf(established)]]],
            type: 'scatter',
            symbol: 'path://M512 85.9l110.8 318.7 337.2 6.8-268.8 203.8 97.7 322.9L512 745.4 235.1 938.1l97.7-322.9L64 411.4l337.2-6.8z',
            symbolSize: 20,
            tooltip: {
                show:false
            },
            label: {
                show: true,
                formatter: function () {
                    return 'established';
                },
                position: [40,20],
                minMargin: 2
            }
        }]
    };
    myChart.setOption(option);
    window.onresize = () => {
        myChart.resize()
    }
    return myChart
}


function getTotal(raw_list){
    let list =[]
    let  a = 0
    raw_list.forEach(el => {
        a = a + el
        list.push(a)
    })
    return list
}
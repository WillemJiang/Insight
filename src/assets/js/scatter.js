import * as echarts from 'echarts'

export default function scatter(dom,data){
    const mychart = echarts.init(dom,'roma');
    const years = data['xAxis']
    const committees = data['yAxis']
    const size = data['size'].map(function (item) {
        return [item[1], item[0], item[2]];
    });
    const option = {
        title: {
            text: 'Trends in the growth of committees',
            left:40,
            top:20,
        },
        tooltip: {
            position: 'top',
            axisPointer: {
                type: 'cross'
            },
            formatter: function (params) {
                if(params.componentSubType == 'scatter'){
                    const size = params.data[2]
                    const xAxis = years[params.data[0]]
                    const yAxis = committees[params.data[1]]
                    return `${xAxis} <br/> ${yAxis}: ${size}`;
                }
            }
        },
        grid: {
            left: 40,
            top:'10%',
            bottom: '5%',
            right: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: years,
            boundaryGap: false,
            splitLine: {
                show: true
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: committees,
            minInterval: 0,
            axisLine: {
                show: false
            }
        },
        series: [{
            type: 'scatter',
            symbolSize: function (val) {
                return val[2];
            },
            emphasis:{
                scale:true
            },
            data: size,
            animationDelay: function (idx) {
                return idx * 5;
            }
        }]
    };
    mychart.setOption(option);
    
    return mychart
}
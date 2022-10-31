import * as echarts from 'echarts';

export default function( dom, myChart, dataList, rank, itemColor){
  const data = dataList.filter(item => item.rank == rank)

  if (myChart!= null && myChart!= "" && myChart!= undefined) {
    myChart.dispose();
  }
  myChart = echarts.init(dom);
  
  var option;

  option = {
    tooltip:{
      show:true,
    },
    title:{
      text:rank
    },
    xAxis: {
      type: 'value',
      splitLine:false,
      axisLabel:{
        show:false
      }
    },
    yAxis: {
      type: 'category',
      triggerEvent:true,
      data: data.map(item => item.name)
    },
    dataZoom:data.length > 40?{
      id: 'dataZoomY',
      type: 'slider',
      yAxisIndex: [0],
      filterMode: 'empty',
      end:3000/data.length,
    }:null,
    series: [
      {
        data: data.map(item => item.score),
        type: 'bar',
        showBackground: true,
        label:{
          show:true
        },
        itemStyle:{
          color:itemColor
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };

  option && myChart.setOption(option);

  return myChart
}

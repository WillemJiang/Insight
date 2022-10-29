import * as echarts from 'echarts';

export default function( dom, myChart, dataList, rank){

  if (myChart!= null && myChart!= "" && myChart!= undefined) {
    myChart.dispose();
  }
  myChart = echarts.init(dom);
  
  var option;

  option = {
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data:  dataList.filter(item => item.rank == rank).map(item => item.name)
    },
    series: [
      {
        data:  dataList.filter(item => item.rank == rank).map(item => item.score),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };

  option && myChart.setOption(option);

  return myChart
}

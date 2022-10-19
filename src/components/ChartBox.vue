<script>
import scatter from '../assets/js/scatter'  
import line from '../assets/js/line'  


export default {
    data() {
        return {
            myScatter:null,
            popup:null,
            data:[],
            subShow:false,
        }
    },
    created(){
        this.getData()
    },
    watch: {
        subShow: function (val) {
            if(val){
                setTimeout(()=>{
                    this.popup.resize()
                },200)
            }
        },
    },
    methods:{
        getData(){
            const request = new XMLHttpRequest();
            request.open("get",'@/../json/committee.json');
            request.send(null);
            request.onload = () => {
                if(request.status == 200) {
                    this.data = JSON.parse(request.responseText);                  
                    this.drawScatter()
                }
            }
        },
        
        drawScatter(){
            const dom = document.getElementById('Scatter')
            dom.removeAttribute("_echarts_instance_");
            const chartData = this.data['scatter']
            this.myScatter = scatter(dom, chartData)
            this.myScatter.on('click', (params) => {
                if(params.componentType == "graphic"){
                    const data = chartData[params.name]
                    const years = data['xAxis']
                    const committees = data['yAxis']
                    const size = data['size'].map(function (item) {
                        return [item[1], item[0], item[2]];
                    });
                    this.myScatter.setOption({
                        xAxis: {
                            data: years,
                        },
                        yAxis: {
                            data: committees,
                        },
                        series: [{
                            data: size
                        }]
                    })
                }else if(params.componentType == "series"){
                    const committees = chartData[params.seriesName]['yAxis']
                    this.drawLine(committees[params.value[1]])
                }
            });
            window.onresize = () => {
                this.myScatter.resize()
            }
        },     
        drawLine(committee){
            this.subShow = true
            const data = this.data['committee_detail'][committee]
            const title = committee
            const dom = document.getElementById('popup')
            this.popup = line(dom, data, title, ()=>{
                this.subShow = false
            })
        }, 
    }
}
</script>

<template>
    <div id="Scatter"></div>
    <div id="popup" :class="subShow?'sub-show':'sub-hide'"></div>
</template>

<style scoped>
    #Scatter{
        position: relative;
        flex:1;
        width: 90vw;
        height:90vh;
    }
    #popup{
        position: absolute;
        top:20px;
        left: 40px;
        background-color: white;
        border-radius: 3px;
        box-shadow: 0 0 10px;
        transition: all .2s;
        padding: 0;
        overflow: hidden;
    }
    .sub-show{
        width: 60vw;
        height:50vh;
        overflow: hidden;
    }
    .sub-hide{
        width: 0;
        height:0;
    }
    .sub-hide *{
        display: none;
    }

</style>
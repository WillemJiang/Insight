<script>
import scatter from '../assets/js/scatter'  

export default {
    data() {
        return {
            myScatter:null,
            data:[]
        }
    },
    // 先获取数据，然后再开始绘图
    created(){
        this.getData()
    },
    methods:{
        // 文件获取的api需要单独写在一个文件里
        getData(){
            const request = new XMLHttpRequest();
            request.open("get",'/json/committer.json');
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
            const chartData = this.data['scatter']
            this.myScatter = scatter(dom, chartData)
            this.myScatter.on('click', (params) => {
                if(params.componentType == "series"){
                    const committees = this.committee_data['scatter'][this.tagList[0]]['yAxis']
                    this.drawLine(committees[params.value[1]])
                }
            });
        },      
    } 
}
</script>

<template>
    <div id="Scatter"></div>
</template>

<style scoped>
    #Scatter{
        position: relative;
        flex:1;
        width: 90vw;
        height:90vh;
    }

</style>
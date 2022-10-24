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
            tagList:[],
            tagCurrent:''
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
                    this.tagList = Object.keys(this.data['scatter']).splice(0,10) 
                    this.tagCurrent = this.tagList[0]         
                    this.drawScatter()
                }
            }
        },
        
        drawScatter(){
            const dom = document.getElementById('Scatter')
            dom.removeAttribute("_echarts_instance_");
            const chartData = this.data['scatter'][this.tagCurrent]
            this.myScatter = scatter(dom, chartData)
            this.myScatter.on('click', (params) => {
                if(params.componentType == "series"){
                    const committees = chartData['yAxis']
                    this.drawLine(committees[params.value[1]])
                }
            });
            window.onresize = () => {
                this.myScatter.resize()
            }
        },     
        tagSelect(tag){
            this.tagCurrent = tag
            this.drawScatter()
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
    <ul class="tag-box">
        <li 
        v-for="item in tagList" 
        :key="item" class="tag" 
        :class="{'tag-active': item === tagCurrent}"
        @click="tagSelect(item)"
        >{{item}}</li>
    </ul>
    <div id="popup" :class="subShow?'sub-show':'sub-hide'"></div>
</template>

<style scoped>
    #Scatter{
        position: relative;
        flex:1;
        width: 90vw;
        height:90vh;
    }
    .tag-box{
        position: absolute;
        top:3rem;
        left:450px;
        height: 2rem;
        width: calc(100% - 450px - 4rem);
        user-select: none;
    }
    .tag-box .tag{
        display: inline-block;
        margin: 3px 15px;
        padding: 0px 10px;
        border-radius: 15px;
        size: 18px;
        border: 1px solid #7d95e1;
        background-color: white;
        color: #7d95e1;
        cursor: pointer;
    }
    .tag-box .tag-active,.tag-box .tag:active{
        color: white;
        background-color: #7d95e1;
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
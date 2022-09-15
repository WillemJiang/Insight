<script>
import scatter from '../assets/js/scatter'  

export default {
    data() {
        return {
            myScatter:null,
            data:[]
        }
    },
    created(){
        this.getData()
    },
    methods:{
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
<template>
    <div class="biao">
        <div class="fade" v-if="isShowAll" >
            <div class="header">
                <i class="el-icon-s-data" style="color:#fff"></i>
                <span>数据曲线</span>
                <i class="el-icon-close" @click="isShowAll=!isShowAll"
                   style="color:#fff;float:right;margin-top:7px;cursor:pointer"></i>
            </div>

            <el-radio-group v-model="radio">
                <el-radio :label="3">疫情对比</el-radio>
                <el-radio :label="6">新增趋势</el-radio>

            </el-radio-group>

            <div class="nr"  style="color: white" id="myCharts" ref="myCharts"></div>

        </div>

        <el-button v-else  type="text" @click="isShow()">
            <i class="el-icon-s-data" style="color:#fff"></i>
            数据曲线
        </el-button>
    </div>
</template>

<script>
  import Echarts from 'echarts'
  export default {
    name: "echarts",
    props:{
      tableData:{
        type:Array
      }
    },
    data(){
      return {
        isShowAll:true,
        radio:3,
        isRadio:true,
        myCharts:null
      }
    },
    mounted(){
      this.init()
    },
    watch:{
      radio :function (){
        if(this.radio===3){
          this.isRadio=true;
            this.init()
        }
        if(this.radio===6){
          this.isRadio=false;
            this.init2()
        }
      }
    },
    methods:{
      isShow(){
        this.isShowAll=!this.isShowAll;
        this.$nextTick(()=>{
          this.init()
        })
      },
      init(){
        this.myCharts = Echarts.init(this.$refs.myCharts);
        let option;
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['累计','治愈', '死亡'],
            textStyle: {
              color: "#fff"
            }

          },
          grid: {
            left: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            name:'万',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
          },
          yAxis: {
            type: 'category',
            data: ['7.15', '7.16', '7.17', '7.18'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
          },
          series: [
            {
              name: '累计',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [440.56,440.93,442.37, 445.61]
            },
            {
              name: '治愈',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [187.76,189.63,196.54, 203.87]
            },
            {
              name: '死亡',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [12.95, 13.96, 14.86, 15.74]
            }
          ]
        };

        this.myCharts.setOption(option);
      },
      init2(){
        this.myCharts.dispose();
        this.myCharts = Echarts.init(this.$refs.myCharts);
        let option  = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: 'red'
              }
            }
          },
          legend: {
            data: [ '新增'],
            textStyle:{
              color:"#fff"
            }

          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['7.15', '7.16', '7.17', '7.18'],
              axisLabel: {
                show: true,
                textStyle: {
                  color:'#fff'
                }
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  color:'#fff'
                }
              },
            }
          ],
          series: [
             {
               name: '新增',
               type: 'line',
               stack: '总量',
               areaStyle: {},
               data: [14456, 15046, 16589, 17658]
             },
          ]
        };
        this.myCharts.setOption(option);
      },
    }
  }
</script>

<style scoped>
    .biao{
        position: absolute;
        left: 20px; bottom:60px;
    }
    .el-button{
        position: absolute; left: 0;bottom: 0;
        padding: 10px;cursor:pointer;
        color: white;
        font-size: 16px;font-weight: 700;
        background-color:#384546;
        border: 2px solid gray;
    }
    .fade{
        position: absolute; left: 0;bottom: 0;
        width: 400px;
        height: 230px;
        padding: 10px 10px 0 10px;
        background: rgba(56,59,70,0.6);
    }
    .fade .header{
        background-color: #3F6073; padding-left: 10px; padding-right: 10px;
        color: white; height: 32px; line-height: 32px;
        font-size: 18px; font-weight: 700;
    }
    .fade .nr{
        margin-top: 10px;
        width: 100%; height: 165px;
    }
</style>
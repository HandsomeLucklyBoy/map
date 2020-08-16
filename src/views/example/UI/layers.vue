<template>
    <div class="layers">
       <div class="fade" v-if="isShowAll" >
           <div class="header">
               <i class="el-icon-coin" style="color:#fff"></i>
               <span>图层[基于确诊病例]</span>
               <i class="el-icon-close" @click="isShowAll= !isShowAll"
                  style="color:#fff;float:right;margin-top:7px;cursor:pointer"></i>
           </div>

           <div class="nrnr">
               <div class="nr">
                   <div class="nr-l">
                       <input type="checkbox" v-model="checked1">
                   </div>
                   <div class="nr-r">
                       <div class="title">热力图
                           <div v-for="(item,index) in fenxi" :key="index" :class="{active:index===currindex1}"
                                class="fenxi" @click="hotmap(index)">{{item}}</div>
                       </div>
                       <div class="nrr">
                           <div v-for="(item,index) in color1" :key="index" :style="'background-color:'+item.color"
                                class="fenxi1" >{{item.num}}</div>
                       </div>
                   </div>
               </div>

               <div class="nr">
                   <div class="nr-l">
                       <input type="checkbox" v-model="checked2">
                   </div>
                   <div class="nr-r">
                       <div class="title">填色图
                           <div v-for="(item,index) in fenxi" :key="index" :class="{active:index===currindex2}"
                                class="fenxi" @click="tsMap(index)">{{item}}</div>
                       </div>
                       <div class="nrr">
                           <div v-for="(item,index) in color2" :key="index" :style="'background-color:'+item.color"
                                class="fenxi1" >{{shownum2(item)}}</div>
                       </div>
                   </div>
               </div>

               <div class="nr">
                   <div class="nr-l">
                       <input type="checkbox" v-model="checked3">
                   </div>
                   <div class="nr-r">
                       <div class="title">聚类图
                           <div v-for="(item,index) in fenxi" :key="index" :class="{active:index===currindex3}"
                                class="fenxi" @click="jhMap(index)">{{item}}</div>
                       </div>
                       <div class="nrr">
                           <div v-for="(item,index) in color3" :key="index" :style="'background-color:'+item.color"
                                class="fenxi1" >{{item.num}}</div>
                       </div>
                   </div>
               </div>

               <div class="nr">
                   <div class="nr-l">
                       <input type="checkbox" v-model="checked5">
                   </div>
                   <div class="nr-r">
                       <div class="title">柱状图
                           <div v-for="(item,index) in fenxi" :key="index" :class="{active:index===3}"
                                class="fenxi">{{item}}</div>
                       </div>
                       <div class="nrr">
                           <div class="fenxi1" style="background-color: red;opacity: 0.6"></div>
                       </div>
                   </div>
               </div>

               <div class="nr">
                   <div class="nr-l">
                       <input type="checkbox" v-model="checked4">
                   </div>
                   <div class="nr-r">
                       <div class="title">分类集合

                       </div>
                       <div class="nrr">
                           <div v-for="(item,index) in color4" :key="index" :style="'background-color:'+item.color"
                                class="fenxi1" >{{item.num}}</div>
                       </div>
                   </div>
               </div>
           </div>

       </div>

       <el-button v-else type="text" @click="isShowAll= !isShowAll">
          <i class="el-icon-coin" style="color:#fff"></i>
          图层[基于确诊病例]
       </el-button>


    </div>
</template>

<script>
    import {colors} from '../../../components/color/index'
  export default {
    name: "layers",
    props:{
      showAll:{
        type:Boolean,
        default:true
      }
    },
    mixins:[colors],
    data(){
      return {
        isShowAll:this.showAll,
        checked1:true,
        checked2:false,
        checked3:false,
        checked4:false,
        checked5:false,
        currindex1:3,
        currindex2:3,
        currindex3:3,
        currindex4:3,
        id:3,
        fenxi:['死亡','治愈','新增','累计'],
        item:null,

      }
    },
    computed:{

    },
    methods:{
      hotmap(index){
        this.currindex1=index;
      },
      tsMap(index){
        this.currindex2=index;
        this.id=index;
        if(index===3 || index===2){
          this.$emit('changeTSMapType', this.changeIndex(index))
        }
      },
      changeIndex(index){
        if(index===0){
          return 'DEATH'
        }
        else if(index===1){
          return 'OK'
        }
        else if(index===2){
          return 'NEW'
        }
        else if(index===3){
          return 'LEIJI'
        }
      },
      shownum2(item){
        if(this.id===3){
          return item.num
        }
        if(this.id===2){
          return item.num1
        }
      },
      jhMap(index){
        this.currindex3=index;
      }

    },
    watch:{
      checked2:function () {
        if(this.checked2===true){
          this.$emit("showTSMap",'visible')
        }
        else{
          this.$emit("showTSMap",'none')
        }
      },
      checked1:function () {
        if(this.checked1===true){
          this.$emit("showHeatMap",'visible')
        }
        else{
          this.$emit("showHeatMap",'none')
        }
      },
      checked3:function () {
        if(this.checked3===false){
          this.$emit("showJHMap",'none')
        }
        else{
          this.$emit("showJHMap",'visible')
        }
      },
      checked4:function () {
        if(this.checked4===false){
          this.$emit("showClusterMap",'none')
        }
        else{
          this.$emit("showClusterMap",'visible')
        }
      },
      checked5:function () {
        if(this.checked5===false){
          this.$emit("showZZMap",'none')
        }
        else{
          this.$emit("showZZMap",'visible')
        }
      },
    }
  }
</script>

<style scoped>
    .layers{
        position: absolute;
        right: 20px; width: 430px;height: 206px;
        bottom: 20px;
    }
    .el-button{
        position: absolute; right: 0;bottom: 0;
        padding: 10px;cursor:pointer;
        color: white;
        font-size: 16px;font-weight: 700;
        background-color:#384546;
        border: 2px solid gray;
    }
    .fade{
        width: 410px;
        height: 186px;
        padding: 10px;
        background: rgba(56,59,70,0.6);
    }
    .fade .header{
        background-color: #3F6073; padding-left: 10px; padding-right: 10px;
        color: white; height: 32px; line-height: 32px;
        font-size: 18px; font-weight: 700;
    }
    .fade .nr{
        width: 376px;height: 45px; margin: 10px 0;
        background-color:#272B2B; display: flex;
    }
    .fade .nr .nr-l{
        width: 24px; height: 100%;
    }
    .fade .nr .nr-l input{
        width: 16px;height: 16px;
        border: 1px solid #fff;
        margin-top: 13px; margin-left: 4px;
    }
    .fade .nr .nr-r{
        flex: 1; height: 100%; padding-left: 5px;
    }
    .fade .nr .title{
        width:100%;height: 30px;
        color: #fff; font-size: 16px;line-height: 30px;
    }
     .fenxi{
        float: right; height: 30px; width: 48px;margin-left: 1px;
         font-size: 14px;
        background-color: #394F5C;text-align: center; cursor:pointer;
    }
    .fade .nr  .nrr{
        display: flex; height: 15px; width: 100%;
        font-size: 15px;
        border: 1px solid white;
    }
    .fade .nr  .nrr .fenxi1{
        flex: 1;text-align: center; line-height: 15px;
    }
    .fade .nr .title .active{
        background-color: #59A2D6;
    }
    .nrnr{
        overflow: auto;
        width: 100%;
        height: 156px;
    }
</style>

<style>
    .el-drawer__wrapper{
        position: relative;
        height: 186px;
        width: 410px;
        padding: 10px;
    }
    .el-drawer__container{
        width: 100%;height: 100%;
    }
    .el-drawer__open .el-drawer.rtl{
        width: 100%;
    }

</style>
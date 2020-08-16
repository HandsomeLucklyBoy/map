<template>
    <div class="map">
        <div id="map">
        </div>
        <layers  :showAll="open" @showTSMap="showTSMap" @changeTSMapType="changeTSMapType"
                  @showHeatMap="showHeatMap" @showJHMap="showJHMap" @showZZMap="showZZMap"
                  @showClusterMap="showClusterMap"/>
        <header-com></header-com>
        <table-biao :tableData="tableData"/>
        <echart-com />
    </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl'

  import Layers from './UI/layers'
  import HeaderCom from'./UI/head'
  import TableBiao from './UI/table'
  import EchartCom from'./UI/echarts'

  import {colors} from '../../components/color/index'

  import {addHeatMap} from './heatmap'
  import {addJiHe} from './jihe'
  import {addFLMap} from './fenlei'
  import {addCluster} from './cluster'

  const statesD = require('./states.json');
  const clusters = require('./clusters.json')

  export default {
    name: "index",
    components:{
      Layers,
      HeaderCom,
      TableBiao,
      EchartCom
    },
    data(){
      return {
        map:null,
        open:true,
        tableData:[]
      }
    },
    mixins:[colors],
    mounted(){
      this.init()
    },
    methods:{
      init(){
        mapboxgl.accessToken = 'pk.eyJ1Ijoid3MyMDIwIiwiYSI6ImNrYzl3ZXgxZTFkNjUyenFlZWFxN2d0N2oifQ.FDSJU5c7EGFtfWX3r4qBgA';

        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/ws2020/ckdbg182v24ev1ipl5itd9f0h',
          center: [-98, 38.88],
          zoom: 3,
          antialias: true
        });

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');

        map.addControl(new mapboxgl.FullscreenControl(),'top-left');

        const scale = new mapboxgl.ScaleControl({
          maxWidth: 100,
          unit: 'metric'
        });
        map.addControl(scale, "bottom-left");
        const express1 = [ 'interpolate', ['linear'], ['get', "LEIJI"]];

        this.color2.forEach(item=>{
          express1.push(item.num,item.color)
        })

        const express2 = [ 'interpolate', ['linear'], ['get', "NEW"]];
        this.color1.forEach(item=>{
          express2.push(item.num,item.color)
        })

        statesD.features.forEach(item=>{
          this.tableData.push(item.properties)
        })


        map.on('load', function () {
          map.addSource('state', {
             'type': 'geojson',
             'data': statesD
           });

          map.addLayer({
             "id": "states",
             "type": "fill",
             "source": 'state',
             "layout": {
               'visibility':"none"
             },
             'paint': {
               'fill-color': express1,
               'fill-opacity': 0.8
             }
           });

          //  分类集合
          addCluster(map)
          //  热力图
          addHeatMap(map,express2)
          //   集合图
          addJiHe(map,clusters)
          //  柱状图
          addFLMap(map)
       });

        map.on('click', 'states', function (e) {
          const features = e.features[0].properties;
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<div>\n' +
              ' <p>'+features.STATE_NAME+'</p><p>累计：'+features.LEIJI+'</p>\n'+
              '<p>新增：'+features.NEW+'</p><p>治愈：'+features.OK+'</p><p>死亡：'+features.DEATH+'</p>\n' +
              '        </div>')
            .addTo(map);
        })

        this.map=map;


      },

      //  填色图
      showTSMap(isShow){
        this.map.setLayoutProperty("states", 'visibility',isShow)
      },
      //  热力图
      showHeatMap(isShow){
        this.map.setLayoutProperty("states-point", 'visibility',isShow)
        this.map.setLayoutProperty("states-heat", 'visibility',isShow)
      },
      //   集合图
      showJHMap(isShow){
        this.map.setLayoutProperty("clusters", 'visibility',isShow)
        this.map.setLayoutProperty("cluster-count", 'visibility',isShow)
        this.map.setLayoutProperty("unclustered-point", 'visibility',isShow)
       // this.map.setLayoutProperty("unclustered-label", 'visibility',isShow)
      },
      //  改变填色图类型
      changeTSMapType(type){
        const express1 = [ 'interpolate', ['linear'], ['get', type]];
        if(type==="LEIJI"){
          this.color2.forEach(item=>{
            express1.push(item.num,item.color)
          })
        }
        if(type==="NEW"){
          this.color2.forEach(item=>{
            express1.push(item.num1,item.color)
          })
        }

        this.map.setPaintProperty("states", 'fill-color',express1)
      },
      //  柱状图
      showZZMap(isShow){
        if(isShow==="none"){
          this.map.setLayoutProperty("3d-buildings", 'visibility',isShow)
          this.map.setBearing(0);
          this.map.setPitch(0);
        }
        else{
          this.map.setBearing(-17.6);
          this.map.setPitch(45);
          this.map.setLayoutProperty("3d-buildings", 'visibility',isShow)
        }
      },
      //  分类集合
      showClusterMap(isShow){
        this.map.setLayoutProperty("cluster_circle", 'visibility',isShow)
        this.map.setLayoutProperty("cluster_label", 'visibility',isShow)
      }
    }
  }
</script>

<style scoped>
    @import "../../assets/mapbox/mapbox-gl.css";
    #map {height: 100% ;width:100%;}
    .map{
        height: 100% ;width:100%; position: relative;
    }
</style>

<style>
    .mapboxgl-ctrl-attrib{
        display: none;
    }
    .mapboxgl-ctrl.mapboxgl-ctrl-scale {
        height: 10px;
        background-color:transparent;
        line-height:10%;
        text-align:center
    }
    .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl a{
        display: none;
    }
    .mapboxgl-ctrl-top-right,.mapboxgl-control-container .mapboxgl-ctrl-top-left{
        margin-top: 180px;
    }
    .el-menu-item:hover, .abc:hover{
        background-color: #407627;
        color: #fff;
    }
    .el-menu-item.is-active, .abc.is-active{
        background-color: #407627;
        color: #fff;
    }
</style>
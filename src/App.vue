<template>
  <div id="app">
      <c-map></c-map>
  </div>
</template>

<script>
  import cMap from './views/example/Index'
    export default {
        name: "app",
        data(){
           return {
           }
        },
        components:{
          cMap
        }
    }
</script>


<style>
  body { margin:0; padding:0; }
  #app{
      width: 100%;
      height: 100vh;
  }
  .mapboxgl-ctrl-top-right, .mapboxgl-ctrl-top-left{
      margin-top: 120px;
  }
</style>

<template>
    <div class="header">
        <span>新冠病毒疫情</span>
        <div class="wenzi">
            <div class="wenzi-nr">
                <div class="title color1">确诊</div>
                <div class="num f1">4768965</div>
            </div>
            <div class="wenzi-nr">
                <div class="title color2">治愈</div>
                <div class="num f2">2038798</div>
            </div>
            <div class="wenzi-nr">
                <div class="title color3">死亡</div>
                <div class="num f3">157428</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "heads"
  }
</script>

<style scoped>
    .header{
        position: absolute;
        top:20px;left: 30px;
        width: 360px; height: 150px;

    }
    span{
        font-size: 30px;
        color: #fff;
    }
    .wenzi{
        width: 360px;height: 110px;
        display: flex;
        background: rgba(56,59,70,0.6);
    }
    .wenzi-nr{
        padding: 10px; flex: 1;
    }
    .wenzi-nr .title{
        font-size: 20px; padding-left: 10px;
        color: white;
    }
    .color1{
        background-color: #8D4242;

    }
    .f1{
        color: #8D4242;
    }
    .color2{
        background-color: #3E915B;
    }
    .f2{
        color: #3E915B;
    }
    .color3{
        background-color: #565C5F;
    }
    .f3{
        color:#565C5F;
    }
    .wenzi-nr .num{
        font-size: 24px;
        margin-top: 20px;
        font-weight: 700;
    }
</style>
<template>
    <div class="table">
        <el-button v-if="isShowAll" type="text" @click="isShowAll= !isShowAll">
            <i class="el-icon-coin" style="color:#fff"></i>
            累计数据
        </el-button>
        <div class="fade" v-else >
            <div class="header">
                <i class="el-icon-coin" style="color:#fff"></i>
                <span>累计数据</span>
                <i class="el-icon-close" @click="isShowAll= !isShowAll"
                   style="color:#fff;float:right;margin-top:7px;cursor:pointer"></i>
            </div>

            <div class="nr">
                <el-table
                        :data="tableData" :header-cell-class-name="headerStyle"
                        style="width: 100%; opacity: 0.7;color: white"

                        :row-style="tableRowStyle" :cell-style="tableRowStyle"
                        height="270">
                    <el-table-column
                            fixed
                            prop="STATE_NAME"
                            label="州"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="LEIJI"
                            label="累计"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="NEW"
                            label="新增"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="OK"
                            label="治愈"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="DEATH"
                            label="死亡"
                            width="80">
                    </el-table-column>
                </el-table>
            </div>



        </div>
    </div>
</template>

<script>
  export default {
    name: "table11",
    props:{
      tableData:{
        type:Array
      }
    },
    data(){
      return {
        isShowAll:false,  //2E3637
      }
    },
    methods:{
      headerStyle ({row, column, rowIndex, columnIndex}) {
        return 'tableStyle'
      },
      tableRowStyle ({  row, column, rowIndex, columnIndex  }) {
        return 'background-color:#2E3637'
      }
    }
  }
</script>

<style scoped>
    .table{
        position: absolute;
        right: 20px; top:60px;
    }
    .el-button{
        position: absolute; right: 0;top: 0;
        padding: 10px;cursor:pointer;
        color: white;
        font-size: 16px;font-weight: 700;
        background-color:#384546;
        border: 2px solid gray;
    }
    .fade{
        position: absolute; right: 0;top: 0;
        width: 340px;
        height: 310px;
        padding: 10px;
        background: rgba(56,59,70,0.6);
    }
    .fade .header{
        background-color: #3F6073; padding-left: 10px; padding-right: 10px;
        color: white; height: 32px; line-height: 32px;
        font-size: 18px; font-weight: 700;
    }
    .fade .nr{
        margin-top: 10px;
        width: 100%; height: 288px;
    }
</style>
<style>
    .tableStyle{
        background-color: #2E3637!important;
        color:#fff;
        font-weight:400;
    }
</style>
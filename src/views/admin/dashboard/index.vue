<!--start::Template-->
<template>
  <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <!-- <h1>Dashboard</h1> -->
    <!-- <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
      <el-select class="selectBackground" style="width: 110px; margin-right: 5px;" @change="()=>{
          this.dates = ''
          fetchData3()
        }" v-model="dateType">
        <el-option label="By Month" value="month">By Month</el-option>
        <el-option label="By Dates" value="daterange">By Dates</el-option>
      </el-select>
      <el-date-picker
        v-model="dates"
        @change="()=>fetchData3()"
        :type="dateType"
        :placeholder="dateType === 'month' ? 'Pick a month' : ''"
        :format="dateType === 'month' ? 'MMM yyyy' : 'dd-MM-yyyy'"
        value-format="yyyy-MM-dd"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date">
      </el-date-picker>
      &nbsp;
      <el-input placeholder="Search" style="width: 240px; margin-left: 0px;" @change="()=>fetchData3()" v-model="search"/>
      <el-button style="margin-left: 10px;" type="primary">Search</el-button>
    </div> -->
  </div>
</template>
<!--end::Template-->

<!--start::Script-->
<script>
import BarChart from "@/components/BarChart"
import moment from "moment"

export default {
  name: 'dashboard',
  data() {
    return {
      // search: '',
      // dateType: 'month',
      // dates: '',
      loading: true,
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    }
  },
  mounted() {
  },
  computed: {
    awakRole() {
      return this.$store.state.user.awakRole
    }
  },
  components: {
    BarChart
  }
}
</script>
<!--end::Script-->

<!--start::Style-->
<style lang="scss">
@import 'src/styles/variables.scss';
.el-date-editor .el-range-separator {
  width: 20px;
}
.rowCursor {
  cursor: pointer;
}
.selectBackground {
  .el-input__inner {
    background-color: #eee;
  }
}
.dashboardSection {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  @media (max-width: 520px) {
    flex-direction: column;
  }
  .dashboardBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 240px;
    height: 160px;
    border: 1px #999 solid;
    margin: 10px 20px;
    border-radius: 20px;
    .dashboardBoxTop {
      // margin-bottom: 20px;
      font-size: 21px;
      font-weight: bold;
      color: #fff;
    }
    .dashboardBoxBottom {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      height: 80px;
    }
    .dashboardStatus {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // border: #ccc 1px solid;
      // border-radius: 10px;
      padding: 6px;
      margin-bottom: 4px;
      width: 100px;
      height: 20px;
      font-size: 13px;
    }
    .dashboardNumber {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 20px;
      font-size: 32px;
      color: #fff;
    }
    .dashboardNumber2 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      overflow: scroll;
      width: 120px;
      height: 40px;
      font-size: 12px;
      padding-top: 10px;
      padding-bottom: 10px;
      position: absolute;
      bottom: 0px;
      color: #fff;
      background-color: #77f;
    }
    .dashboardNumber3 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 60px;
      height: 40px;
      font-size: 12px;
      position: absolute;
      bottom: 0px;
      color: #fff;
    }
  }
}
.chartBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  // height: 500px;
}
.tableBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  // height: 500px;
}

.chartBox2 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  // height: 500px;
}
</style>
<!--end::Style-->
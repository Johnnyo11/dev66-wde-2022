<template>
  <div class="app-wrapper" style="height: auto; min-height: calc(100% - 56px);" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <div class="sidebar-container" :style="device!=='mobile' ? 'top: 65px; ': 'top: 80px;'">
      <!--<el-row class="rowTop">
        <span v-if="sidebar.opened" style="width: 100%; text-align: left; color: #000; font-size: 13px; font-weight: bold; color: white;">{{ appName }}</span>
      </el-row>-->
      <el-row class="rowTop">
        <span v-if="sidebar.opened" style="width: 100%; text-align: left; color: #000; font-size: 13px; font-weight: bold; color: white;">{{ awakRole | roleFilter }}</span>
      </el-row>
      <el-row class="rowTop">
        <span v-if="sidebar.opened" style="width: 100%; text-align: left; color: #000; font-size: 13px; font-weight: normal; color: white;">{{ username }}</span>
      </el-row>
      <sidebar></sidebar>
    </div>
    <div style="display: flex; flex-direction: column;" class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from '@/mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      appName: process.env.APP_NAME
    }
  },
  mounted() {
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    username() {
      return this.$store.state.user.username
    },
    awakRole() {
      return this.$store.state.user.awakRole
    }
  },
  filters: {
    roleFilter(val) {
      if (val !== 'none') {
        return val[0].toUpperCase() + val.substring(1)
      } else {
        return 'Manager'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";
  @import "src/styles/mixin.scss";
  .app-wrapper {
    color: #000;
    @include clearfix;
    overflow: scroll;
    position: relative;
    height: calc(100% - 115px);
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .rowTop {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    height: 56px;
    background-color: #1a1a1a;
  }
</style>

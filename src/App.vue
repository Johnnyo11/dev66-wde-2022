<!--start::Template-->
<template>
  <div style="overflow: hidden;" id="app">
    <div style="display: flex; flex-direction: row; height: 100%; ">
      <div v-if="device === 'mobile' && !isCollapse" style="position: relative; min-width: 200px;" class="sidebar-container mobile">
        <el-row class="rowTop">
          <span style="width: 100%; text-align: left; color: #000; font-size: 13px; font-weight: bold;">{{ appname ? appname : '' }}</span>
        </el-row>
        <el-row class="rowTop">
          <span style="width: 100%; text-align: left; color: #000; font-size: 13px; font-weight: bold;">{{ awakRole | roleFilter }}</span>
        </el-row>
        <el-row class="rowTop">
          <span style="width: 100%; text-align: left; color: #000; font-size: 13px; font-weight: normal;">{{ username }}</span>
        </el-row>

        <el-scrollbar wrapClass="scrollbar-wrapper">
          <el-menu
            mode="vertical"
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            style="height: auto;"
          >
            <sidebar-item :routes="permission_routers"></sidebar-item>
          </el-menu>
          <el-menu
            mode="vertical"
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            style="height: auto;"
          >
            <div class="menu-wrapper">
              <template>
                <el-menu-item index="/logout" @click="logout" class="submenu-title-noDropdown">
                  <i style="color: #000;" class="el-icon-switch-button"></i>
                  <span slot="title">Log Out</span>
                </el-menu-item>
              </template>
            </div>
          </el-menu>
        </el-scrollbar>
      </div>

      <div :style="device === 'mobile' && globalSidebar === true ? 'left: 180px; position: absolute;' : ''" style="display: flex; flex-direction: column; height: 100%; width: 100%;">
        <header v-if="burgerAllowed" style="height: 75px;">
          <div class="headerClass">
            <div style="display: flex; flex: 1; align-items: center; justify-content: flex-start; flex-direction: row;">
              <a href="/">
                <img class="appLogo" :src="logo"/>
              </a>
            </div>
            <nav v-if="device !== 'mobile'" style="flex: 2; display: flex; justify-content: flex-start; align-items: center;">
              <div style="width: 100%;">
                <ul style="display: flex; list-style: none; margin: 0; padding: 0; flex-direction: row; flex-wrap: wrap; wdith: 100%;">
                  <li style="padding: 0; flex: 1;">
                    <a href="/" class="headerLink">HOME</a>
                  </li>
                </ul>
              </div>
            </nav>
            <div v-if="token === '' && device !== 'mobile'" style="flex: 1; display: flex; flex-direction: row; align-items: center; justify-content: center;">
            </div>
            <div v-else-if="device !== 'mobile'" style="flex: 1; display: flex; flex-direction: row; align-items: center; justify-content: center;">
              <el-dropdown style="margin-left: 10px;" trigger="click">
                <span style="cursor: pointer; color: #E6A23C;">
                  <i class="el-icon-user-solid"></i>
                  {{username}}
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                  <el-dropdown-item>
                    <span @click="logout" style="display:block;">Log Out</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <hamburger v-if="device === 'mobile'" style="position: relative; display: flex; flex-direction: row;" class="hamburger-container" :toggleClick="toggleGlobalSideBar" :isActive="globalSidebar.opened" :color="1"></hamburger>
          </div>
        </header>

        <div @click="handleClickOutside()" style="flex: 1; overflow: scroll;">
          <router-view></router-view>
          <div v-if="device !== 'mobile'" class="footerClass">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex-direction: row;">
              <p style="width: 200px; text-align: center; font-size: 11px; color: #fff;">Copyright © 2022. All rights reserved.</p>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <p style="width: 200px; text-align: center; font-size: 11px; color: #fff;"><span style="cursor: pointer;" @click="aboutus">About Us</span> | <span style="cursor: pointer;" @click="contactus">Contact Us</span></p>
            </div>
          </div>
          <div v-else class="footer2Class">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex-direction: row;">
                <p style="width: 100%; text-align: center; font-size: 11px; color: #fff;">Copyright © 2022. All rights reserved.</p>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <p style="width: 100%; text-align: center; font-size: 11px; color: #fff;"><span style="cursor: pointer;" @click="legal">Legal Terms</span> | <span style="cursor: pointer;" @click="privacy">Privacy Policy</span> | <span style="cursor: pointer;" @click="cookie">Cookie Policy</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <cookie-law theme="xfero"></cookie-law>
    </footer>
    
    <el-dialog v-loading="signInLoading" :visible.sync="signInPopup.opened" :before-close="signInClose" title="" width="300px">
      <p style="color: #000; font-size: 21px; margin: 0px 0px; text-align: center;">Sign in to</p>
      <p class="titleColor" style="font-size: 36px; margin: 40px 0px; font-family: CaviarDreams; font-weight: bold; text-align: center; margin-top: 30px; margin-bottom: 20px;">{{title}}</p>
      <div @click="google" style="display: flex; flex-direction: row; width: 100%; height: 50px; border-radius: 4px; margin-top: 20px; padding: 2px; cursor: pointer;" :style="agePermission ? 'background-color: #4285f4; cursor: pointer;' : 'background-color: #ccc; cursor: default;'">
        <div style="display: flex; justify-content: center; align-items: center; width: 60px; background-color: #fff;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" style="width: 14px;">
            <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"></path>
            <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"></path>
            <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"></path>
            <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"></path>
          </svg>
        </div>
        <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
          <span style="color: #fff; font-weight: 500;">Google</span>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 10px;">
        <span @click="agePermission ? agePermission = false : agePermission = true" style="width: 100%; text-align: center; cursor: pointer;"><el-checkbox style="margin-right: 10px;" v-model="agePermission"/>I confirm that I am at least <b>18</b> years old, or at least 13 years old <b>with</b> parental permission to use this website.</span>
        <!-- <span><el-checkbox v-model="agePermission"/>I agree</span> -->
      </div>
    </el-dialog>
  </div>
</template>
<!--end::Template-->

<!--start::Script-->
<script>
import CookieLaw from 'vue-cookie-law'
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
import SidebarItem from './views/admin/layout/components/Sidebar/SidebarItem'
import logo from './assets/logo.png'
import '@/permission'
import ResizeMixin from '@/mixin/ResizeHandler'

export default {
  name: 'App', components: { CookieLaw, Hamburger, SidebarItem },
  mixins: [ResizeMixin],
  data() {
    return {
      title: process.env.APP_NAME.toUpperCase(),
      appname: process.env.APP_NAME,
      signInLoading: false,
      agePermission: false,
      logo
    }
  },
  methods: {
    toggleGlobalSideBar() {
      this.$store.dispatch('ToggleGlobalSideBar')
    },
    // login() {
    //   this.$router.push('/login')
    // },
    // register() {
    //   this.$router.push('/register')
    // },
    // dashboard() {
    //   this.$router.push('/dashboard')
    // },
    signIn() {
      this.$store.dispatch('OpenSignInPopup', { subscribe: false })
    },
    signInClose() {
      this.$store.dispatch('CloseSignInPopup')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$store.dispatch('ResetRoutes').then(() => {
          this.$router.push('/?logout=true')
        })
      })
    },
    handleClickOutside() {
      this.$store.dispatch('CloseGlobalSideBar', { withoutAnimation: false })
    },
    google() {
      if (this.agePermission) {
        this.signInLoading = true
      }
    },
    kick(route) {
      this.$router.push(route)
    },
    aboutus() {
      window.open('https://www.xfero.io/')
    },
    contactus() {
      window.open('https://www.xfero.io/')
    },
    legal() {
      // window.open('/cookie')
    },
    privacy() {
      // window.open('/cookie')
    },
    cookie() {
      // window.open('/cookie')
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username
    },
    token() {
      return this.$store.state.user.token
    },
    globalSidebar() {
      return this.$store.state.app.globalSidebar
    },
    signInPopup() {
      return this.$store.state.app.signInPopup
    },
    device() {
      return this.$store.state.app.device
    },
    isCollapse() {
      return !this.$store.state.app.globalSidebar.opened
    },
    burgerAllowed() {
      return this.$store.state.app.burgerAllowed
    },
    awakRole() {
      return this.$store.state.user.awakRole
    },
    userData() {
      return this.$store.state.user.userData
    },
    ...mapGetters([
      'permission_routers'
    ])
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
  mounted() {
  },
  beforeRouteLeave(to, from, next) {
    this.$Tawk.$endChat()
  }
}
</script>
<!--end::Script-->

<!--start::Style-->
<style lang='scss'>
@import './styles/variables.scss';
@font-face { font-family: College; src: url('./fonts/college/college.ttf'); } 
@font-face { font-family: College; font-weight: bold; src: url('./fonts/college/collegeb.ttf'); } 
@font-face { font-family: CaviarDreams; src: url('./fonts/caviar_dreams/CaviarDreams.ttf'); } 
@font-face { font-family: CaviarDreams; font-weight: bold; src: url('./fonts/caviar_dreams/CaviarDreams_Bold.ttf'); } 

.Cookie--xfero {
  background-color: #fff;
  color: #000;
  padding: 1.250em;
}
.Cookie--xfero .Cookie__button {
  border-radius: 4px;
  background: #4285f4;
  padding: 0.625em 3.125em;
  color: #fff;
  border: 0;
  font-size: 1em;
}
.Cookie--xfero .Cookie__button:hover {
  background: #4285f4;
}
.Cookie--xfero .Cookie__button:focus {
  background: #4285f4;
}

.appLogo {
  height: 60px;
}

h1 {
  color: $color1;
}

.normal-text{
  color: #000;
  padding: 20px 2%;
}

.hyperlink{
  color: cyan;
}

.Cookie--dark-lime {
  background-color: #fff;
  color: #000;
}
.Cookie--dark-lime .Cookie__button {
  background-color: #409EFF;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  border-radius: 4px;
}
.Cookie--dark-lime .Cookie__button:hover {
  background-color: #409EFF;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  border-radius: 4px;
}
.Cookie--dark-lime .Cookie__button:focus {
  background-color: #409EFF;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  border-radius: 4px;
}

.headerClass {
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.2);
  border-bottom-style: solid;
  height: 75px;
  padding: 0px 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #1a1a1a;
  .headerLink {
    display: block;
    font-size: 13px;
    color: #fff;
    padding-top: 15px;
    padding-right: 0px;
    padding-bottom: 16px;
    padding-left: 0px;
    text-align: center;
  }
}

.footerSirimLogo {
  height: 30px;
}

.footerClass {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: $color1;
  background-color: #1a1a1a;
  border-top: 1px solid #aaa;
  padding: 10px 0px;
}
.footer2Class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $color1;
  background-color: #1a1a1a;
  border-top: 1px solid #aaa;
  padding: 10px 10px;
}

.titleColor {
  color: $color1;
}
.titleColor:focus {
  color: $color1;
}
.titleColor:hover {
  color: $color1;
}
.rowTop {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  background-color: #1a1a1a;
}
.el-form-item__content {
  // display: flex;
  flex-direction: column;
}
.el-table {
  font-size: 11px;
}
.el-table td, .el-table th {
  padding: 6px 0;
}
.el-table__expanded-cell[class*=cell] {
  padding: 14px 50px 20px 50px;
}
.pagination-container {
  margin-top: 10px;
}
</style>
<!--end::Style-->
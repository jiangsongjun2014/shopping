<template>
  <div class="header">
    <div class="header-left" @click="handlecollapse">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="header-log">校园购物</div>
    <div class="header-right">
      <div class="header-right-fullscreen" @click="handlefullscreen">
        <el-tooltip effect="dark" :content="fullscreen?'取消全屏':'全屏'">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <div class="header-right-img">
        <img src="../../assets/img/img.jpg" >
      </div>
      <el-dropdown class="header-right-dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}<i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
            <el-dropdown-item>项目仓库</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import bus from "./bus.js"
	import {removeToken} from "@/utils/auth.js"
  export default {
    data(){
      return {
        collapse: false,
        fullscreen: false,
      }
    },
    computed:{
      // 处理用户名
      username(){
        return JSON.parse(localStorage.getItem("ms_userinfo")).username
      }
    },
    methods: {
      // 处理左边开关
      handlecollapse(){
        this.collapse = !this.collapse
        // 设置collapse事件  将collapse传给sidebar组件
        bus.$emit("collapse", this.collapse)
      },
      // 处理全屏
      handlefullscreen(){
        let element = document.documentElement
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen
      },
      // 处理下拉标签
      handleCommand(command){
        // 点击退出登录
        if (command == "loginout") {
          localStorage.removeItem("isLogin")
		  removeToken()
          this.$router.push("/login")
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .header{
    height: 70px;
    width: 100%;
    background-color: #242f42;
    display: flex;
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;
  }
  .header-left{
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-icon-s-unfold,.el-icon-rank,.el-icon-s-fold{
    color: #fff;
    font-size: 25px;
  }
  .header-log{
    flex: 1;
    height: 70px;
    color: #FFFFFF;
    font-size: 22px;
    display: flex;
    align-items: center;
  }
  .header-right{
    /* width: 220px; */
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 25px;
  }
  .header-right-fullscreen{
    width: 20px;
    height: 20px;
    transform: rotate(-45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }
  .header-right-img img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
  }
  .header-right-dropdown{
    color: #FFFFFF;
    margin: 10px;
  }
  .header-right-dropdown a{
    font-style: normal;
    list-style: none;
    text-decoration:none;
  }
</style>

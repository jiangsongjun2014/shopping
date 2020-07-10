
<template>
    <div class="warp">
      <v-Header></v-Header>
      <v-Sidebar></v-Sidebar>
      <div class="content-box" :class="{'content-collapse':collapse}">
        <v-tags></v-tags>
        <div class="content" >
          <transition name="move" mode="out-in">
            <keep-alive :include="tagslist">
              <router-view></router-view>
            </keep-alive>
          </transition>
          <el-backtop target=".content"></el-backtop>
        </div>
      </div>
    </div>
</template>

<script>
  import bus from "./bus.js"
  import vHeader from "./Header.vue"
  import vTags from "./Tags.vue"
  import vSidebar from "./Sidebar.vue"
  export default {
    name: "home",
    data(){
      return {
        tagslist:[],
        collapse: false
      }
    },
    components:{
      vHeader,
      vSidebar,
      vTags
    },
    created () {
      // 监听sidebar的collapse-content事件
      bus.$on('collapse-content', msg => {
        this.collapse = msg;
      })
      bus.$on("tags", msg => {
        let arr = []
        for (let index in msg) {
          msg[index].name && arr.push(msg[index].name)
        }
        this.tagslist = arr
      })
    }
  }
</script>

<style scoped="scoped">
  .warp{
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  .content-box {
    /* background: #00A854; */
    position: absolute;
    left: 65px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
  .content-collapse {
    left: 145px;
  }

  .content {
    width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  

</style>

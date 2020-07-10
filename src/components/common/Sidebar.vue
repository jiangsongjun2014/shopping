<template>
  <!-- 教师 -->
  <div class="sidebar" >
    <el-menu :collapse="!collapse" :default-active="onRoutes" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="(item, index) in rotuer" >
        <el-menu-item :index="item.index" :key="item.index" >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from "./bus"
  export default {
    data(){
		return {
			collapse:false,
			// 用户信息
			userinfo: JSON.parse(localStorage.getItem("ms_userinfo")),
			// 教师路由
			rotuer: [
				{
					icon: 'el-icon-house',
					index: 'home',
					title: '系统首页'
				},
				{
					icon: 'el-icon-user',
					index: 'user',
					title: '用户管理'
				},
				{
					icon: 'el-icon-shopping-bag-2',
					index: 'product',
					title: '商品管理'
				},
				{
					icon: 'el-icon-s-goods',
					index: 'productcategory',
					title: '类别管理'
				},
				{
					icon: 'el-icon-s-goods',
					index: 'orderlist',
					title: '订单管理'
				}
			]
		}
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace("/", "")
      }
    },
    created() {
      // 监听header的collapse事件
      bus.$on("collapse", msg => {
        this.collapse = msg
        bus.$emit('collapse-content', msg)
      })
    }
  }
</script>

<style scoped="scoped">
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .sidebar > ul {
    height: 100%;
  }
</style>

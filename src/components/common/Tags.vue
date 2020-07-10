<template>
  <div class="tags" v-if="tagsList.length > 0">
    <ul>
      <li :class="{tagsitem:true,active: !isActive(item.path)}" v-for="(item, index) in tagsList" :key="index">
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}
        </router-link>
        <span class="tags-li-icon" @click="closeItem(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" size="small">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item divided command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import bus from "./bus"
  export default {
    data(){
      return {
        tagsList: []
      }
    },
    created(){
      // this.$route只有一项 为当前路由 即选中的高亮标签 所以刷新后只有高亮的标签
      this.setTags(this.$route)
    },
    watch:{
      // 监听当前路由改变
      $route (newValue, oldValue) {
        this.setTags(newValue)
      }
    },
    methods:{
      // 设置高亮
      isActive(path){
        return path === this.$route.fullPath
      },
      // 获取标签数组
      setTags(route){
        // item.path :标签数组中每一项的路径
        // this.$route.fullPath 当前点击标签的路径
        // 如果当前点击的标签路径与标签数组中路劲没有一个相同 isExist为flase 这时需要向标签数组新增标签
        // 如果当前点击的标签路径与标签数组中路劲有相同的一项  isExist为 true 这时不需要向标签数组新增数据
        const isExist = this.tagsList.some(item => {
          return item.path === this.$route.fullPath
        })
        if (!isExist) {
          // 标签大于等于8个向前删除一个 在增加新的标签
          if (this.tagsList.length >= 8) {
            this.tagsList.shift()
          }
          // console.log(route)
          this.tagsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.matched[1].components.default.name
          })
          // 将标签数组传给home
          bus.$emit("tags", this.tagsList)
        }
      },
      // 下拉选择关闭
      handleTags(command){
        return command === "other" ? this.closeOther() : this.closeAll()
      },
      // 关闭其他
      closeOther(){
        // routeItem是将标签数组每一项的标签路由与当前标签路由进行匹配  筛选出只有当前标签路由的数组
        const routeItem = this.tagsList.filter(item => {
          return item.path === this.$route.fullPath
        })
        this.tagsList = routeItem
      },
      // 关闭所有
      closeAll(){
        this.tagsList = []
        this.$router.push("/")
      },
      // 关闭当前
      closeItem(index){
        /*
          比如  数组是 [1,2,3,4,5] index是2
          delItem是3 执行delItem后
          数组 成为了 [1,2,4,5]
          这时索引依然是2  而数组是[1,2,4,5]  所以item是 4
        */

        // delItem 删除的当前项 经过delItem这里的数组已经删除当前项了
        const delItem = this.tagsList.splice(index, 1)[0]
        // 在执行item前 数组已经删除了当前项  这里的item不是当前项 是当前位置的项
        const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]

        //判断还有没有标签
        if (item) {
          // 删除高亮位高亮向前移动
          delItem.path === this.$route.fullPath && this.$router.push(item.path)
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .tags{
    width: 100%;
    height: 30px;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0 5px 10px #CCCCCC;
    display: flex;
  }
  .tags ul{
    flex: 1;
    height: 30px;
    display: flex;
    align-items: center;
  }
  .tagsitem{
    width: 86px;
    padding: 0 7px;
    height: 26px;
    margin: 2px;
    background: #409EFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 13px;
    position: relative;
  }
  .tags-li-icon{
    position: absolute;
    right: 2px;
    top: 5px;
  }
  .active{
    background: #FFFFFF;
    color: #666666;
    border: 1px solid #e9eaec;
  }
  .tags-li-title{
    color: #FFFFFF;
    margin-right: 5px;
    text-decoration: none;
  }
  .active > .tags-li-title{
    color: #666666;
  }
  .tags-box{
    width: 100px;
    height: 30px;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

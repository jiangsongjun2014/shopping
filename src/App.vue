<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.breadcrumb{
  padding: 10px;
}
.main{
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
}
.plugins-tips{
  padding: 20px 10px;
  margin-bottom: 20px;
  background: #EEF1F6;
}
.editorbtn{
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
/* 表格栏样式 */
.table-container {
  margin-top: 20px;
}
</style>

<template>
  <div class="cat-main-header">
    <h3 class="cat-title">{{$store.state.globalSettings.appName}}后台管理系统</h3>
    <div class="cat-right">
      当前用户：{{$store.state.adminName}}
      <zoom-logout title="退出" url="#/login"></zoom-logout>
      <!-- <el-button size="mini" @click="quit">退出</el-button> -->
    </div>
  </div>
</template>
<style lang="scss">
$header-height: 60px;
.cat-main-header {
  background: #dcdfe6;
  border-radius: 4px;
  line-height: $header-height;
  height: $header-height;
  padding: 0 6px;
  margin-bottom: 20px;
  .cat-title {
    color: #303133;
    float: left;
    margin: 0;
  }
  .cat-right {
    float: right;
  }
}
</style>


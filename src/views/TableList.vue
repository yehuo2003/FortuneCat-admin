<template>
  <div class="cat-table-list">
    <el-breadcrumb>
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10">
      <el-col v-for="(t,i) of tableList" :key="i" :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
        <cat-table :data="t"></cat-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Table from "../components/Table";
export default {
  data() {
    return {
      tableList: []
    };
  },
  components: {
    "cat-table": Table
  }
};
</script>

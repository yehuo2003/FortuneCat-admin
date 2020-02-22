<template>
  <div class="cat-table-add">
    <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
    <br>
    <zoom-card :border="true">
      <table-form></table-form>
    </zoom-card>
  </div>
</template>
<script>
import TableForm from '../components/TableForm';
export default {
  components: {
    TableForm
  },
  data() {
    return {
      breadcrumbOp: {
        data: [
          {id: 1, url: '#/main', title: '首页'},
          {id: 2, url: '#/table/list', title: '桌台管理'},
          {id: 3, title: '添加桌台'}
        ]
      },
      tableList: []
    };
  },
  mounted() {
  },
};
</script>
<style lang="scss">
.cat-table-add {
  .zoom-card {
    padding: 20px;
  }
}
</style>
<template>
  <div class="cat-dish-add">
    <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
    <br>
    <zoom-card :border="true">
      <dish-form></dish-form>
    </zoom-card>
  </div>
</template>
<script>
import DishForm from '../components/DishForm';
export default {
  components: {
    DishForm
  },
  data() {
    return {
      breadcrumbOp: {
        data: [
          {id: 1, url: '#/main', title: '首页'},
          {id: 2, url: '#/dish/list', title: '菜品管理'},
          {id: 3, title: '添加菜品'}
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
.cat-dish-add {
  .zoom-card {
    padding: 20px;
  }
}
</style>
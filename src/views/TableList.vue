<template>
  <div class="cat-table-list">
    <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
    <zoom-row>
      <zoom-col v-for="(t,i) of tableList" :key="i" xs="12" sm="8" md="6" lg="3" xl="2">
        <cat-table :data="t" @update="load"></cat-table>
      </zoom-col>
    </zoom-row>
  </div>
</template>
<script>
import Table from "../components/Table";
export default {
  components: {
    catTable: Table
  },
  data() {
    return {
      breadcrumbOp: {
        data: [
          {id: 1, url: '#/main', title: '首页'},
          {id: 2, title: '桌台管理'},
          {id: 3, title: '桌台列表'}
        ]
      },
      tableList: []
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      // 加载桌台列表
      let url = this.$store.state.globalSettings.apiUrl + "/admin/table";
      this.$axios
      .get(url)
      .then(({ data }) => {
        this.tableList = data;
      })
      .catch(err => {
        console.warn(err);
      });
    }
  }
};
</script>

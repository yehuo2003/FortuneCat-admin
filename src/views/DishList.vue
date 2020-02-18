<template>
  <div class="cat-dish-list">
    <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
    <br>
    <zoom-button type="primary" size="large">添加新的菜品类别</zoom-button>
    <hr>
    <zoom-grid ref="grid" :op="gridOp"></zoom-grid>
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
          {id: 2, title: '菜品管理'},
          {id: 3, title: '所有菜品'}
        ]
      },
      gridOp: {
        title: [
          {
            fieId: 'did',
            header: '编号'
          },
          {
            fieId: 'btns',
            header: '操作',
            btns: [
              {
                title: '修改',
                css: {
                  icon: 'icon-edit'
                },
                onClick: val => {
                  // this.updateCategory(val);
                }
              },
              {
                title: '关闭',
                css: {
                  icon: 'icon-close'
                },
                onClick: val => {
                  // this.deleteCategory(val);
                }
              }
            ]
          },
           {
            fieId: 'title',
            header: '菜品名称'
          },
          {
            fieId: 'price',
            header: '价格(¥)'
          },
          {
            fieId: 'categoryId',
            header: '菜品类别'
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$refs['grid'].showLoad(true);
      // 加载菜品列表
      let url = this.$store.state.globalSettings.apiUrl + "/admin/dish?curPage=1&pageSize=10&categoryId=";
      this.$axios
      .get(url)
      .then(({ data }) => {
        if (data && data.data && data.data.data && data.data.data instanceof Array) {
          let arr = this.$zoom.clone(data.data.data);
          arr.forEach(item => {
            // 格式化菜品类别名
            switch (item.categoryId) {
              case 5:
                item.categoryId = '菌菇类';
                break;
              case 4:
                item.categoryId = '蔬菜豆制品';
                break;
              case 3:
                item.categoryId = '丸滑类';
                break;
              case 2:
                item.categoryId = '海鲜河鲜';
                break;
              default:
                item.categoryId = '肉类';
                break;
            }
          });
          this.$refs['grid'].load(arr);
        }
        this.$refs['grid'].showLoad(false);
      })
      .catch(err => {
        console.warn(err);
      });
    }
  }
};
</script>
<style lang="scss">
.cat-dish-list {
  td[fieid="did"] {
    display: none;
  }
}
</style>
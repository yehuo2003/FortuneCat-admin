<template>
  <div class="cat-dish-list">
    <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
    <br>
    <zoom-button @click="toAdd" type="primary" size="large">添加新的菜品</zoom-button>
    <hr>
    <zoom-tabs :value="curTab" @tabChange="tabChange">
      <zoom-tab-item :index="0" label="所有菜品">
        <zoom-row>
          <zoom-col span="4">
            菜品类别　<zoom-dropdown v-model="category" :op="dropdownOp"></zoom-dropdown>
          </zoom-col>
          <zoom-col span="4">
            菜品名称　<zoom-input v-model.trim="dishName"></zoom-input>
          </zoom-col>
          <zoom-col span="2">
            <zoom-button @click="load" type="primary">搜索</zoom-button>
          </zoom-col>
        </zoom-row>
        <zoom-grid ref="grid" :op="gridOp"></zoom-grid>
        <zoom-pager ref="page" :op="pageOp"></zoom-pager>
      </zoom-tab-item>
      <zoom-tab-item v-show="showDetail" :index="1">
        <h5 slot="label">
          菜品详情
          <i @click.stop="close" class="zoom-icon icon-close-plus"></i>
        </h5>
        <dish-detail :list="categoryObj" @close="close"></dish-detail>
      </zoom-tab-item>
    </zoom-tabs>
  </div>
</template>
<script>
import dishDetail from "../components/DishDetail";
export default {
  components: {
    dishDetail
  },
  data() {
    return {
      categoryObj: {},  //  菜品id
      showDetail: false,  //  展示详情页
      category: '', //  菜品类别
      dishName: '', //  菜品名称
      curTab: 0, // 当前激活的tab索引
      pageVal: {
        total: 0,	// 总条数
        curPage: 1,	// 展示的当前页
        pageSize: 10	// 每页要展示多少条数据
      },
      dropdownOp: {
        placeHolder: '--请选择--',	//占位符
        // defalut: '5',			//默认选中的值, 写value
        readonly: true,		//是否禁止输入
        data: [						//下拉框数据, 键值对的方式, text是展示的文本
          {value: 1, text: '肉类'},
          {value: 2, text: '海鲜河鲜'},
          {value: 3, text: '丸滑类'},
          {value: 4, text: '蔬菜豆制品'},
          {value: 5, text: '菌菇类'}
        ],
      },
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
            fieId: '',
            header: '编号'
          },
          {
            fieId: 'btns',
            header: '操作',
            btns: [
              {
                title: '详情/编辑',
                css: {
                  icon: 'icon-order'
                },
                onClick: val => {
                  let url = `${this.$store.state.globalSettings.apiUrl}/admin/dish/${val.did}`;
                  this.$axios
                  .get(url)
                  .then(({data}) => {
                    this.categoryObj = data;
                    this.curTab = 1;
                    this.showDetail = true;
                  }).catch(err => console.warn(err));
                }
              },
              {
                title: '删除',
                css: {
                  icon: 'icon-ash-bin'
                },
                onClick: val => {
                  this.$zoom.popup({
                    title: '提示',
                    content: `确定要删除菜品${val.title}吗?`,
                    type: 'primary',
                    onClick: () => {
                      let url = `${this.$store.state.globalSettings.apiUrl}/admin/dish/${val.did}`;
                      this.$axios
                      .delete(url)
                      .then(({data}) => {
                        if (data.code === 200) {
                          this.$zoom.alert({
                            title: '提示',
                            content: `菜品${val.title}删除成功!`,
                            type: 'success'
                          })
                          this.load();
                        } else {
                          this.$zoom.alert({
                            title: '提示',
                            content: `菜品${val.title}删除失败! ${data.msg}`,
                            type: 'error'
                          })
                        }
                      }).catch(err => console.warn(err));
                    }
                  })
                  // this.deleteCategory(val);
                }
              }
            ]
          },
          {
            fieId: 'did',
            header: '菜品编号'
          },
          {
            fieId: 'title',
            header: '菜品名称'
          },
          {
            fieId: 'categoryId',
            header: '菜品类别'
          },
          {
            fieId: 'price',
            header: '价格(¥)'
          }
        ],
        data: []
      },
      pageOp: {
        pageSizes: [5, 10, 20],	// 可选择每页展示数量
        pageSizeSkip: (val, pageVal) => {
          this.pageVal.pageSize = val;	// 每页大小的下拉框数据发生改变事件
          this.load();
        },
        beforeSkip: (val, pageVal) => {
          console.log('要跳转到',val);	//跳转前事件
        },
        skip: (val, pageVal) => {
          this.pageVal.curPage = val;
          this.pageVal.pageSize = pageVal.pageSize;
          this.load();
          console.log('当前页是',val, pageVal);	//点击跳转触发获取当前页
        },
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    })
  },
  methods: {
    toAdd() {
      this.$router.push('/dish/add');
    },
    /**
     * 关闭详情页, 加载菜品
     */
    close(val) {
      this.curTab = 0;
      this.showDetail = false;
      this.tabChange(0);
      if (val) {
        this.$nextTick(() => {
          this.load();
        })
      }
    },
    tabChange(index) {
      this.curTab = index;
    },
    load() {
      this.$refs['grid'].showLoad(true);
      // 加载菜品列表
      let url = `${this.$store.state.globalSettings.apiUrl}/admin/dish?curPage=${this.pageVal.curPage}&pageSize=${this.pageVal.pageSize}&categoryId=${this.category}&title=${this.dishName}`
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
          this.pageVal = {
            total: data.data.total,	// 总条数
            curPage: data.data.curPage,	// 展示的当前页
            pageSize: data.data.pageSize	// 每页要展示多少条数据
          }
          this.$refs['grid'].load(arr);
          this.$refs['page'].load(this.pageVal);
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
  th[col="3"] {
    display: none;
  }
}
</style>
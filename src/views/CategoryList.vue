<template>
  <div class="cat-category-list">
    <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
    <!-- <el-breadcrumb>
      <el-breadcrumb-item>菜品类别管理</el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <br>
    <!-- <el-button @click="addCategory" type="primary">添加新的菜品类别</el-button> -->
    <zoom-button @click="addCategory" type="primary" size="large">添加新的菜品类别</zoom-button>
    <hr>
    <zoom-grid ref="grid" :op="gridOp"></zoom-grid>
    <zoom-dialog-box :title="title" :show="visibility" :op="dialogOp" width="500px" @close="close">
      <h4>{{content}}</h4>
      <br>
      <zoom-input ref="cname" v-model="cname"></zoom-input>
    </zoom-dialog-box>
    <!-- <el-table :data="categoryList" stripe border>
      <el-table-column prop="cid" label="编号"></el-table-column>
      <el-table-column prop="cname" label="名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row,$index}">
          <el-button @click="updateCategory(row,$index)" type="success" size="mini">修改</el-button>
          <el-button @click="deleteCategory(row,$index)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbOp: {
        data: [
          {id: 1, title: '菜品类别管理'},
          {id: 2, title: '全类别列表'}
        ]
      },
      cid: '',
      cname: '',
      title: '新增',
      content: '请输入新的菜品类别名：',
      visibility: false,
      dialogOp: {
        showBtn: true,
        onClick: () => {
          if (!this.cname) {
            this.$zoom.alert({
              title: '提示',
              content: '菜品类别名不能为空!',
              type: 'warning'
            })
            return;
          }
          // 根据title判断是新增还是修改
          if (this.title === '新增') {
            this.addCategory(this.title);
          } else {
            this.updateCategory(this.cid, this.title);
          }
        }
      },
      gridOp: {
        title: [
          // {
          //   fieId: 'cid',
          //   header: '编号'
          // },
          {
            fieId: 'btns',
            header: '操作',
            btns: [
              {
                title: '修改',
                css: {
                  icon: 'icon-modification'
                },
                onClick: val => {
                  this.updateCategory(val);
                }
              },
              {
                title: '删除',
                css: {
                  icon: 'icon-ash-bin'
                },
                onClick: val => {
                  this.deleteCategory(val);
                }
              }
            ]
          },
          {
            fieId: 'cname',
            header: '菜品类别名称'
          }
        ],
        data: []
      },
    };
  },
  methods: {
    // 关闭弹框组件
    close() {
      this.visibility = false;
      this.cname = this.cid = '';
      this.$refs['cname'].reset();
    },
    addCategory(value) {
      if (value) {
        let url = this.$store.state.globalSettings.apiUrl + "/admin/category";
        this.$axios.post(url, { cname: this.cname }).then(({data}) => {
          if (data.code === 200) {
            // 数据库添加成功
            this.$zoom.alert({
              title: '提示',
              content: '新的类别添加成功!',
              type: 'success'
            })
            this.close();
            this.loadData();
          } else {
            this.$zoom.alert({
              title: '提示',
              content: '新的类别添加出错：' + data.msg,
              type: 'error'
            })
          }
        })
      } else {
        this.title = '新增';
        this.content = '请输入新的菜品类别名：';
        this.visibility = true;
      }
    },
    updateCategory(c, value) {
      if (value) {
        let url = this.$store.state.globalSettings.apiUrl + "/admin/category";
        this.$axios
        .put(url, {cid: c.cid, cname: this.cname})
        .then(({data}) => {
          if (data.code === 200) {
            this.$zoom.alert({
              title: '提示',
              content: '修改类别成功!',
              type: 'success'
            });
            this.close();
            this.loadData();
          } else {
            this.$zoom.alert({
              title: '提示',
              content: '修改类别时出错：' + data.msg,
              type: 'error'
            });
          }
        })
        .catch(err => {
          console.warn(err);
        })
      } else {
        this.title = '修改';
        this.content = '请输入您想修改的类别名：';
        this.$refs['cname'].currentValue = this.cname = c.cname;
        this.visibility = true;
        this.cid = c;
      }
    },
    loadData() {
      this.$refs['grid'].showLoad(true);
      let url = this.$store.state.globalSettings.apiUrl + "/admin/category";
      this.$axios
      .get(url)
      .then(({data}) => {
        if (data) {
          this.$refs['grid'].load(data);
        }
        this.$refs['grid'].showLoad(false);
      })
      .catch(err => {
        console.warn(err);
      });
    },
    deleteCategory(c) {
      this.$zoom.popup({
        title: '提示',
        content: `您确认要删除${c.cname}吗？`,
        type: 'warning',
        onClick: () => {
          let url =
            this.$store.state.globalSettings.apiUrl +
            "/admin/category/" +
            c.cid;
          this.$axios
          .delete(url)
          .then(({data}) => {
            if (data.code == 200) {
              // 数据库中已经删除成功
              this.$zoom.alert({
                title: '提示',
                content: '菜品类别删除成功!',
                type: 'success'
              });
              this.loadData();
            } else {
              this.$zoom.alert({
                title: '提示',
                content: '类别删除出错!',
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.warn(err);
          });
        }
      })
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="scss">
.cat-category-list {
  th[fieid="cid"] {
    display: none;
  }
}
</style>

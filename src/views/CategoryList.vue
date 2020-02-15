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
      gridOp: {
        title: [
          {
            fieId: 'index',
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
                  this.updateCategory(val);
                }
              },
              {
                title: '关闭',
                css: {
                  icon: 'icon-close'
                },
                onClick: val => {
                  this.deleteCategory(val);
                }
              }
            ]
          },
          {
            fieId: 'cname',
            header: '菜品名称'
          }
        ],
        data: []
      },
      categoryList: []
    };
  },
  methods: {
    addCategory() {
      this.$prompt("请输入新的菜品类别名：", "提示", { type: "info" })
        .then(({ value }) => {
          debugger;
          // 获得用户的输入，调用数据API添加到数据库
          var url = this.$store.state.globalSettings.apiUrl + "/admin/category";
          this.$axios
            .post(url, { cname: value })
            .then(res => {
              debugger;
              if (res.data.code == 200) {
                // 数据库中添加成功
                this.$message.success("新的类别添加成功!");
                // 模型数据中添加新的类别
                this.categoryList.push({ cid: res.data.cid, cname: value });
              } else {
                this.$message.error("新的类别添加出错：" + res.data.msg);
              }
            })
            .catch(err => {
              console.warn(err);
            });
        })
        .catch(err => {
          console.warn(err);
        });
    },
    updateCategory(c, i) {
      this.$prompt("请输入您想修改的类别名：", "提示", {
        inputValue: c.cname
      })
        .then(({ value }) => {})
        .catch(err => {
          console.warn(err);
        });
    },
    deleteCategory(c, i) {
      this.$confirm("删除操作不可撤销！您确定吗？", "提示", { type: "warning" })
        .then(() => {
          var url =
            this.$store.state.globalSettings.apiUrl +
            "/admin/category/" +
            c.cid;
          this.$axios
            .delete(url)
            .then(res => {
              if (res.data.code == 200) {
                // 数据库中已经删除成功
                this.categoryList.splice(i, 1); //模型数据中删除
                this.$message.success("菜品类别删除成功");
              } else {
                this.$message.error("类别删除出错" + res.data.msg);
              }
            })
            .catch(err => {
              console.warn(err);
            });
        })
        .catch(err => {
          console.warn(err);
        });
    }
  },
  mounted() {
    this.$refs['grid'].showLoad(true);
    let url = this.$store.state.globalSettings.apiUrl + "/admin/category";
    this.$axios
      .get(url)
      .then(({data}) => {
        // this.categoryList = res.data;
        this.$refs['grid'].load(data);
        this.$refs['grid'].showLoad(false);
      })
      .catch(err => {
        console.warn(err);
      });
  }
};
</script>

<style lang="scss">
</style>

<template>
  <zoom-container>
    <zoom-tree-menu style="float: left; font-size: 14px;" :op="navOp"></zoom-tree-menu>
    <main style="width: 80%; float: right;">
        <!-- 顶部信息栏 -->
      <MainHeader></MainHeader>
      <!-- 主体部分 -->
      <zoom-container>
        <router-view></router-view>
      </zoom-container>
    </main>
  </zoom-container>
</template>

<script>
import MainHeader from "../components/MainHeader";
export default {
  components: {
    // 当前组件内部使用过的子组件列表
    MainHeader
  },
  data() {
    //数据属性
    return {
      navOp: {
        width: '18%',
        accordion: true,
        data: [
          {title: '全局设置', url: '#/settings'},
          {title: '桌台管理', url: '', children: [
            {title: '桌台列表', url: '#/table/list'},
            {title: '添加桌台', url: '#/table/add'}
          ]},
          {title: '菜品类别', url: '#/category/list'},
          {title: '菜品管理', url: '', children: [
            {title: '所有菜品', url: '#/dish/list'},
            {title: '添加菜品', url: '#/dish/add'},
            {title: '修改菜品', url: '#/dish/update'},
            {title: '删除菜品', url: '#/dish/delete'}
          ]},
          {title: '订单管理', url: '#/order/list'},
          {title: '安全管理', url: '#/security'},
        ]
      }
    };
  },
  // computed: {
  //   defaultActive() {
  //     // 用户当前访问哪页，就把对应菜单项设置为当前项
  //     return this.$route.path;
  //   },
  //   //计算属性 = 数据属性 + 操作方法
  //   defaultOpeneds() {
  //     if (this.$route.path.indexOf("/table") == 0) {
  //       // 用户当前在浏览/table/xx菜单项
  //       return ["table"];
  //     } else if (this.$route.path.indexOf("/dish") == 0) {
  //       return ["dish"];
  //     } else {
  //       return [];
  //     }
  //   }
  // },
  beforeCreate() {
    // 组件创建之前先要检查是否已经登录为管理员
    if (!this.$store.state.adminName) {
      // 未登录则跳转到登录页面
      this.$router.push("/login");
    }
  }
};
</script>


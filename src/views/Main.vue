<template>
  <div class="main">
    <el-container>
      <!-- 左侧的菜单栏 -->
      <el-aside width="200px">
        <el-menu
          :default-openeds="defaultOpeneds"
          :default-active="defaultActive"
          :unique-opened="true"
          :router="true"
        >
          <!-- 全局设置 -->
          <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">全局设置</span>
          </el-menu-item>
          <!-- 桌台选项 -->
          <el-submenu index="table">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>桌台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/table/list">桌台列表</el-menu-item>
              <el-menu-item index="/table/add">添加桌台</el-menu-item>
              <el-menu-item index="/table/delete">删除桌台</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--  菜品类别-->
          <el-menu-item index="/category/list">
            <i class="el-icon-message"></i>
            <span slot="title">菜品类别</span>
          </el-menu-item>
          <!-- 菜品管理 -->
          <el-submenu index="dish">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>菜品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dish/list">所有菜品</el-menu-item>
              <el-menu-item index="/dish/add">添加菜品</el-menu-item>
              <el-menu-item index="/dish/delete">删除菜品</el-menu-item>
              <el-menu-item index="/dish/update">修改菜品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 订单管理 -->
          <el-menu-item index="/order/list">
            <i class="el-icon-date"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <!-- 安全管理 -->
          <el-menu-item index="/security">
            <i class="el-icon-edit"></i>
            <span slot="title">安全管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部的信息栏 -->
        <el-header height="60px">
          <MainHeader></MainHeader>
        </el-header>
        <!-- 主体部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader";
export default {
  data() {
    //数据属性
    return {};
  },
  computed: {
    defaultActive() {
      // 用户当前访问哪页，就把对应菜单项设置为当前项
      return this.$route.path;
    },
    //计算属性 = 数据属性 + 操作方法
    defaultOpeneds() {
      if (this.$route.path.indexOf("/table") == 0) {
        // 用户当前在浏览/table/xx菜单项
        return ["table"];
      } else if (this.$route.path.indexOf("/dish") == 0) {
        return ["dish"];
      } else {
        return [];
      }
    }
  },
  beforeCreate() {
    // 组件创建之前先要检查是否已经登录为管理员
    if (!this.$store.state.adminName) {
      // 未登录则跳转到登录页面
      this.$router.push("/login");
    }
  },
  components: {
    // 当前组件内部使用过的子组件列表
    MainHeader
  }
};
</script>


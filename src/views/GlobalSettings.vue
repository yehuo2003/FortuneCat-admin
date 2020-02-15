<template>
  <div class="settings">
    <zoom-breadcrumb :op="breadcrumbOp"></zoom-breadcrumb>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全局设置</el-breadcrumb-item>
    </el-breadcrumb> -->
    <br>
    <zoom-card :border="true">
      <zoom-form label-width="120px">
        <zoom-form-item label="应用名称：">
          <zoom-input v-model="formData.appName" slot="content"></zoom-input>
        </zoom-form-item>
        <zoom-form-item label="应用API网址：">
          <zoom-input v-model="formData.apiUrl" slot="content"></zoom-input>
        </zoom-form-item>
        <zoom-form-item label="后台管理网址：">
          <zoom-input v-model="formData.adminUrl" slot="content"></zoom-input>
        </zoom-form-item>
        <zoom-form-item label="客户App网址：">
          <zoom-input v-model="formData.appUrl" slot="content"></zoom-input>
        </zoom-form-item>
        <zoom-form-item label="ICP备案号：">
          <zoom-input v-model="formData.icp" slot="content"></zoom-input>
        </zoom-form-item>
        <zoom-form-item label="版权声明：" slot="content">
          <zoom-input v-model="formData.copyright"></zoom-input>
        </zoom-form-item>
        <zoom-form-item>
          <div class="form-button" slot="content">
            <zoom-button size="medium" type="primary" @click="doSubmit">保存修改</zoom-button>
            <zoom-button size="medium" @click="doCancel">取消修改</zoom-button>
          </div>
        </zoom-form-item>
      </zoom-form>
    </zoom-card>
    <!-- <el-card shadow="never">
      <el-form label-width="110px">
        <el-form-item label="应用名称：">
          <el-input v-model="formData.appName"></el-input>
        </el-form-item>
        <el-form-item label="应用API网址：">
          <el-input v-model="formData.apiUrl"></el-input>
        </el-form-item>
        <el-form-item label="后台管理网址：">
          <el-input v-model="formData.adminUrl"></el-input>
        </el-form-item>
        <el-form-item label="客户App网址：">
          <el-input v-model="formData.appUrl"></el-input>
        </el-form-item>
        <el-form-item label="ICP备案号：">
          <el-input v-model="formData.icp"></el-input>
        </el-form-item>
        <el-form-item label="版权声明：">
          <el-input v-model="formData.copyright"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSubmit">保存修改</el-button>
          <el-button @click="doCancel">取消修改</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbOp: {
        data: [
          {id: 1, url: '#/main', title: '首页'},
          {id: 2, title: '全局设置'}
        ]
      },
      formData: {
        appName: "",
        apiUrl: "",
        adminUrl: "",
        appUrl: "",
        icp: "",
        copyright: ""
      }
    };
  },
  methods: {
    doCancel() {
      /**
       *  将$store存储中的全局配置数据赋值给变量formdata,方便表单元素执行双向数据绑定
       *  引用复制，两个变量指向同一个对象
       *  this.formData = this.$store.state.globalSettings;
       *  对象复制,创建出两个一样的对象
       */
      this.formData = this.$zoom.clone(this.$store.state.globalSettings)
    },
    doSubmit() {
      let url = this.$store.state.globalSettings.apiUrl + "/admin/settings";
      this.$axios
        .put(url, this.formData)
        .then(res => {
          if (res.data.code == 200) {
            this.$zoom.alert({
              title: '提示',
              content: '全局设置修改成功！',
              type: 'success'
            })
            // TODO：修改$store中的全局设置
          } else {
            this.$zoom.alert({
              title: '提示',
              content: '全局设置修改失败！',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.warn(err);
        });
    }
  },
  created() {
    this.doCancel();
  }
};
</script>
<style lang="scss">
.settings {
  .zoom-card {
    padding: 20px;
    .zoom-input {
      width: 80%;
    }
    .form-button {
      text-align: center;
      .zoom-btn {
        margin: 0 10px;
      }
    }
  }
}
</style>

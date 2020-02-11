<template>
  <div class="about">
    <el-card class="cat-login-card">
      <div slot="header">管理员登录</div>
      <div>
        <el-form label-width="100px">
          <el-form-item label="管理员名：">
            <el-input placeholder="请输入管理员名" v-model="formData.aname"></el-input>
          </el-form-item>

          <el-form-item label="登录密码：">
            <el-input placeholder="请输入管理员密码" type="password" v-model="formData.apwd"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doLogin">登录</el-button>
            <el-button @click="doCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //普通组件的模型数据是函数返回值
    return {
      formData: {
        //表单中用户输入的两个数据
        aname: "boss",
        apwd: "888888"
      }
    };
  },
  methods: {
    doLogin() {
      //执行登录
      var url =
        this.$store.state.globalSettings.apiUrl +
        `/admin/login/${this.formData.aname}/${this.formData.apwd}`;
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.code == 200) {
            // 登录成功
            // 把用户名存入Vuex仓库
            this.$store.commit("setAdminName", this.formData.aname);
            // 进行视图跳转
            this.$router.push("/main");
          } else {
            //登录失败
            this.$alert("用户名或密码有误！", "登录失败", { type: "error" })
              .then(() => {
                this.formData.apwd = "";
              })
              .catch(() => {
                this.formData.apwd = "";
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    doCancel() {
      //清除用户登录
      (this.formData.aname = ""), (this.formData.apwd = "");
    }
  }
};
</script>

<style lang="scss">
.cat-login-card {
  width: 400px;
  margin: 150px auto;

  .el-card__header {
    text-align: center;
    font-size: 1.2em;
  }
}
</style>
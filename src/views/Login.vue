<template>
  <div class="about">
    <zoom-card class="cat-login-card">
      <zoom-header>
        管理员登录
      </zoom-header>
      <zoom-container>
        <zoom-form submit.prevent="false" label-width="100">
          <zoom-form-item label="管理员名">
            <zoom-input placeholder="请输入管理员名" v-model="formData.aname"></zoom-input>
          </zoom-form-item>
          <zoom-form-item label="登录密码">
            <zoom-input :op="apwdOp" placeholder="请输入管理员密码" type="password" v-model="formData.apwd"></zoom-input>
          </zoom-form-item>
        </zoom-form>
        <zoom-footer>
          <zoom-button type="primary" @click="doLogin">登录</zoom-button>
          <zoom-button @click="doCancel">取消</zoom-button>
        </zoom-footer>
      </zoom-container>
    </zoom-card>
  </div>
</template>

<script>
export default {
  data() {
    //普通组件的模型数据是函数返回值
    return {
      apwdOp: {
        type: 'password',
        placeHolder: '请输入管理员密码'
      },
      formData: {
        //表单中用户输入的两个数据
        aname: "boss",
        apwd: "888888"
      }
    };
  },
  methods: {
    doLogin() {
      if (!this.formData.aname || !this.formData.apwd) {
        this.$zoom.alert({
          title: '警告',
          content: '用户名或密码不能为空!',
          type: 'warning'
        })
        return
      }
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
            this.$zoom.alert({
              title: '登录失败',
              content: '用户名或密码有误！',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.warn(err);
        });
    },
    doCancel() {
      //清除用户登录
      this.formData.aname = "";
      this.formData.apwd = "";
    }
  }
};
</script>

<style lang="scss">
.about {
  .cat-login-card {
    width: 400px;
    margin: 150px auto;
    .zoom-header {
      text-align: center;
      font-size: 1.2em;
    }
    .zoom-footer {
      text-align: center;
      font-size: 1.2em;
      .zoom-btn {
        margin: 0 10px;
      }
    }
  }
}
</style>
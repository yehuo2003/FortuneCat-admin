<template>
  <zoom-form submit.prevent="false" ref="form" class="cat-dish-form" label-width="100px">
    <zoom-form-item :require="true" label="菜品名称：">
      <zoom-input v-model="formData.title"></zoom-input>
    </zoom-form-item>
    <zoom-form-item :inline="true" :require="true" label="菜品类别：">
      <zoom-dropdown ref="dropdown" v-model="formData.categoryId" :op="dropdownOp"></zoom-dropdown>
    </zoom-form-item>
    <zoom-form-item :inline="true" :require="true" label="价格(¥)：">
      <zoom-numeric v-model="formData.price"></zoom-numeric>  元
    </zoom-form-item>
    <zoom-form-item :require="true" label="菜品图片：">
      <zoom-file-upload ref="upload" :op="uploadOp">
        <zoom-button>上传图片</zoom-button>
      </zoom-file-upload>
    </zoom-form-item>
    <zoom-form-item :require="true" label="菜品介绍：">
      <zoom-textarea v-model="formData.detail"></zoom-textarea>
    </zoom-form-item>
    <zoom-form-item>
      <div class="form-button">
        <span class="form-dish-add">
          <zoom-button @click="add" type="primary">添加</zoom-button>
          <zoom-button @click="quit">重置</zoom-button>
        </span>
      </div>
    </zoom-form-item>
  </zoom-form>
</template>
<script>
export default {
  data() {
    return {
      uploadOp: {
        notUpload: true,
        multiple: false,
        fileType: 'image/png',
        url: this.$store.state.globalSettings.apiUrl + '/dish/image',
        custom: true,
        onChange: (val) => {
          let inputFile = this.$refs['upload'].customUpload();
          let params = new FormData();
          // 向请求主体中追加要提交的数据
          params.append('description', 'test test');
          // 向请求主体中追加用户选中的文件
          params.append('dishImg', inputFile.files[0]);
          let uploadUrl = this.$store.state.globalSettings.apiUrl + '/dish/image';
          // 上传图片成功后, 把图片url地址返回
          this.$axios.post(uploadUrl, params).then(({data}) => {
            if (data.code === 200) {
              this.formData.imgUrl = data.fileName;
            } else {
              this.$zoom.alert({
                title: '警告',
                content: data.msg,
                type: 'warning'
              })
            }
          }).catch(err => {console.warn(err)});
        }
      },
      formData: {
        title: '',  //  菜单名称
        categoryId: '', //  类品id
        imgUrl: '', //  图片地址
        detail: '', //  详情介绍
        price: 0  //  价格
      },
      dropdownOp: { //  类型
        default: null,
        readonly: true,
        placeHolder: '--请选择--',	//占位符
        hideClose: true,			//是否隐藏清除按钮 默认false
        data: [						//下拉框数据, 键值对的方式, text是展示的文本
          {value: 1, text: '肉类'},
          {value: 2, text: '海鲜河鲜'},
          {value: 3, text: '丸滑类'},
          {value: 4, text: '蔬菜豆制品'},
          {value: 5, text: '菌菇类'}
        ],
      }
    };
  },
  methods: {
    // 验证
    testing() {
      if (!this.$refs['form'].valid()) {
        this.$zoom.alert({
          title: '警告',
          content: '请填写必填项! ',
          type: 'warning'
        })
        return false;
      } else {
        return true;
      }
    },
    // 添加
    add() {
      if (this.formData.price) {
        this.formData.price = Number(this.formData.price)
      }
      let params = this.$zoom.clone(this.formData)
      let url = this.$store.state.globalSettings.apiUrl + "/admin/dish";
      this.$axios
      .post(url, params)
      .then(({data}) => {
        console.log(data, 'data');
        if (data.code === 200) {
            this.$zoom.alert({
              title: '提示',
              content: data.dishId + '号菜品添加成功! ',
              type: 'success'
            });
            this.quit();
        } else {
            this.$zoom.alert({
              title: '提示',
              content: '菜品添加失败! ' + data.msg,
              type: 'error'
            })
        }
      }).catch(err => {console.warn(err)})
      // if (this.testing()) {
      //   let url = this.$store.state.globalSettings.apiUrl + "/admin/table";
      //   this.$axios
      //   .post(url, this.formData)
      //   .then(({ data }) => {
      //     if (data.code === 200) {
      //       this.$zoom.alert({
      //         title: '提示',
      //         content: data.tid + '号桌台添加成功! ',
      //         type: 'success'
      //       });
      //       this.quit();
      //     } else {
      //       this.$zoom.alert({
      //         title: '提示',
      //         content: '桌台添加失败! ' + data.msg,
      //         type: 'error'
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.warn(err);
      //   });
      // }
    },
    // 取消按钮
    quit() {
      this.$refs['form'].reset();
    }
  }
};
</script>
<style lang="scss">
.cat-dish-form {
  min-height: 200px;
  position: relative;
  .zoom-input,
  .zoom-textarea {
    display: inline-block;
    width: 70%;
  }
  .zoom-dropdown.zoom-input,
  .zoom-numeric.zoom-input {
    width: 50%;
  }
  .zoom-file-upload {
    display: inline-block;
  }
    .form-button {
      transform: translate(-50%, 0);
      text-align: center;
      position: absolute;
      left: 50%;
      bottom: 0;
      .zoom-btn {
        margin: 0 10px;
      }
    }
}
</style>
<template>
  <zoom-form submit.prevent="false" ref="form" class="cat-dish-detail-form" label-width="100px">
    <zoom-form-item :require="true" label="菜品名称：">
      <zoom-input ref="title" v-model="formData.title"></zoom-input>
    </zoom-form-item>
    <zoom-form-item :inline="true" :require="true" label="菜品类别：">
      <zoom-dropdown ref="dropdown" v-model="formData.categoryId" :op="dropdownOp"></zoom-dropdown>
    </zoom-form-item>
    <zoom-form-item :inline="true" :require="true" label="价格(¥)：">
      <zoom-numeric ref="price" v-model="formData.price"></zoom-numeric>  元
    </zoom-form-item>
    <zoom-form-item label="菜品图片：">
      <img :src=" 'http://127.0.0.1:8090/dish/' + list.imgUrl" :alt="list.title">
    </zoom-form-item>
    <zoom-form-item :require="true" label="菜品介绍：">
      <zoom-textarea ref="detail" v-model="formData.detail"></zoom-textarea>
    </zoom-form-item>
    <zoom-form-item>
      <div class="form-button">
        <span class="form-dish-detail-update">
          <zoom-button @click="update" type="primary">修改</zoom-button>
          <zoom-button @click="close">关闭</zoom-button>
        </span>
      </div>
    </zoom-form-item>
  </zoom-form>
</template>
<script>
export default {
  props: ['list'],
  data() {
    return {
      formData: {
        did: 0,
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
  watch: {
    list(newVal, oldVal) {
      this.load(newVal);
    }
  },
  mounted() {
    this.load(this.list);
  },
  methods: {
    load(data) {
      this.$refs['title'].currentValue = data.title;
      this.$refs['price'].currentValue = data.price;
      this.$refs['detail'].currentValue = data.detail;
      this.formData = data;
      console.log(data, 'data==');
    },
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
    // 修改
    update() {
      if (this.formData.price) {
        this.formData.price = Number(this.formData.price)
      }
      let params = this.$zoom.clone(this.formData)
      let url = this.$store.state.globalSettings.apiUrl + "/admin/dish";
      this.$axios
      .put(url, params)
      .then(({data}) => {
        console.log(data, 'data');
        if (data.code === 200) {
            this.$zoom.alert({
              title: '提示',
              content: params.did + '号菜品修改成功! ',
              type: 'success'
            });
            setTimeout(() => {
              this.$emit('close', true);
            }, 1000);
        } else {
            this.$zoom.alert({
              title: '提示',
              content: '菜品修改失败! ' + data.msg,
              type: 'error'
            })
        }
      }).catch(err => {console.warn(err)})
      // if (this.testing()) {
      //   let url = this.$store.state.globalSettings.apiUrl + "/admin/table";
      //   this.$axios
      //   .put(url, this.formData)
      //   .then(({ data }) => {
      //     if (data.code === 200) {
      //       this.$zoom.alert({
      //         title: '提示',
      //         content: this.formData.tid + '号桌台修改成功! ',
      //         type: 'success'
      //       });
      //       // 修改成功, 通知父组件
      //       this.$emit('update');
      //     } else {
      //       this.$zoom.alert({
      //         title: '提示',
      //         content: '桌台修改失败! ' + data.msg,
      //         type: 'error'
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.warn(err);
      //   });
      // }
    },
    // 关闭按钮
    close() {
      this.$emit('close');
      // this.$refs['form'].reset();
    }
  }
};
</script>
<style lang="scss">
.cat-dish-detail-form {
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
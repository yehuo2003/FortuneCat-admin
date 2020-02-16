<template>
  <zoom-form ref="form" class="cat-table-form" label-width="80px">
    <zoom-form-item :require="true" label="桌名：">
      <zoom-input v-model="formData.tname" slot="content"></zoom-input>
    </zoom-form-item>
    <zoom-form-item :require="true" label="类型：">
      <zoom-dropdown ref="dropdown" v-model="formData.type" :op="dropdownOp" slot="content"></zoom-dropdown>
    </zoom-form-item>
    <zoom-form-item :require="true" label="状态：">
      <zoom-radio ref="radio" v-model="formData.status" :op="radioOp" slot="content"></zoom-radio>
    </zoom-form-item>
    <zoom-form-item>
      <div class="form-button" slot="content">
        <span v-if="isAdd" class="form-table-add">
          <zoom-button @click="add" type="primary">添加</zoom-button>
          <zoom-button @click="quit">重置</zoom-button>
        </span>
        <span v-else class="form-table-update">
          <zoom-button @click="update" size="mini" type="primary">修改</zoom-button>
          <zoom-button @click="quit" size="mini">取消</zoom-button>
        </span>
      </div>
    </zoom-form-item>
  </zoom-form>
</template>
<script>
export default {
  props: ['tableData'],
  data() {
    return {
      isAdd: true,
      formData: {
        tname: '',
        type: '',
        status: 1
      },
      dropdownOp: { //  类型
        default: null,
        readonly: true,
        placeHolder: '--请选择--',	//占位符
        hideClose: true,			//是否隐藏清除按钮 默认false
        data: [						//下拉框数据, 键值对的方式, text是展示的文本
          {value: '2人桌', text: '2人桌'},
          {value: '4人桌', text: '4人桌'},
          {value: '6人桌', text: '6人桌'},
          {value: '8人桌', text: '8人桌'},
          {value: '10人桌', text: '10人桌'},
          {value: '12人桌', text: '12人桌'}
        ],
      },
      radioOp: {  //  状态
        name: 'status',
        data: []
      },
    };
  },
  created() {
    if (this.tableData) {
      this.isAdd = false;
      this.formData = this.$zoom.clone(this.tableData);
      this.dropdownOp.default = this.formData.type;
    } else {
      this.isAdd = true;
    }
  },
  mounted() {
    let radioList = [
      {text: '空闲', value: 1},
      {text: '预定', value: 2},
      {text: '占用', value: 3},
      {text: '其它', value: 4}
    ]
    // 设置状态值
    radioList.forEach(item => {
      if (item.value === this.formData.status) {
        item.checked = true;
      }
    })
    this.$refs['radio'].load(radioList);
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
      if (this.testing()) {
        let url = this.$store.state.globalSettings.apiUrl + "/admin/table";
        this.$axios
        .post(url, this.formData)
        .then(({ data }) => {
          if (data.code === 200) {
            this.$zoom.alert({
              title: '提示',
              content: data.tid + '号桌台添加成功! ',
              type: 'success'
            });
            this.quit();
          } else {
            this.$zoom.alert({
              title: '提示',
              content: '桌台添加失败! ' + data.msg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.warn(err);
        });
      }
    },
    // 修改
    update() {
      if (this.testing()) {
        let url = this.$store.state.globalSettings.apiUrl + "/admin/table";
        this.$axios
        .put(url, this.formData)
        .then(({ data }) => {
          if (data.code === 200) {
            this.$zoom.alert({
              title: '提示',
              content: this.formData.tid + '号桌台修改成功! ',
              type: 'success'
            });
            // 修改成功, 通知父组件
            this.$emit('update');
          } else {
            this.$zoom.alert({
              title: '提示',
              content: '桌台修改失败! ' + data.msg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.warn(err);
        });
      }
    },
    // 取消按钮
    quit() {
      this.$refs['form'].reset();
      let radioList = [
        {text: '空闲', value: 1, checked: true},
        {text: '预定', value: 2},
        {text: '占用', value: 3},
        {text: '其它', value: 4}
      ];
      this.$refs['radio'].load(radioList);
      this.$emit('close');
    }
  }
};
</script>
<style lang="scss">
.cat-table-form {
  min-height: 200px;
  position: relative;
  .zoom-input {
      width: 70%;
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
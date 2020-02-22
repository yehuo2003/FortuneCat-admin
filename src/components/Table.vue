<template>
  <div class="cat-table-info">
    <!-- <el-card shadow="hover">
      <div
        class="cat-table"
        :style="{background:getTableColor(data.status)}"
      >{{data.tid}}号桌：{{data.status | tableStatus}}</div>
      <el-button type="success" plain size="mini" @click="showTableDetail">详情</el-button>
      <el-button type="danger" plain size="mini">修改</el-button>
    </el-card> -->

    <zoom-card hover-shadow="true">
      <div
        class="cat-table"
        :style="{background:getTableColor(data.status)}"
      >{{data.tid}}号桌：{{data.status | tableStatus}}</div>
      <zoom-button type="success" shape="plain" size="mini" @click="showTableDetail">详情</zoom-button>
      <zoom-button type="warning" shape="plain" size="mini" @click="updateTable(1)">修改</zoom-button>
      <zoom-button type="danger" shape="plain" size="mini" @click="deleteTable">删除</zoom-button>
    </zoom-card>

    <!-- 桌台详情对话框 -->
    <!-- <el-dialog
      :title="data.tid + '号桌台详情'"
      :visible="dialogTableDetailVisible"
      :before-close="closeDialogTableDetail"
    > -->
    <zoom-dialog-box :op="dialogOp" :title=" data.tid + '号桌台详情' " :show="dialogTableDetailVisible" @close="closeDialogTableDetail">
      <zoom-tabs :value="curTab" @tabChange="tabChange">
        <zoom-tab-item :index="0" :label="'详情'">
          <h3>桌名：{{data.tname}}</h3>
          <h3>状态：{{data.status | tableStatus}}</h3>
          <!-- <img :src="qrcodeData"> -->
          <img :src="qrcodeData">
        </zoom-tab-item>
        <zoom-tab-item :index="1" :label="'修改'">
          <table-form :tableData="data" @update="updateMsg" @close="closeDialogTableDetail"></table-form>
        </zoom-tab-item>
      </zoom-tabs>
      <!-- 对话主体 -->
      <!-- <el-tabs type="border-card" @tab-click="makeQRCode">
        <el-tab-pane label="桌台状态">桌台状态：{{data.status | tableStatus}}</el-tab-pane>
        <el-tab-pane label="桌台二维码">
          <img :src="qrcodeData">
        </el-tab-pane>
      </el-tabs>
      <div style="text-align: right; margin-top: 20px;">
        <zoom-button type="primary" @click="dialogTableDetailVisible=false">确定</zoom-button>
      </div> -->
    </zoom-dialog-box>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import TableForm from './TableForm';
export default {
  components: {
    TableForm
  },
  props: ["data"],
  data() {
    return {
      curTab: 0, // 当前激活的tab索引
      dialogOp: {
        showBtn: false
      },
      dialogTableDetailVisible: false,
      qrcodeData: "" //Base64编码字符串
    };
  },
  methods: {
    tabChange(index) {
      this.curTab = index;
    },
    makeQRCode() {
      // 创建二维码——此方法不能在当前组件的mouted中调用，因为对话在组件加载时并不在DOM树上
      var qrcode = require("qrcode");
      // 每个桌子对应的URL形如：
      // http://127.0.0.1:8092/#/3
      var tableUrl =
        this.$store.state.globalSettings.appUrl + "/#/" + this.data.tid;
      // 把绘制得到的图片二进制数据转换为Base64编码字符串
      qrcode.toDataURL(
        tableUrl,
        { width: 350, errorCorrectionLevel: "H" },
        (err, url) => {
          // console.log("二维码url");
          // console.log(url);
          this.qrcodeData = url;
        }
      );
    },
    updateMsg() {
      this.$emit('update');
      this.closeDialogTableDetail();
    },
    closeDialogTableDetail() {
      this.dialogTableDetailVisible = false;
      this.qrcodeData = '';
    },
    getTableColor(status) {
      switch (status) {
        case 1:
          return "#67C23A";
        case 2:
          return "#E6A23C";
        case 3:
          return "#E56C6C";
        default:
          return "#909399";
      }
    },
    // 删除
    deleteTable() {
      this.$zoom.popup({
        title: '提示',
        content: `确定要删除${this.data.tid}号桌台吗? `,
        type: 'warning',
        onClick: () => {
          let url = this.$store.state.globalSettings.apiUrl + "/admin/table/" + this.data.tid;
          this.$axios
          .delete(url)
          .then(({ data }) => {
            if (data.code === 200) {
              this.$zoom.alert({
                title: '提示',
                content: this.data.tid + '号桌台删除成功! ',
                type: 'success'
              });
              // 删除成功通知父组件刷新
              this.updateMsg();
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
      })
    },
    // 修改
    updateTable() {
      this.curTab = 0;
      setTimeout(() => {
        this.curTab = 1;
        this.showTableDetail(1);
      });
    },
    // 查看详情
    showTableDetail(status) {
      this.curTab = 1;
      this.makeQRCode();
      this.dialogTableDetailVisible = true;
      if (!status) {
        setTimeout(() => {
          // 直接加载图片出不来
          this.curTab = 0;
        })
      }
    }
  }
};
</script>
<style lang="scss">
.cat-table-info {
  padding: 3px;
  text-align: center;
  .cat-table {
    width: 90%;
    height: 120px;
    line-height: 120px;
    border: 1px solid #aaa;
    border-radius: 50%;
    box-shadow: 3px 4px 5px #666;
    margin: 5px auto;
  }
  .zoom-btn {
    margin: 5px;
  }
}
</style>

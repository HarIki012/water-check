"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "projectdetail",
  props: {
    projectData: Object
  },
  data() {
    return {
      it: [
        {
          id: 1,
          projectName: "南湖水环境提升工程",
          type: "安全",
          severity: "较严重",
          description: "问题描述略1",
          detail: "详细描述略",
          photoUrl: "",
          //放图片
          rectify: "整改要求略"
        }
      ],
      severityChoose: ["无", "一般", "较严重", "严重", "非常严重"],
      severityselectIndex: "0",
      severityselectName: "无"
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.severityselectName = this.projectData.severity;
    },
    severitySelect(e) {
      this.severityselectIndex = e.detail.value;
      this.severityselectName = this.severityChoose[this.severityselectIndex];
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.projectData.description),
    b: common_vendor.t($data.severityselectName),
    c: common_vendor.o((...args) => $options.severitySelect && $options.severitySelect(...args)),
    d: $data.severityChoose,
    e: $props.projectData.detail,
    f: common_vendor.o(($event) => $props.projectData.detail = $event.detail.value),
    g: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片"
    }),
    h: $props.projectData.rectify,
    i: common_vendor.o(($event) => $props.projectData.rectify = $event.detail.value)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/water-check-project/components/projectdetail/projectdetail.vue"]]);
wx.createComponent(Component);

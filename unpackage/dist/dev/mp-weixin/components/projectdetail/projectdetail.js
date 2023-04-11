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
      severityselectName: "无",
      typeChoose: ["质量", "安全", "文明施工"],
      typeIndex: "0",
      typeName: "质量",
      newRule: ""
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    hello() {
      console.log("hello");
    },
    initData() {
      this.severityselectName = this.projectData.severity;
      this.typeName = this.projectData.type;
    },
    severitySelect(e) {
      this.severityselectIndex = e.detail.value;
      this.severityselectName = this.severityChoose[this.severityselectIndex];
      this.projectData.severity = this.severityselectName;
      this.$emit("sendData", this.projectData);
    },
    typeSelect(e) {
      this.typeIndex = e.detail.value;
      this.typeName = this.typeChoose[this.typeIndex];
      this.projectData.type = this.typeName;
      this.$emit("sendData", this.projectData);
    },
    projectChange() {
      this.$emit("sendData", this.projectData);
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
  return common_vendor.e({
    a: $props.projectData.projectName !== "自定义"
  }, $props.projectData.projectName !== "自定义" ? {
    b: common_vendor.t($props.projectData.description)
  } : {}, {
    c: $props.projectData.projectName === "自定义"
  }, $props.projectData.projectName === "自定义" ? {
    d: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    e: $props.projectData.description,
    f: common_vendor.o(($event) => $props.projectData.description = $event.detail.value)
  } : {}, {
    g: $props.projectData.projectName === "自定义"
  }, $props.projectData.projectName === "自定义" ? {
    h: common_vendor.t($data.typeName),
    i: common_vendor.o((...args) => $options.typeSelect && $options.typeSelect(...args)),
    j: $data.typeChoose
  } : {}, {
    k: $props.projectData.projectName !== "自定义"
  }, $props.projectData.projectName !== "自定义" ? {} : {}, {
    l: $props.projectData.projectName === "自定义"
  }, $props.projectData.projectName === "自定义" ? {
    m: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    n: $data.newRule,
    o: common_vendor.o(($event) => $data.newRule = $event.detail.value)
  } : {}, {
    p: common_vendor.t($data.severityselectName),
    q: common_vendor.o((...args) => $options.severitySelect && $options.severitySelect(...args)),
    r: $data.severityChoose,
    s: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    t: $props.projectData.detail,
    v: common_vendor.o(($event) => $props.projectData.detail = $event.detail.value),
    w: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片"
    }),
    x: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    y: $props.projectData.rectify,
    z: common_vendor.o(($event) => $props.projectData.rectify = $event.detail.value)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/water-check-project/components/projectdetail/projectdetail.vue"]]);
wx.createComponent(Component);

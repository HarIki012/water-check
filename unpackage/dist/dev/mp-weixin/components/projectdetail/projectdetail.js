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
      testPicurl: [{}],
      severityChoose: ["无", "一般", "较严重", "严重", "非常严重"],
      severityselectIndex: "0",
      severityselectName: "无",
      typeChoose: ["质量", "安全", "文明施工"],
      typeIndex: "0",
      typeName: "质量",
      newRule: "",
      uploadData: "",
      from: 0,
      //跳转页面确定,
      samePic: "no",
      deleteId: ""
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    picTest(e) {
      console.log(e);
      common_vendor.index.uploadFile({
        url: "https://zsjs.huaskj.com/weps-api/upload_files",
        //仅为示例，非真实的接口地址
        filePath: e.tempFilePaths[0],
        name: "files",
        formData: {
          "dirName": "水务/"
        },
        success: (uploadFileRes) => {
          let json_data = JSON.parse(uploadFileRes.data);
          console.log(json_data.data[0]);
          this.uploadData = "https://server-1315831071.cos.ap-nanjing.myqcloud.com/" + json_data.data[0];
          console.log(this.uploadData);
          this.projectData.photoUrl.push(
            json_data.data[0]
          );
          console.log(this.projectData.photoUrl);
          this.$emit("sendData", this.projectData);
        }
      });
    },
    hello() {
      console.log("hello");
    },
    initData() {
      this.severityselectName = this.projectData.severity;
      this.typeName = this.projectData.type;
      console.log(this.projectData.photoUrl.length);
      if (this.projectData.photoUrl.length === 0) {
        this.testPicurl = null;
      }
      if (this.projectData.photoUrl.length !== 0) {
        for (var i = 0; i < this.projectData.photoUrl.length; i++) {
          console.log(i);
          this.testPicurl[i] = {
            name: this.projectData.photoUrl[i],
            extname: this.filterImgType(this.projectData.photoUrl[i]),
            url: "https://server-1315831071.cos.ap-nanjing.myqcloud.com/" + this.projectData.photoUrl[i]
          };
        }
      }
      console.log(this.testPicurl);
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
      console.log(this.testPicurl);
      this.$emit("sendData", this.projectData);
    },
    uploadPic() {
    },
    deleteFile(e) {
      var sameSum = 0;
      for (var i = 0; i < this.testPicurl.length; i++) {
        if (this.testPicurl[i].url === e.tempFilePath) {
          this.deleteId = i;
          sameSum = sameSum + 1;
        }
      }
      if (sameSum >= 2) {
        this.projectData.photoUrl.splice(this.deleteId, 1);
        console.log(this.projectData.photoUrl);
      } else {
        this.projectData.photoUrl.splice(this.deleteId, 1);
        console.log(this.projectData.photoUrl);
        let result = e.tempFilePath.slice(57);
        console.log(result);
        this.$emit("deleteId", result);
      }
    },
    filterImgType(img) {
      if (/png/g.test(img)) {
        return "png";
      } else if (/jpg/g.test(img)) {
        return "jpg";
      } else if (/gif/g.test(img)) {
        return "gif";
      } else if (/jpeg/g.test(img)) {
        return "jpeg";
      }
    },
    navigateToDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/project/detail/detail?from=" + this.from
      });
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
  }, $props.projectData.projectName !== "自定义" ? {
    l: common_vendor.o(($event) => $options.navigateToDetail())
  } : {}, {
    m: $props.projectData.projectName === "自定义"
  }, $props.projectData.projectName === "自定义" ? {
    n: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    o: $props.projectData.terms,
    p: common_vendor.o(($event) => $props.projectData.terms = $event.detail.value)
  } : {}, {
    q: common_vendor.t($data.severityselectName),
    r: common_vendor.o((...args) => $options.severitySelect && $options.severitySelect(...args)),
    s: $data.severityChoose,
    t: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    v: $props.projectData.detail,
    w: common_vendor.o(($event) => $props.projectData.detail = $event.detail.value),
    x: $data.testPicurl !== null
  }, $data.testPicurl !== null ? {
    y: common_vendor.o($options.picTest),
    z: common_vendor.o($options.deleteFile),
    A: common_vendor.o(($event) => $data.testPicurl = $event),
    B: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片",
      modelValue: $data.testPicurl
    })
  } : {
    C: common_vendor.o($options.picTest),
    D: common_vendor.o($options.deleteFile),
    E: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片"
    })
  }, {
    F: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    G: $props.projectData.rectify,
    H: common_vendor.o(($event) => $props.projectData.rectify = $event.detail.value)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/water-check-project/components/projectdetail/projectdetail.vue"]]);
wx.createComponent(Component);

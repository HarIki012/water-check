"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "projectdetail",
  props: {
    projectData: Object,
    status: String
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
      testPicurl: [],
      realurl: [],
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
      deleteId: "",
      fontNumDescription: 0,
      fontNumDetail: 0,
      fontNumRectify: 0,
      voiceResultDescription: "",
      voiceResultDetail: "",
      voiceResultRectify: "",
      picLength: "",
      allow: "",
      mico: [0, 0, 0]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    sumFontNumDescription(e) {
      this.fontNumDescription = e.detail.value.length;
      this.voiceResultDescription = e.detail.value;
    },
    sumFontNumDetail(e) {
      this.fontNumDetail = e.detail.value.length;
      this.voiceResultDetail = e.detail.value;
    },
    sumFontNumRectify(e) {
      this.fontNumRectify = e.detail.value.length;
      this.voiceResultRectify = e.detail.value;
    },
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
      console.log("状态:" + this.status);
      if (this.status === "未检查" || this.status === "进行中") {
        this.allow = false;
      } else {
        this.allow = true;
      }
      console.log(this.allow);
      this.severityselectName = this.projectData.severity;
      this.typeName = this.projectData.type;
      console.log(this.projectData.photoUrl.length);
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
      this.realurl = this.testPicurl;
      this.picLength = this.testPicurl.length;
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
      if (this.projectData.description === "") {
        common_vendor.index.showToast({
          title: "问题描述不能为空！",
          icon: "none",
          duration: 2e3
        });
      }
      if (this.projectData.rectify === "") {
        common_vendor.index.showToast({
          title: "整改要求不能为空！",
          icon: "none",
          duration: 2e3
        });
      }
      if (this.projectData.description !== "" && this.projectData.rectify !== "") {
        this.$emit("sendData", this.projectData);
      }
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
      this.picLength = this.picLength - 1;
      if (this.picLength === 1) {
        var tran = [];
        this.realurl = tran;
        this.realurl = [{
          name: this.projectData.photoUrl[0],
          extname: this.filterImgType(this.projectData.photoUrl[0]),
          url: "https://server-1315831071.cos.ap-nanjing.myqcloud.com/" + this.projectData.photoUrl[0]
        }];
        console.log(this.realurl);
        this.picLength = this.realurl.length;
      }
      console.log(this.picLength);
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
    // //语音识别功能
    // touchStartQuestion: function() {   
    // 	manager.start({  
    // 		duration: 60000,  
    // 		lang: "zh_CN"  
    // 	});
    // 	this.mico[0] = 1
    // },  
    // touchEndQuestion: function() {  
    // 	uni.showToast()  
    // 	manager.stop();
    // 	this.mico[0] = 1
    // },
    //   //语音识别功能
    //   touchStartDetail: function() {   
    //   	manager.start({  
    //   		duration: 60000,  
    //   		lang: "zh_CN"  
    //   	});  
    // 	this.mico[1] = 1
    //   },  
    //   touchEndDetail: function() {  
    //   	uni.showToast()  
    //   	manager.stop();  
    // 	this.mico[1] = 1
    //   },
    //   //语音识别功能
    //   touchStartRectify: function() {   
    //   	manager.start({  
    //   		duration: 60000,  
    //   		lang: "zh_CN"  
    //   	});  
    // 	this.mico[2] = 1
    //   },  
    //   touchEndRectify: function() {  
    //   	uni.showToast()  
    //   	manager.stop();  
    // 	this.mico[2] = 1
    //   },
    // /**  
    //  * 初始化语音识别回调  
    //  * 绑定语音播放开始事件  
    //  */  
    // initRecord: function() {  
    // 	manager.onStart = function(res) {  
    // 		this.voiceState ="onStart:"+ res.msg+"正在录音"  
    // 	};  
    // 	//有新的识别内容返回，则会调用此事件  
    // 	manager.onRecognize = (res) => {  
    // 		for(var i = 0; i<3;i++){
    // 			if(i == 0 && this.mico[i] == 1){
    // 				this.projectData.description = res.result
    // 			}else if(i == 1 && this.mico[i] == 1){
    // 				this.projectData.detail = res.result
    // 			}else if(i == 2 && this.mico[i] == 1){
    // 				this.projectData.rectify = res.result
    // 			}
    // 		}
    // 	}  
    // 	// 识别结束事件  
    // 	manager.onStop = (res) => {  
    // 		this.voiceState = res.result;  
    // 	}  
    // 	// 识别错误事件  
    // 	manager.onError = (res) => {  
    // 		this.voiceState = res.msg;  
    // 	}  
    // },
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
    a: $props.projectData.basis.typeOne !== "自定义"
  }, $props.projectData.basis.typeOne !== "自定义" ? {
    b: common_vendor.t($props.projectData.description)
  } : {}, {
    c: $props.projectData.basis.typeOne === "自定义"
  }, $props.projectData.basis.typeOne === "自定义" ? {
    d: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    e: common_vendor.o([($event) => $props.projectData.description = $event.detail.value, (...args) => $options.sumFontNumDescription && $options.sumFontNumDescription(...args)]),
    f: $data.allow,
    g: $props.projectData.description
  } : {}, {
    h: $props.projectData.basis.typeOne === "自定义"
  }, $props.projectData.basis.typeOne === "自定义" ? {
    i: common_vendor.o((...args) => _ctx.touchStartQuestion && _ctx.touchStartQuestion(...args)),
    j: common_vendor.o((...args) => _ctx.touchEndQuestion && _ctx.touchEndQuestion(...args))
  } : {}, {
    k: $props.projectData.basis.typeOne === "自定义"
  }, $props.projectData.basis.typeOne === "自定义" ? {
    l: common_vendor.t($data.fontNumDescription)
  } : {}, {
    m: $props.projectData.basis.typeOne === "自定义"
  }, $props.projectData.basis.typeOne === "自定义" ? {
    n: common_vendor.t($data.typeName),
    o: common_vendor.o((...args) => $options.typeSelect && $options.typeSelect(...args)),
    p: $data.typeChoose,
    q: $data.allow
  } : {}, {
    r: $props.projectData.basis.typeOne !== "自定义"
  }, $props.projectData.basis.typeOne !== "自定义" ? {
    s: common_vendor.o(($event) => $options.navigateToDetail())
  } : {}, {
    t: $props.projectData.basis.typeOne === "自定义"
  }, $props.projectData.basis.typeOne === "自定义" ? {
    v: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    w: $data.allow,
    x: $props.projectData.terms,
    y: common_vendor.o(($event) => $props.projectData.terms = $event.detail.value)
  } : {}, {
    z: common_vendor.t($data.severityselectName),
    A: common_vendor.o((...args) => $options.severitySelect && $options.severitySelect(...args)),
    B: $data.severityChoose,
    C: $data.allow,
    D: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    E: common_vendor.o([($event) => $props.projectData.detail = $event.detail.value, (...args) => $options.sumFontNumDetail && $options.sumFontNumDetail(...args)]),
    F: $data.allow,
    G: $props.projectData.detail,
    H: common_vendor.o((...args) => _ctx.touchStartDetail && _ctx.touchStartDetail(...args)),
    I: common_vendor.o((...args) => _ctx.touchEndDetail && _ctx.touchEndDetail(...args)),
    J: $data.allow,
    K: common_vendor.t($data.fontNumDetail),
    L: $data.picLength >= 2
  }, $data.picLength >= 2 ? {
    M: common_vendor.o($options.picTest),
    N: common_vendor.o($options.deleteFile),
    O: common_vendor.o(($event) => $data.realurl = $event),
    P: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片",
      readonly: $data.allow,
      modelValue: $data.realurl
    })
  } : $data.picLength === 1 ? {
    R: common_vendor.o($options.picTest),
    S: common_vendor.o($options.deleteFile),
    T: common_vendor.o(($event) => $data.realurl = $event),
    U: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片",
      ["del-icon"]: false,
      readonly: $data.allow,
      modelValue: $data.realurl
    })
  } : {
    V: common_vendor.o($options.picTest),
    W: common_vendor.o($options.deleteFile),
    X: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片",
      readonly: $data.allow
    })
  }, {
    Q: $data.picLength === 1,
    Y: common_vendor.o((...args) => $options.projectChange && $options.projectChange(...args)),
    Z: common_vendor.o([($event) => $props.projectData.rectify = $event.detail.value, (...args) => $options.sumFontNumRectify && $options.sumFontNumRectify(...args)]),
    aa: $data.allow,
    ab: $props.projectData.rectify,
    ac: common_vendor.o((...args) => _ctx.touchStartRectify && _ctx.touchStartRectify(...args)),
    ad: common_vendor.o((...args) => _ctx.touchEndRectify && _ctx.touchEndRectify(...args)),
    ae: $data.allow,
    af: common_vendor.t($data.fontNumRectify)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/water-check-project/components/projectdetail/projectdetail.vue"]]);
wx.createComponent(Component);

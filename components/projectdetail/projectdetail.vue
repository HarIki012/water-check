<template name="projectdetail">
	<view>
		<view style="height: 20rpx;text-align: center;border: 1rpx solid darkgray;font-size: 20rpx;padding-top: 0rpx;">
			<text>···</text>
		</view>
		<view class="text">
			<text style="margin-bottom: 20rpx;">问题描述</text>
			<text v-if="isSelf !== 'yes'" style="font-size: 33rpx;">{{projectData.description}}</text>
			<textarea v-if="isSelf === 'yes'" class="detailStyle" style="padding-left: 20rpx;" type="text" :value="projectData.description" placeholder="请输入详情描述..." @blur="projectChange" @input="sumFontNumDescription" :disabled="allow"></textarea>
		<view class="fontInput">
			<button  v-if="isSelf === 'yes'" class="voice-text iconfont iconfontmico icon-maikefeng" @touchstart="touchStartQuestion" @touchend="touchEndQuestion" :disabled="allow"></button>
			<text v-if="isSelf === 'yes'" class="currentWordNumber">{{fontNumDescription}}/200</text>
		</view>
		</view>
		<view v-if="isSelf === 'yes'" class="text" style="flex-direction: row;">
			<text style="width: 25%;">问题类型</text>
			<text style="color: red;width: 25%;">*</text>
			<view style="width: 45%;text-align: right;">
				<picker @change="typeSelect" :range="typeChoose" :disabled="allow">
					<label style="margin-right: 20rpx;">{{ typeName }}</label>
					<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
				</picker>
			</view>
			
		</view>
		<view class="text" v-if="isSelf !== 'yes'" style="flex-direction: row;" @click="navigateToDetail()">
			<text style="width: 95%;">条文规范</text>
			<text style="display: flex;text-align: right;">></text>
		</view>
		<view class="text" v-if="isSelf === 'yes'" >
			<text style="margin-bottom: 20rpx;">条文规范</text>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" :value="projectData.terms" placeholder="条文规范" @blur="projectChange" @input="sumFontNumTerms" :disabled="allow"></textarea>
			<view class="fontInput">
				<button class="voice-text iconfont iconfontmico icon-maikefeng" @touchstart="touchStartTerms" @touchend="touchEndTerms" :disabled="allow"></button>
				<text  class="currentWordNumber">{{fontNumTerms}}/200</text>
			</view>
			<view class="choose-pic">
				<uni-file-picker v-if="picLengthTerms >= 2" v-model="realTermsurl" limit="9" title="最多选择9张图片" @select="picTerms" @delete="deleteFileTerms" :readonly="allow"></uni-file-picker>
				<uni-file-picker v-else-if="picLengthTerms === 1" v-model="realTermsurl" limit="9" title="最多选择9张图片" @select="picTerms" @delete="deleteFileTerms" :del-icon="false" :readonly="allow"></uni-file-picker>
				<uni-file-picker v-else limit="9" title="最多选择9张图片" @select="picTerms" @delete="deleteFileTerms" :readonly="allow"></uni-file-picker>
			</view>
		</view>
		
		<view class="text" style="flex-direction: row;">
			<text style="width: 25%;">严重程度</text>
			<text style="color: red;width: 25%;">*</text>
			<view style="width: 45%;text-align: right">
				<picker @change="severitySelect" :range="severityChoose" :disabled="allow">
					<label style="margin-right: 20rpx;">{{ severityselectName }}</label>
					<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
				</picker>
			</view>
			
		</view>
		
		<view class="bottom-container" v-if="severityselectIndex >= 2">
			<view class="text">
				<text style="margin-bottom: 20rpx;">详情描述</text>
				<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" :value="projectData.detail" placeholder="详情描述" @blur="projectChange" @input="sumFontNumDetail" :disabled="allow"></textarea>
				<view class="fontInput">
					<button class="voice-text iconfont iconfontmico icon-maikefeng" @touchstart="touchStartDetail" @touchend="touchEndDetail" :disabled="allow"></button>
					<text  class="currentWordNumber">{{fontNumDetail}}/200</text>
				</view>
			</view>
			<view class="choose-pic">
				<uni-file-picker v-if="picLength >= 2" v-model="realurl" limit="9" title="最多选择9张图片" @select="picTest" @delete="deleteFile" :readonly="allow"></uni-file-picker>
				<uni-file-picker v-else-if="picLength === 1" v-model="realurl" limit="9" title="最多选择9张图片" @select="picTest" @delete="deleteFile" :del-icon="false" :readonly="allow"></uni-file-picker>
				<uni-file-picker v-else limit="9" title="最多选择9张图片" @select="picTest" @delete="deleteFile" :readonly="allow"></uni-file-picker>
			</view>
			<view class="text">
				<view style="flex-direction: row; margin-bottom: 20rpx;">
					<text style="margin-bottom: 20rpx;">整改要求</text>
				</view>
				<textarea class="detailStyle" :style="{'border': isFocused && !projectData.rectify ? '1px solid red' : '1px solid darkgray'}" style="padding-left: 20rpx;" type="text"  @focus="onFocus" :value="projectData.rectify" placeholder="整改要求" @blur="projectChange" @input="sumFontNumRectify" :disabled="allow"></textarea>
				<view class="fontInput">
					<button class="voice-text iconfont iconfontmico icon-maikefeng" @touchstart="touchStartRectify" @touchend="touchEndRectify" :disabled="allow"></button>
					<text  class="currentWordNumber">{{fontNumRectify}}/200</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
import { uploadFiles } from '/api/api.js'
	var plugin = requirePlugin("WechatSI")
	let manager = plugin.getRecordRecognitionManager()
	export default {
		name:"projectdetail",
		props:{
			projectData:{
				type:Object
			}
			},
		data() {
			return {
				it:[{					
					id: 1,
					projectName:'南湖水环境提升工程',
					type: '安全',
					severity: '较严重',
					description: '问题描述略1',
					detail: '详细描述略',
					photoUrl: '',   //放图片
					rectify: '整改要求略',
					
					}
				],
				testPicurl:[],
				testPicTermsurl:[],
				realurl:[],
				realTermsurl:[],
				severityChoose:['无此项','无问题','一般','较严重','严重','非常严重'],
				severityselectIndex:'2',
				severityselectName:'无',
				typeChoose:['质量','安全','文明施工'],
				typeIndex:'0',
				typeName:'质量',
				newRule:'',
				uploadData:'',
				uploadTermData:'',
				from:0,//跳转页面确定,
				samePic:'no',
				deleteId:'',
				fontNumDescription:0,
				fontNumDetail:0,
				fontNumRectify:0,
				fontNumTerms:0,
				//voiceResultDescription:"",
				//voiceResultDetail:"",
				//voiceResultRectify:"",
				picLength:'',
				picLengthTerms:'',
				allow:'',
				mico:[0,0,0,0],
				isSelf:'',
				//modify:true,
				status:'',
				isFocused: false,
			};
		},
		onLoad() {
			
		},
		mounted() {
			
			this.initData()
			this.initRecord()
		},
		methods:{
			onFocus(){
				this.isFocused = true
			},
			sumFontNumDescription(e) {
				this.fontNumDescription = e.detail.value.length
				this.projectData.description = e.detail.value
				// console.log(this.fontNum)
			},
			sumFontNumDetail(e) {
				this.fontNumDetail = e.detail.value.length
				this.projectData.detail = e.detail.value
				// console.log(this.fontNum)
			},
			sumFontNumRectify(e) {
				this.fontNumRectify = e.detail.value.length
				this.projectData.rectify = e.detail.value
				// console.log(this.fontNum)
			},
			sumFontNumTerms(e) {
				this.fontNumTerms = e.detail.value.length
				this.projectData.terms = e.detail.value
				// console.log(this.fontNum)
			},
			picTerms(e){
				console.log(e)
				uni.uploadFile({
					url: 'https://zsjs.huaskj.com/weps-api/upload_files', //仅为示例，非真实的接口地址
					filePath: e.tempFilePaths[0],
					name: 'files',
					formData: {
						'dirName': "水务/"
					},
					success: (uploadFileRes) => {
						let json_data = JSON.parse(uploadFileRes.data)
						//console.log(json_data.data[0]);
						this.uploadData = 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + json_data.data[0]
						//console.log(this.uploadData)
						this.projectData.termsUrl.push(
							json_data.data[0]
						)
						console.log(this.projectData)
						//console.log(this.projectData.photoUrl)
						this.$emit("sendData",this.projectData)
					}
				})
			},
			picTest(e){
				console.log(e)
				uni.uploadFile({
					url: 'https://zsjs.huaskj.com/weps-api/upload_files', //仅为示例，非真实的接口地址
					filePath: e.tempFilePaths[0],
					name: 'files',
					formData: {
						'dirName': "水务/"
					},
					success: (uploadFileRes) => {
						let json_data = JSON.parse(uploadFileRes.data)
						//console.log(json_data.data[0]);
						this.uploadTermData = 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + json_data.data[0]
						//console.log(this.uploadData)
						this.projectData.photoUrl.push(
							json_data.data[0]
						)
						//console.log(this.projectData.photoUrl)
						console.log(this.projectData)
						this.$emit("sendData",this.projectData)
					}
				})
			},
			deleteFileTerms(e){
				var sameSum = 0
				for (var i = 0;i<this.testPicTermsurl.length;i++){
					if(this.testPicTermsurl[i].url === e.tempFilePath){
						this.deleteId = i
						sameSum = sameSum + 1
					}
				}
				if(sameSum >= 2){
					this.projectData.termsUrl.splice(this.deleteId,1)
					//console.log(this.projectData.photoUrl)
				} else {
					this.projectData.termsUrl.splice(this.deleteId,1)
					//console.log(this.projectData.photoUrl)
					let result = e.tempFilePath.slice(57)
					console.log(result)
					this.$emit("deleteId",result)
				}
				this.picLengthTerms = this.picLengthTerms - 1
					if(this.picLengthTerms === 1){
						var tran = []
						this.realTermsurl = tran
						this.realTermsurl = [{
							name: this.projectData.termsUrl[0],
							extname: this.filterImgType(this.projectData.termsUrl[0]),
							url: 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + this.projectData.termsUrl[0]
						}]
						//console.log(this.realurl)
						this.picLengthTerms = this.realTermsurl.length
					}
					//console.log(this.picLength)
				
						// uni.showToast({
						//     title: '至少保留一张图片！',
						//     icon: 'none',
						//     duration: 2000
						// })
				
				
			},
			
			deleteFile(e){
				var sameSum = 0
				for (var i = 0;i<this.testPicurl.length;i++){
					if(this.testPicurl[i].url === e.tempFilePath){
						this.deleteId = i
						sameSum = sameSum + 1
					}
				}
				if(sameSum >= 2){
					this.projectData.photoUrl.splice(this.deleteId,1)
					//console.log(this.projectData.photoUrl)
				} else {
					this.projectData.photoUrl.splice(this.deleteId,1)
					//console.log(this.projectData.photoUrl)
					let result = e.tempFilePath.slice(57)
					console.log(result)
					this.$emit("deleteId",result)
				}
				this.picLength = this.picLength - 1
					if(this.picLength === 1){
						var tran = []
						this.realurl = tran
						this.realurl = [{
							name: this.projectData.photoUrl[0],
							extname: this.filterImgType(this.projectData.photoUrl[0]),
							url: 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + this.projectData.photoUrl[0]
						}]
						//console.log(this.realurl)
						this.picLength = this.realurl.length
					}
					
			},
			initData(){
				
				try{
					console.log("看看projectData")
					console.log(this.projectData)
					console.log(typeof this.projectData.rectify)
					var temp = uni.getStorageSync('patrolStutas_key')
					//this.modify = temp.modify
					this.status = temp.patrolstatus
					//console.log("专家是否为该小组成员+"+this.modify)
					// if(this.modify === false){
					// 	uni.showToast({
					// 		title: '您不是该项目小组成员！',
					// 		icon: 'none',
					// 		duration: 2000
					// 	})
					// }
					
						
					console.log('状态:'+this.status)
					if (this.status === '未检查' || this.status === '进行中' || this.status === '检查中' || this.status === '待检查' || this.status === '已检查'){
						this.allow = false
					} else {
						this.allow = true
					}
				}catch(e){

				}
				
				console.log(this.allow)
				//console.log(this.projectData.basis)
				if(this.projectData.basis === null){
					
				}else{
					uni.setStorage({
						key:'basisID_key',
						data:this.projectData.basis.id,
						success: function(){
							console.log("basisID save success!")
						}
					})
				}
				
				if (this.projectData.basis === null || this.projectData.basis.typeOne === '自定义' ){
					this.isSelf = 'yes'
				} else {
					this.isSelf = 'no'
				}
				this.severityselectName = this.projectData.severity
				this.typeName = this.projectData.type
				//console.log(this.projectData.photoUrl.length)
				// if(this.projectData.photoUrl.length === 0){
				// 	this.testPicurl = null
				// }
				if(this.projectData.photoUrl.length !== 0){
					for (var i = 0;i<this.projectData.photoUrl.length;i++){
						console.log(i)
						this.testPicurl[i] = {
							name: this.projectData.photoUrl[i],
							extname: this.filterImgType(this.projectData.photoUrl[i]),
							url: 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + this.projectData.photoUrl[i]
						}
						// this.testPicurl.push({
						// 	fileId: this.projectData.photoUrl[i],
						// 	url: 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + this.projectData.photoUrl[i]
						// })
					}
				}
				if(this.projectData.termsUrl.length !== 0){
					for (var i = 0;i<this.projectData.termsUrl.length;i++){
						console.log(i)
						this.testPicTermsurl[i] = {
							name: this.projectData.termsUrl[i],
							extname: this.filterImgType(this.projectData.termsUrl[i]),
							url: 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + this.projectData.termsUrl[i]
						}
						// this.testPicurl.push({
						// 	fileId: this.projectData.photoUrl[i],
						// 	url: 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + this.projectData.photoUrl[i]
						// })
					}
				}
				
				//console.log(this.testPicurl)
				this.realurl = this.testPicurl
				this.picLength = this.testPicurl.length
				this.realTermsurl = this.testPicTermsurl
				this.picLengthTerms = this.testPicTermsurl.length
			},
			severitySelect(e) {
			    this.severityselectIndex = e.detail.value;
				if(this.severityselectIndex < 2){
					this.projectData.rectify = "专家认为无问题或者无此项！"
				}
			    this.severityselectName=this.severityChoose[this.severityselectIndex]
				this.projectData.severity = this.severityselectName
				this.$emit("sendData",this.projectData)
			},
			typeSelect(e) {
			    this.typeIndex = e.detail.value;
			    this.typeName=this.typeChoose[this.typeIndex]
				this.projectData.type = this.typeName
				this.$emit("sendData",this.projectData)
			},
			projectChange(){
				//console.log(this.testPicurl)
				if(this.projectData.description === ''){
					uni.showToast({
					    title: '问题描述不能为空！',
					    icon: 'none',
					    duration: 2000
					})
				}
				if(this.projectData.rectify === ''){
					// uni.showToast({
					//     title: '整改要求不能为空！',
					//     icon: 'none',
					//     duration: 2000
					// })
				}
				if(this.projectData.description !== '' && this.projectData.rectify !== ''){
					this.$emit("sendData",this.projectData)
				}
			},
			uploadPic(){
				
			},
			
			filterImgType(img) {
				if (/png/g.test(img)) {
					  return 'png'
				  } else if (/jpg/g.test(img)) {
					  return 'jpg'
				  } else if (/gif/g.test(img)) {
					  return 'gif'
				  } else if (/jpeg/g.test(img)) {
					  return 'jpeg'
				  }
			 },
			navigateToDetail(){
				uni.navigateTo({
					url:'/pages/project/detail/detail?from='+this.from
				})
			},
			//语音识别功能
			touchStartQuestion: function() {   
				manager.start({  
					duration: 60000,  
					lang: "zh_CN"  
				});
				this.mico = [1,0,0,0]
				
			},  
			touchEndQuestion: function() {  
				uni.showToast()  
				manager.stop();
				this.mico = [1,0,0,0]
			},
			//语音识别功能
			touchStartTerms: function() {
				manager.start({  
					duration: 60000,  
					lang: "zh_CN"  
				});  
				this.mico = [0,0,0,1]
			},  
			touchEndTerms: function() {  
				uni.showToast()  
				manager.stop();  
				this.mico = [0,0,0,1]
			},
			  //语音识别功能
			  touchStartDetail: function() {   
			  	manager.start({  
			  		duration: 60000,  
			  		lang: "zh_CN"  
			  	});  
				this.mico = [0,1,0,0]
			  },  
			  touchEndDetail: function() {  
			  	uni.showToast()  
			  	manager.stop();  
				this.mico = [0,1,0,0]
			  },
			  //语音识别功能
			  touchStartRectify: function() {   
			  	manager.start({  
			  		duration: 60000,  
			  		lang: "zh_CN"  
			  	});  
				this.mico = [0,0,1,0]
			  },  
			  touchEndRectify: function() {  
			  	uni.showToast()  
			  	manager.stop();  
				this.mico = [0,0,1,0]
			  },
			/**  
			 * 初始化语音识别回调  
			 * 绑定语音播放开始事件  
			 */  
			initRecord: function() {  
				manager.onStart = function(res) { 
					for(var i = 0; i<4;i++){
						if(i == 0 && this.mico[i] == 1){
							this.projectData.description = "onStart:"+ res.msg+"正在录音"
						}else if(i == 1 && this.mico[i] == 1){
							this.projectData.detail = "onStart:"+ res.msg+"正在录音"
						}else if(i == 2 && this.mico[i] == 1){
							this.projectData.rectify = "onStart:"+ res.msg+"正在录音"
						}else if(i == 3 && this.mico[i] == 1){
							this.projectData.terms = "onStart:"+ res.msg+"正在录音"
						}
					}
					//this.voiceState ="onStart:"+ res.msg+"正在录音"  
				};  
				//有新的识别内容返回，则会调用此事件  
				manager.onRecognize = (res) => {  
					for(var i = 0; i<4;i++){
						if(i == 0 && this.mico[i] == 1){
							this.projectData.description = res.result
						}else if(i == 1 && this.mico[i] == 1){
							this.projectData.detail = res.result
						}else if(i == 2 && this.mico[i] == 1){
							this.projectData.rectify = res.result
						}else if(i == 3 && this.mico[i] == 1){
							this.projectData.terms = res.result
						}
					}
				}  
			
				// 识别结束事件  
				manager.onStop = (res) => {  
			
					for(var i = 0; i<4;i++){
						if(i == 0 && this.mico[i] == 1){
							this.projectData.description = res.result
						}else if(i == 1 && this.mico[i] == 1){
							this.projectData.detail = res.result
						}else if(i == 2 && this.mico[i] == 1){
							this.projectData.rectify = res.result
						}else if(i == 3 && this.mico[i] == 1){
							this.projectData.terms = res.result
						}
					} 
				}  
			
				// 识别错误事件  
				manager.onError = (res) => {  
			
					for(var i = 0; i<4;i++){
						if(i == 0 && this.mico[i] == 1){
							this.projectData.description = res.result
						}else if(i == 1 && this.mico[i] == 1){
							this.projectData.detail = res.result
						}else if(i == 2 && this.mico[i] == 1){
							this.projectData.rectify = res.result
						}else if(i == 3 && this.mico[i] == 1){
							this.projectData.terms = res.result
						}
					}
			
				}  
			},
		}
	}
</script>

<style>
.choose-pic{
	display: flex;
	margin-left: 20rpx;
	margin-right: 30rpx;
	padding-top: 20rpx;
	padding-bottom: 40rpx;
	padding-left: 30rpx;
	font-size: 35rpx;
}
.text{
	display: flex;
	flex-direction: column;
	margin-left: 30rpx;
	margin-right: 30rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	padding-left: 30rpx;
	font-size: 35rpx;
	border-top: 1rpx solid darkgray;
}
.detailStyle{
	display: flex;
	padding-top: 10rpx;
	position: relative;
	width: 90%;
	height: 300rpx;
	border: 1rpx solid darkgray;
	border-radius: 10rpx;
}
.detailPic{
	position: relative;
	height: 100rpx;
	width: 100rpx;
	display: flex;
	top: -50rpx;
	}
.detailToPicture{
		font-size: 50rpx;
		position: relative;
		top: -65rpx;
		left: 25rpx;
	}
	.detailToVideo{
		font-size: 60rpx;
		position: relative;
		top: -120rpx;
		left: 105rpx;
		color: #707070;
	}
.fontInput{
	position: relative;
}
.voice-text{
	position: absolute;
	right: 80rpx;
	bottom:15upx;
	width: 80rpx;
	color: #0CBCC2;
	z-index: 2;
	font-size: 60;
}
.currentWordNumber{
	position: absolute;
	right: 170rpx;
	bottom:30upx;
	color: #707070;
	z-index: 2;
}
</style>
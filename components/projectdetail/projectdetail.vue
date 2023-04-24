<template name="projectdetail">
	<view>
		<view style="height: 20rpx;text-align: center;border: 1rpx solid darkgray;font-size: 20rpx;padding-top: 0rpx;">
			<text>···</text>
		</view>
		<view class="text">
			<text style="margin-bottom: 20rpx;">问题描述</text>
			<text v-if="projectData.projectName !== '自定义'" style="font-size: 33rpx;">{{projectData.description}}</text>
			<textarea v-if="projectData.projectName === '自定义'" class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.description" placeholder="请输入详情描述..." @blur="projectChange"></textarea>
			<button  v-if="projectData.projectName === '自定义'" class="voice-text iconfont iconfontmico icon-maikefeng" @touchstart="touchStart" @touchend="touchEnd"></button>
			<text v-if="projectData.projectName === '自定义'" class="currentWordNumber">{{fontNum}}/200</text>
		</view>
		<view v-if="projectData.projectName === '自定义'" class="text" style="flex-direction: row;">
			<text style="width: 25%;">问题类型</text>
			<text style="color: red;width: 25%;">*</text>
			<view style="width: 45%;text-align: right;">
				<picker @change="typeSelect" :range="typeChoose">
					<label style="margin-right: 20rpx;">{{ typeName }}</label>
					<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
				</picker>
			</view>
			
		</view>
		<view class="text" v-if="projectData.projectName !== '自定义'" style="flex-direction: row;" @click="navigateToDetail()">
			<text style="width: 95%;">条文规范</text>
			<text style="display: flex;text-align: right;">></text>
		</view>
		<view class="text" v-if="projectData.projectName === '自定义'" >
			<text style="margin-bottom: 20rpx;">条文规范</text>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.terms" placeholder="条文规范" @blur="projectChange"></textarea>
			<!-- <view class="choose-pic">
				<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
			</view> -->
		</view>
		
		<view class="text" style="flex-direction: row;">
			<text style="width: 25%;">严重程度</text>
			<text style="color: red;width: 25%;">*</text>
			<view style="width: 45%;text-align: right">
				<picker @change="severitySelect" :range="severityChoose">
					<label style="margin-right: 20rpx;">{{ severityselectName }}</label>
					<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
				</picker>
			</view>
			
		</view>
		<view class="text">
			<text style="margin-bottom: 20rpx;">详情描述</text>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.detail" placeholder="详情描述" @blur="projectChange"></textarea>
			<button class="voice-text iconfont iconfontmico icon-maikefeng" @touchstart="touchStart" @touchend="touchEnd"></button>
			<text  class="currentWordNumber">{{fontNum}}/200</text>
		</view>
		<view class="choose-pic">
			<uni-file-picker v-if="testPicurl !== null" v-model="realurl" limit="9" title="最多选择9张图片" @select="picTest" @delete="deleteFile"></uni-file-picker>
			<uni-file-picker v-else limit="9" title="最多选择9张图片" @select="picTest" @delete="deleteFile"></uni-file-picker>
		</view>
		<view class="text">
			<view style="flex-direction: row; margin-bottom: 20rpx;">
				<text style="margin-bottom: 20rpx;">整改要求</text>
			</view>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.rectify" placeholder="整改要求" @blur="projectChange"></textarea>
			<button class="voice-text iconfont iconfontmico icon-maikefeng" @touchstart="touchStart" @touchend="touchEnd"></button>
			<text  class="currentWordNumber">{{fontNum}}/200</text>
		</view>
	</view>
</template>

<script>
import { uploadFiles } from '/api/api.js'
	// var plugin = requirePlugin("WechatSI")
	// let manager = plugin.getRecordRecognitionManager()
	export default {
		name:"projectdetail",
		props:{
			projectData:Object
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
				realurl:[],
				severityChoose:['无','一般','较严重','严重','非常严重'],
				severityselectIndex:'0',
				severityselectName:'无',
				typeChoose:['质量','安全','文明施工'],
				typeIndex:'0',
				typeName:'质量',
				newRule:'',
				uploadData:'',
				from:0,//跳转页面确定,
				samePic:'no',
				deleteId:'',
				
			};
		},
		mounted() {
			this.initData()
		},
		methods:{
			
			picTest(e){
				console.log(e)
				// console.log(this.projectData.photoUrl)
				
				// this.projectChange()
				
				// var formData = new FormData();
				// formData.append("files", e.tempFilePaths);
				// formData.append("dirName", "水务/");
				// console.log(formData)
				// uploadFiles(formData).then(res=>{
				// 	console.log(res)
				// 	console.log(url)
				// })
				
				uni.uploadFile({
					url: 'https://zsjs.huaskj.com/weps-api/upload_files', //仅为示例，非真实的接口地址
					filePath: e.tempFilePaths[0],
					name: 'files',
					formData: {
						'dirName': "水务/"
					},
					success: (uploadFileRes) => {
						let json_data = JSON.parse(uploadFileRes.data)
						console.log(json_data.data[0]);
						this.uploadData = 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + json_data.data[0]
						console.log(this.uploadData)
						// this.testPicurl.push({
						// 	fileId: json_data.data[0],
						// 	url: this.uploadData
						// })
						this.projectData.photoUrl.push(
							json_data.data[0]
						)
						console.log(this.projectData.photoUrl)
						this.$emit("sendData",this.projectData)
					}
				})
			},
			hello(){
				console.log('hello')
				
			},
			initData(){
				
				this.severityselectName = this.projectData.severity
				this.typeName = this.projectData.type
				console.log(this.projectData.photoUrl.length)
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
				
				console.log(this.testPicurl)
				this.realurl = this.testPicurl
			},
			severitySelect(e) {
			    this.severityselectIndex = e.detail.value;
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
				console.log(this.testPicurl)
				if(this.projectData.description === ''){
					uni.showToast({
					    title: '问题描述不能为空！',
					    icon: 'none',
					    duration: 2000
					})
				}
				if(this.projectData.rectify === ''){
					uni.showToast({
					    title: '整改要求不能为空！',
					    icon: 'none',
					    duration: 2000
					})
				}
				if(this.projectData.description !== '' && this.projectData.rectify !== ''){
					this.$emit("sendData",this.projectData)
				}
			},
			uploadPic(){
				
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
					console.log(this.projectData.photoUrl)
				} else {
					this.projectData.photoUrl.splice(this.deleteId,1)
					console.log(this.projectData.photoUrl)
					let result = e.tempFilePath.slice(57)
					console.log(result)
					this.$emit("deleteId",result)
				}
				
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
			touchStart: function() {   
				manager.start({  
					duration: 60000,  
					lang: "zh_CN"  
				});  
			},  
			touchEnd: function() {  
				uni.showToast()  
				manager.stop();  
			},  
			/**  
			 * 初始化语音识别回调  
			 * 绑定语音播放开始事件  
			 */  
			initRecord: function() {  
				manager.onStart = function(res) {  
					this.voiceState ="onStart:"+ res.msg+"正在录音"  
				};  
				//有新的识别内容返回，则会调用此事件  
				manager.onRecognize = (res) => {  
					this.voiceResult = res.result;  
				}  
			
				// 识别结束事件  
				manager.onStop = (res) => {  
			
					this.voiceState = res.result;  
				}  
			
				// 识别错误事件  
				manager.onError = (res) => {  
			
					this.voiceState = res.msg;  
			
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
.voice-text{
	position: relative;
	top: -100rpx;
	left: 200rpx;
	color: #0CBCC2;
	z-index: 1;
	font-size: 60;
}
.currentWordNumber{
	position: relative;
	top: -160rpx;
	left: 60%;
	color: #707070;
}
</style>
<template>
	<view>
		<view class="reason">
			<text class="hs-offwork-name" >请假事宜</text>
				<textarea  class="hs-text-box" :value="voiceResult" placeholder="请输入请假原因..." maxlength="200" @input="sumfontnum">
			</textarea>
			<!-- <button class="iconfont iconfontmico icon-maikefeng" @touchstart="touchStart" @touchend="touchEnd"></button>
			<text class="currentWordNumber">{{fontNum}}/200</text> -->
		</view>
		<view class="hs-begin">
			<view class="begin-word">开始时间 <text class="hs-required">*</text> </view>
			<view class="begin-time">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangebegin">
					<view class="begin-input">{{begindate}}</view>
				</picker>
			</view>
		</view>
		<view class="hs-end">
			<view class="end-word">结束时间 <text class="hs-required">*</text> </view>
			<view class="end-time">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangeend">
					<view class="end-input">{{enddate}}</view>
				</picker>
			</view>
		</view>
		<button class="hs-submit-btn" type="default" @tap="submitAll">提  交</button>
	</view>
</template>

<script>
	import { reporting_API } from '../../../api/api.js'
	// var plugin = requirePlugin("WechatSI")
	// let manager = plugin.getRecordRecognitionManager()
	export default {
		
		data() {
			const currentDate = this.getDate({
				format:true
			})
			
			return {
				fontNum:0,
				begindate:currentDate,
				enddate:currentDate,
				voiceState:"",
				voiceResult:"",
				reportingData:{
				  name: "专家1",
				  content: "RNG输了，没心情工作了",
				  start: "2018-10-20",
				  end: "2019-10-20"
				},
				userData:{}
				
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {  
			this.getUserName()  
		},
		methods: {
			getUserName(){
				try{
					this.userData = uni.getStorageSync('user_key')
					this.reportingData.name = this.userData.name
					console.log(this.reportingData.name)
				}catch(e){

				}
			},
			sumfontnum(e) {
				this.fontNum = e.detail.value.length
				this.voiceResult = e.detail.value
				
				// console.log(this.fontNum)
			},
			bindDateChangebegin: function(e) {
				this.begindate = e.detail.value
				// console.log(this.begindate)
			},
			bindDateChangeend: function(e){
				this.enddate = e.detail.value
				// console.log(this.enddate)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			submitAll(){
				this.reportingData.content = this.voiceResult
				this.reportingData.start = this.begindate
				this.reportingData.end = this.enddate
				console.log(this.reportingData)
				reporting_API(this.reportingData).then(res => {
					uni.showToast({
						title:'报备成功',
						duration:1000,
					})
				})
				uni.switchTab({
					url:'/pages/my/my/my'
				})
			},
			//语音识别功能
			// touchStart: function() {   
			// 	manager.start({  
			// 		duration: 60000,  
			// 		lang: "zh_CN"  
			// 	});  
			// },  
			// touchEnd: function() {  
			// 	uni.showToast()  
			// 	manager.stop();  
			// },  
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
			// 		this.voiceResult = res.result;  
			// 		console.log(this.voiceResult)
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

}
		
</script>

<style lang="scss" scoped>
@import url('offwork.scss');
</style>
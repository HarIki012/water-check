<template>
	<view>
		<view class="reason">
			<text style="font-size: 35rpx;">事宜</text>
			<textarea style="word-break:break-all word-wrap:break-word" class="text-box" :value="voiceResult" placeholder="详情描述" maxlength="200" @input="sumfontnum">
			</textarea>
			<button class="iconfont iconfontmico icon-maikefeng" @touchstart="touchStart" @touchend="touchEnd"></button>
			<text class="currentWordNumber">{{fontNum}}/200</text>
		</view>
		<view class="begin">
			<view class="begin-word">开始时间</view>
			<view class="begin-time">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangebegin">
					<view class="begin-input">{{begindate}}</view>
				</picker>
			</view>
		</view>
		<view class="end">
			<view class="end-word">结束时间</view>
			<view class="end-time">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangeend">
					<view class="end-input">{{enddate}}</view>
				</picker>
			</view>
		</view>
		<button class="submit-btn" type="default" @tap="submitAll">提交</button>
	</view>
</template>

<script>
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
				submitState:false,
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
			this.initRecord();  
		},
		methods: {
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
				//提交功能没做
				console.log(this.voiceResult)
				console.log(this.begindate)
				console.log(this.enddate)
				uni.navigateTo({
					url:'/pages/my/my'
				})
			},
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
.reason{
	width: 90%;
	margin: 0 auto;
	position: relative;
	padding: 3%;
	overflow: hidden;
}
.text-box {
	position: relative;
	padding-bottom: 125rpx;
	padding-right: 75rpx;
	border: 1upx solid #eee;
}

.currentWordNumber{
  font-size: 28rpx;
  color: gray;
  position: absolute;
  left: 500rpx;
  top: 430rpx;
}
.begin,.end{
	border: 1upx solid #eee;
}
.begin-word,.end-word{
	position: relative;
	top: 20rpx;
	left: 45rpx;
}
.begin-input,.end-input{
	position: relative;
	left: 540rpx;
	top: -26rpx;
}
.submit-btn{
	width: 80%;
	margin: 0 auto 40upx;
	background: #0055ff;
	border-radius: 80upx;
	color: #fff;
	font-size: 32upx;
	top: 25rpx;
}
.iconfontmico{
	font-size: 40rpx;
	position: absolute;
	left: 590rpx;
	top: 390rpx;
}
</style>
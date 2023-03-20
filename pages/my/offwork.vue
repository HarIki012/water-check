<template>
	<view>
		<view class="reason">
			<text style="font-size: 35rpx;">事宜</text>
			<textarea style="word-break:break-all word-wrap:break-word" class="text-box" placeholder="详情描述" maxlength="200" @input="sumfontnum">
			</textarea>
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
	export default {
		data() {
			const currentDate = this.getDate({
				format:true
			})
			
			return {
				fontNum:0,
				begindate:currentDate,
				enddate:currentDate,
				info:"",
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
		methods: {
			sumfontnum(e) {
				this.fontNum = e.detail.value.length
				this.info = e.detail.value
				
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
				console.log(this.info)
				console.log(this.begindate)
				console.log(this.enddate)
			}
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
  left: 540rpx;
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
</style>
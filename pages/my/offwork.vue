<template>
	<view>
		<view class="reason">
			<text style="font-size: 35rpx;">事宜</text>
			<textarea class="text-box" placeholder="详情描述"  @input="sumfontnum">
			</textarea>
			<text class="currentWordNumber">{{fontNum}}/200</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fontNum:0,
			}
		},
		methods: {
			sumfontnum(e) {
				this.fontNum = e.detail.value.length
				console.log(this.fontNum)
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
</style>
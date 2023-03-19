<template>
	<view>
		<view class="reason">
			<text style="font-size: 35rpx;">事宜</text>
			<textarea class="text-box" scroll-y="true" placeholder="详情描述">
				<input name="detail" class="detail" maxlength="200" placeholder="详情描述" />
				<text class="number">{{number}}/200</text>
			</textarea>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number:0
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.reason{
	width: 90%;
	margin: 0 auto;
	position: relative;
	padding: 3%;
	
}
.text-box {
	padding-bottom: 125rpx;
	border: 1upx solid #eee;
	
}
.number{
	position: absolute;
	right: 80rpx;
	top: 375rpx;
}
</style>
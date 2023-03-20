<template>

	
	<!-- 弹窗 -->
	<uni-popup ref="popup">
		<view class="pop">
			<view class="popup-use">
				<text style="color: red;">*</text>
				项目名称
			</view>
			<view class="popup-use1">
				<input class="oldStyle" type="password" v-model="oldPassword" confirm-type="done" @confirm="oldInput">
			</view>
			<view class="popup-use1">
				<view class="error" v-if="errorTips1===1">
				    <text class="error-text">输入的项目名称不能为空！</text>
				</view>
			</view>
			<view class="popup-use1">
				<text style="color: red;">*</text>
				所属巡检活动
			</view>
			<view class="popup-use1">
				<input class="oldStyle" type="password" v-model="newPassword" confirm-type="done" @confirm="newInput">
			</view>
			<view class="popup-use1" v-if="errorTips2===1">
				<view class="error">
				    <text class="error-text">输入的新密码和旧密码一致！</text>
				</view>
			</view>
			<view class="popup-use1" v-else-if="errorTips2===2">
				<view class="error">
				    <text class="error-text">密码至少6位！</text>
				</view>
			</view>
			<view class="popup-use">
				经纬度
			</view>
			<view class="popup-use1">
				<input class="oldStyle" type="password" v-model="isNew" confirm-type="done" @confirm="isInput">
			</view>
			<view class="popup-use1">
				<view class="error" v-if="errorTips3==1">
				    <text class="error-text">输入的新密码和确认密码不一致！</text>
				</view>
			</view>
			<button class="buttonStyle" type="primary" @tap="toggle1('top')">
				确定
			</button>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				realPassword: '123456',
				newPassword: '',
				isNew: '',
				errorTips1: '',
				errorTips2: '',
				errorTips3: '',
				blankSpace: '',
			}
		},
		methods: {
			toggle1() {
				this.$refs['popup'].close()
			},
			oldInput() {
				if (this.oldPassword !== this.realPassword){
					this.errorTips1 = 1
				} else {
					this.errorTips1 = 0
				}
			},
			newInput(){
				if (this.newPassword.length < 6){
					this.errorTips2 = 2
				}
				if (this.newPassword === this.realPassword){
					this.errorTips2 = 1
				} 
				if (this.newPassword.length >= 6 && this.newPassword !== this.realPassword) {
					this.errorTips2 = 0
				}
			},
			isInput(){
				if (this.isNew === this.newPassword){
					this.errorTips3 = 0
				} else {
					this.errorTips3 = 1
				}
			},
		},
		onNavigationBarButtonTap(e) {
			this.$refs['popup'].open();
		},
	}
</script>

<style>
	.titleStyle{
		text-align: center;
		margin-top: 30rpx;
		font-size: 40rpx;
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid lightslategray;
		padding-bottom: 20rpx;
	}
	.pop{
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.popup-use{
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		width: 530rpx;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
	}
	.popup-use1{
		padding: 10rpx 30rpx;
		padding-top: 10rpx;
		width: 530rpx;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
	}
	.error-icon{
		font-size: 28rpx;
		padding-left: 40rpx;
		display: inline-block;
		width: 2rpx;
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 20rpx;
		background-color: #fe3535;
		color: #FFFFFF;
		margin-right: 20rpx
	}
	.error-text{
		font-size: 28rpx;
		padding-top: 10rpx;
		color: red;
	}
	.oldStyle{
		border: 1rpx solid gray;
		width: 100%;
		height: 70rpx;
	}
	.buttonStyle{
		width: 300rpx;
		height: 88rpx;
		padding-top: 0rpx;
		font-size: 35rpx;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 40rpx;
	}
</style>

<template>
	<view class="titleStyle">
		我的
	</view>
	<view class="name">
		<view class="nameStyle1">姓名</view>
		<view style="width: 50%;margin: auto;margin-right: 10rpx;">
			<view class="nameStyle">{{adminname}}</view>
		</view>
	</view>
	<view class="name">
		<view class="nameStyle1">手机号</view>
		<view style="width: 50%;margin: auto;margin-right: 10rpx;">
			<view class="nameStyle">{{phonenumber}}</view>
		</view>
	</view>
	<view class="name" @tap="toggle('top')">
		<view class="nameStyle1">修改密码</view>
		<view style="width: 50%;margin: auto;margin-right: 10rpx;">
			<view class="nameStyle">></view>
		</view>
	</view>
	<view class="name1" @click="redirectTo()">
		<view class="nameStyle1">请假报备</view>
		<view style="width: 50%;margin: auto;margin-right: 10rpx;">
			<view class="nameStyle" >></view>
		</view>
	</view>
	
	<!-- 修改密码弹窗 -->
	<uni-popup ref="popup">
		<view class="pop">
			<view class="popup-use">
				<text style="color: red;">*</text>
				旧密码
			</view>
			<view class="popup-use1">
				<input class="oldStyle" type="password" v-model="oldPassword" confirm-type="done" @confirm="oldInput">
			</view>
			<view class="popup-use1">
				<view class="error" v-if="errorTips1===1">
				    <text class="error-text">输入的旧密码错误！</text>
				</view>
			</view>
			<view class="popup-use1">
				<text style="color: red;">*</text>
				新密码
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
				<text style="color: red;">*</text>
				确认密码
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
				adminname: '张三',
				phonenumber: '130****9219',
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
			toggle() {
				this.$refs['popup'].open();
				this.oldPassword = this.blankSpace
				this.newPassword = this.blankSpace
				this.isNew = this.blankSpace
				this.errorTips1 = this.blankSpace
				this.errorTips2 = this.blankSpace
				this.errorTips3 = this.blankSpace
			},
			toggle1() {
				this.oldInput()
				this.newInput()
				this.isInput()
				if (this.errorTips1 === 0 && this.errorTips2 === 0 && this.errorTips3 === 0){
					this.realPassword = this.newPassword
					this.oldPassword = this.blankSpace
					this.newPassword = this.blankSpace
					this.isNew = this.blankSpace
					this.$refs['popup'].close();
					uni.showToast({
						title: '密码修改成功',
						duration: 1500
					});
				}
			},
			oldInput() {
				if (this.oldPassword !== this.realPassword){
					this.errorTips1 = 1
				} else {
					this.errorTips1 = 0
				}
			},
			newInput(){
				if(this.newPassword){
					if (this.newPassword.length < 6){
					this.errorTips2 = 2
					}
					if (this.newPassword === this.realPassword){
						this.errorTips2 = 1
					} 
					if (this.newPassword.length >= 6 && this.newPassword !== this.realPassword) {
						this.errorTips2 = 0
					}
				} else {
					this.errorTips2 = 2
				}
				
			},
			isInput(){
				if (this.isNew === this.newPassword){
					this.errorTips3 = 0
				} else {
					this.errorTips3 = 1
				}
			},
			redirectTo()
			{
				uni.redirectTo({
					url:'/pages/my/offwork'
				});
			}
			
		}
	}
</script>

<style>
	.titleStyle{
		text-align: center;
		margin-top: 30rpx;
		font-size: 40rpx;
		margin-bottom: 20rpx;
	}
	.name{
		width: 100%;
		height: 80rpx;
		flex-flow: row;
		display: flex;
		border-top: 1upx solid gray;
	}
	.name1{
		width: 100%;
		height: 80rpx;
		flex-flow: row;
		display: flex;
		border-top: 1upx solid gray;
		border-bottom: 1upx solid gray;
	}
	.nameStyle1{
		width: 50%;
		font-size: 35rpx;
		margin: auto;
		margin-left: 10rpx;
	}
	.nameStyle{
		text-align: right;
		font-size: 35rpx;
		margin: auto;
		margin-right: 10rpx;
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

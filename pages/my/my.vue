<template>
	<view class="titleStyle">
		我的
	</view>
	<view class="name">
		<view class="nameStyle1">姓名</view>
		<view style="width: 50%;margin: auto;">
			<view class="nameStyle">{{adminname}}</view>
		</view>
	</view>
	<view class="name">
		<view class="nameStyle1">手机号</view>
		<view style="width: 50%;margin: auto;">
			<view class="nameStyle">{{phonenumber}}</view>
		</view>
	</view>
	<view class="name">
		<view class="nameStyle1">修改密码</view>
		<view style="width: 50%;margin: auto;">
			<view class="nameStyle">{{adminname}}</view>
		</view>
	</view>
	<view class="name1">
		<view class="nameStyle1">请假报备</view>
		<view style="width: 50%;margin: auto;">
			<view class="nameStyle">{{adminname}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adminname: '张三',
				phonenumber: '130****9219'
			}
		},
		methods: {
			
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
</style>

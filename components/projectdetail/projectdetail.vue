<template name="projectdetail">
	<view>
		<view style="height: 20rpx;text-align: center;border: 1rpx solid darkgray;font-size: 20rpx;padding-top: 0rpx;">
			<text>···</text>
		</view>
		<view class="text">
			<text style="margin-bottom: 20rpx;">问题描述</text>
			<text style="font-size: 33rpx;">{{projectData.description}}</text>
		</view>
		<view class="text" style="flex-direction: row;">
			<text style="width: 95%;">查看规范</text>
			<text style="display: flex;text-align: right;">></text>
		</view>
		<view class="text" style="flex-direction: row;">
			<text style="color: red;">*</text>
			<text style="width: 50%;">严重程度</text>
			<text style="width: 40%;text-align: right">{{projectData.severity}}</text>
			<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
		</view>
		<view class="text">
			<text style="margin-bottom: 20rpx;">详情描述</text>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.detail" placeholder="详情描述"></textarea>
		</view>
		<view class="choose-pic">
			<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
		</view>
		<view class="text">
			<view style="flex-direction: row; margin-bottom: 20rpx;">
				<text style="color: red;">*</text>
				<text style="margin-bottom: 20rpx;">整改要求</text>
			</view>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.rectify" placeholder="详情描述"></textarea>
		</view>
	</view>
</template>

<script>
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
				]
			};
		},
		methods:{
			
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
</style>
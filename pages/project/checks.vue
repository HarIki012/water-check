<template>
	<view class="totalSearch" style="position: sticky;top: 5%;">
		<view class="checkSearch">
			<image class="logo" mode="scaleToFill" src="/static/logo.png"></image>
			<input class="selectStyle" style="padding-left: 20rpx;" type="text" placeholder="问题检索" confirm-type="search">
		</view>
		<view class="typeStyle">
			<view  v-for="(item, index) in typeList"  :key="index" style="text-align: center;display: flex">
				<button :class="item==selectPoint?'chooseType':'unChoose'" type="default" @click="sequ(index)">
						{{item}}
				</button>
			</view>
		</view>
		<uni-collapse style="margin-top: 30rpx;">
		    <!-- 因为list默认带一条分隔线，所以使用 titleBorder="none" 取消面板的分隔线 -->
		    <uni-collapse-item title-border="none" :border="false">
		        <template v-slot:title>
		            <uni-list style="display: flex;">
						<view style="display: flex;">
							<uni-list-item title="标题使用自定义标题插槽" :show-extra-icon="true" :extra-icon="extraIcon" style="display: flex;width: 75%;">
							</uni-list-item>
							<view class="deleteStyle">删除</view>
						</view>
		            </uni-list>
		        </template>
		        <view class="content">
		            <text class="text">折叠内容主体，可自定义内容及样式</text>
		        </view>
		    </uni-collapse-item>
		</uni-collapse>
	</view>
	
	  
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				active:'',
				typeList: ['质量', '安全', '文明施工'],
				selectPoint: '',
				problemList: [
					{
						id: 1,
						projectName:'南湖水环境提升工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 2,
						projectName:'南湖水环境提升工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 3,
						projectName:'南湖水环境提升工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 4,
						projectName:'土石方工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 5,
						projectName:'土石方工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					}
				]
			}
		},
		onLoad() {

		},
		mounted() {
			
		},
		methods: {
			sequ(id) {
				this.selectPoint = this.typeList[id]
			},
			changeData() {
				
			}
		}
	}
</script>

<style lang="scss">
	.logo {
		margin-left: 20rpx;
		height: 50rpx;
		width: 50rpx;
		display: flex;
	}
	.selectStyle{
		width: 100%;
		height: 50rpx;
		margin-left: 10rpx;
		text-align: left;
	}
	.checkSearch{
		display: flex;
		margin-left: 5%;
		margin-top: 30rpx;
		border-radius: 5px;
		border: 1rpx solid gray;
		text-align: center;
		align-items: center;
		flex-direction: row;
		margin-right: 1%;
		width: 90%;
		height: 90rpx;
		position: sticky;
		top: 0;
	}
	.totalSearch{
		padding-top: 10rpx;
		width: 100%;
		justify-content: left;
		letter-spacing: 2rpx;
		background-color: white;
	}
	.typeStyle{
		margin-top: 30rpx;
		width: 100%;
		padding-left: 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.chooseType{
		width: 220rpx;
		height: 85rpx;
		background-color: #1E90FF;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		border: 0.5rpx solid #DCDCDC;
	}
	.unChoose{
		width: 220rpx;
		height: 85rpx;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: white;
		display: flex;
		border: 0.5rpx solid #DCDCDC;
	}
	.deleteStyle{
		display: flex;
		width: 20%;
		text-align: center;
		justify-content: center;
		align-items: center;
		color: #1E90FF;
	}
</style>

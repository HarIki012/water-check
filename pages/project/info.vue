<template>
	<view class="border" style="border: 1upx solid #eee;">
		<view class="content" style="-webkit-flex-wrap: wrap;flex-wrap: wrap; " v-for="(item,index) in list">
			<view class="projectName" style="width: 200rpx">{{item.name}}</view>
			<view class="projectName-info" style="-webkit-flex: 1;flex: 1;">{{item.info}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				list:[{
					name:"项目名称",
					info:"2017年江岸区沿江商务区现状道路雨污管涵完善工程",
				},
					{
					name:"辖区归属",
					info:"江岸区",
				},
					{
					name:"项目类型",
					info:"水利工程",
				},
					{
					name:"项目地址",
					info:"兴瑞街（黄埔大街-永泰路）、永祥路（中山大道-沿江大道）",
				},
					{
					name:"建设单位",
					info:"江岸区水务和湖泊局",
				},
					{
					name:"施工单位",
					info:"江西中林建设集团有限公司",
				},
					{
					name:"监理单位",
					info:"武汉市青山建设工程监理有限责任公司",
				},
					{
					name:"监管部门",
					info:"江岸区水务和湖泊局",
				},
					{
					name:"联系人",
					info:"王立冈18162790040",
				},
					{
					name:"形象进度",
					info:"已完成合同额80%",
				}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content{
		margin-top: 35rpx;
		margin-bottom: 10rpx;
		flex-direction: row;
		justify-content: flex-start;
		display: flex;
	}
	.projectName{
		display: flex;
		justify-content: center;
	}
	.projectName-info{
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
		display: flex;
		align-items: center;
	}
</style>

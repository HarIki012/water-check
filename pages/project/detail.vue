<template>
	<view>
		<view class="top" style="border-bottom: 1rpx solid #cacaca;"></view>
		<view class="description">
			<view class="name">描述</view>
			<view class="detail">{{data[0].description}}
				<view class="remark" v-for="(item,index) in data[0].remarks">{{item.detail}}</view>
			</view>
		</view>
		<view class="description">
			<view class="name">相关法规标准</view>
			<view class="detail">{{data[0].regulations}}</view>
		</view>
		<view class="description">
			<view class="name">标准内容或条款</view>
			<view class="detail">{{data[0].terms}}</view>
		</view>
		<view class="description">
			<view class="name">责任主体</view>
			<view class="detail">{{data[0].responsibleParties}}</view>
		</view>
		<view class="feedback">条款存在问题？点我反馈</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [
				        {
				            id: 1,
				            type: "文明施工-1基本规定-1.1文明施工管理责任-1.1.1建设单位主要职责",
				            description: "未在招标文件或者承发包合同中明确设计、施工以及监理等单位有关文明施工的要求和措施。",
				            regulations: "武汉市水务工地文明施工标准化图册（2020年版）第1.1.1条，第1点",
				            terms: "在建设工程和建筑物、构筑物拆除招标或者直接发包时， 应当在招标文件或者承发包合同中明确设计、施工以及监理等单位有关文明施工的要求和措施， 并为前述单位进行文明施工创造条件；",
				            responsibleParties: "建设单位",
				            remarks: [{
								detail:"强条"
							},
							{
								detail:"重点"
							}
							],
				            problems: [
				                {
				                    id: 1,
				                    projectName: "问题10",
				                    type: "安全",
				                    severity: "较严重",
				                    description: "问题描述略",
				                    detail: "详细描述略",
				                    photoUrl: "xxxx.jpg",
				                    rectify: "整改要求略",
				                    deadline: "2023-4-1",
				                    supervisionUnit: "督办单位1",
				                },
				                {
				                    id: 2,
				                    projectName: "问题2",
				                    type: "质量",
				                    severity: "严重",
				                    description: "问题描述略",
				                    detail: "详细描述略",
				                    photoUrl: "xxxx.jpg",
				                    rectify: "整改要求略",
				                    deadline: "2023-4-1",
				                    supervisionUnit: "督办单位1",
				                },
				                {
				                    id: 3,
				                    projectName: "问题3",
				                    type: "文明施工",
				                    severity: "严重",
				                    description: "问题描述略",
				                    detail: "详细描述略",
				                    photoUrl: "xxxx.jpg",
				                    rectify: "整改要求略",
				                    deadline: "2023-4-1",
				                    supervisionUnit: "督办单位1",
				                }
				            ]
				        }
				    ],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.description{
	margin-top: 20rpx;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #cacaca;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap; 
	flex-direction: row;
	justify-content: flex-start;
	display: flex;
}
.name{
	margin-left: 15rpx;
	width: 150rpx;
	justify-content: center;
}
.detail{
	-webkit-flex: 1;
	flex: 1;
	flex-wrap: wrap;
}
.feedback{
	color: #ca0000;
	position: relative;
	left: 380rpx;
}
</style>

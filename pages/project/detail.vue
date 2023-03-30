<template>
	<view>
		
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
				            remarks: "强条",
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

</style>

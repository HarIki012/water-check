<template>
	<view>
		<view class="top" style="border-bottom: 1rpx solid #cacaca;"></view>
		<view class="description">
			<view class="name">描述</view>
			<view class="detail">{{data[0].description}}
				<view class="remarkContent">
					<view class="remark" v-for="(item,index) in data[0].remarks">
						<text v-if="item.detail === '强条'" class="remarkDetail" style="background-color: #bf1f00;">{{item.detail}}</text>
						<text v-if="item.detail === '重点'" class="remarkDetail" style="background-color: #ffd606;">{{item.detail}}</text>
					</view>
				</view>
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
		<button v-if="this.cameFrom === '1'" class="hs-create">生成问题</button>
		<view class="hs-feedback" @click="feedBack('top')">条款存在问题？点我反馈</view>
		
		<!-- 反馈弹窗 -->
		<uni-popup ref="popup">
			<view class="pop">
				<text class="Name">反馈内容</text>
				<textarea class="detailInfo" placeholder="请输入反馈内容..."/>
				<text class="Name">证明资料</text>
				<view class="hs-choose-pic">
					<uni-file-picker limit="3" title="最多选择3张照片"></uni-file-picker>
					
				</view>
				<button class="submit">提交</button>
			</view>
		</uni-popup>
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
				            terms: "第七条水利工程项目法人（建设单位）、监理、设计、施工等单位的负责人，对本单位的质量工作负领导责任。各单位在工程现场的项目负责人对本单位在工程现场的质量工作负直接领导责任。各单位的工程技术负责人对质量工作负技术责任。具体工作人员为直接责任人。\n第十六条2.组建建设单位由项目主管部门或投资各方负责；建设单位需具备下列条件：\n（1）具有相对独立的组织形式。内部机构设置，人员配备能满足工程建设的需要；\n（3）主要行政和技术、经济负责人是专职人员，并保持相对稳定。\n第四条（十一）水利工程建设项目法人应具备以下基本条件:3.总人数应满足工程建设管理需要，大、中、小型工程人数一般按照不少于30、12、6人配备，其中工程专业技术人员原则上不少于总人数的50%。\n4.项目法人的主要负责人、技术负责人和财务负责人应具备相应的管理能力和工程建设管理经验。其中，技术负责人应为专职人员，有从事类似水利工程建设管理的工作经历和经验，能够独立处理工程建设中的专业问题，并具备与工程建设相适应的专业技术职称。大型水利工程和坝高大于70米的水库工程项目法人技术负责人应具备水利或相关专业高级职称或执业资格，其他水利工程项目法人技术负责人应具备水利或相关专业中级以上职称或执业资格",
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
				cameFrom:0
				
			}
		},
		onLoad(value) {
			console.log(value.from)
			this.cameFrom = value.from
			console.log(this.cameFrom)
		},
		methods: {
			feedBack(){
				this.$refs['popup'].open();
			}
		}
	}
</script>

<style lang="scss" scoped>
@import url('detail.scss');
</style>

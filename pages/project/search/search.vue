<template>
	<view class="projectSearch" >
		<view class="projectStyle">
			<picker class="centerStyle" @change="projectSelect" :range="projectChoose" >
				<label style="text-align: center;height: 100%;">{{ projectselectName }}</label>
			</picker>
		</view>
		<input class="selectStyle" style="padding-left: 20rpx;" type="text" v-model="projectnameSearch" placeholder="项目名称" confirm-type="search">
	</view>
	<view class="sortBorder">
		<view class="sort" v-for="(item,index) in sort">
				<view v-if="item.delete">
					<view class="delete iconfont icon icon-shanchu2" @click="deleteTag(index)"> </view>
<!-- 					<view v-if="item.flag" class="sortItem iconfont icon icon-xiangxia1" @click = "showTag(index)">{{item.name}}</view>
					<view v-else class="sortItem iconfont icon icon-xiangyou" @click="showTag(index)">{{item.name}}</view> -->
					<view :class="item.flag ? 'sortItemOpen iconfont icon icon-xiangxia1' : 'sortItem iconfont icon icon-xiangyou'" @click="showTag(index)">{{item.name}}</view>
						<view :class="item.flag ? 'active':'border'">
							<view class="info" v-for="(item,index) in item.info">
								<view  class="detail" @click="redirectTodetail">{{item.detail}}</view>
							</view>
						</view>
				</view>
		</view>
	</view>
	<view class="sortBorder">
			<view class="sort" v-for="(item,index) in data">
				<view v-if="item.delete">
					<view class="delete iconfont icon icon-shanchu2" @click="deleteTagData(index)"> </view>
					<view :class="item.flag ? 'sortItemOpen iconfont icon icon-xiangxia1' : 'sortItem iconfont icon icon-xiangyou'" @click="showTagData(index)">{{item.description}}</view>
					<view :class="item.flag ? 'active':'border'">
						<!-- <view class="info" v-for="(item,index) in item.info"> -->
							<view  class="detail" @click="redirectTodetail">{{item.detail}}</view>
						<!-- </view> -->
					</view>
				</view>
			</view>
		</view>
<!-- 	<uni-collapse class="sortBorder"  v-for="(item,index) in sort" :open="true">
		<uni-collapse-item class="sort" title="111111">
			<view class="info" v-for="(item,index) in item.info">
				<text class="detail">{{item.detail}}</text>
			</view>
		</uni-collapse-item>
	</uni-collapse> -->
	<!-- <view>
		<checkItemDetail></checkItemDetail>
	</view> -->
</template>

<script>
	// import checkItemDetail from '/common/checkItemDetail.vue'
	export default {
		
		data() {
			return {
				flag:false,
				projectselectName: '全部',
				projectnameSearch: '',
				projectChoose: ['全部', '质量', '安全', '文明施工'],
				projectselectIndex: 0,
				sort:[
					{
						name:"土石方工程",
						flag:true,
						delete:true,
						info:[
							{
								detail:"地基处理不符合要求"
							}
						]
					},
					{
						name:"地基及基础处理工程",
						flag:true,
						delete:true,
						info:[
							{
								detail:"防渗墙施工平台、导墙修筑不满足规范或设计要求"
							},
							{
								detail:"槽孔（入岩深度、孔斜、宽度、中.........）"
							},
							{
								detail:"清孔不彻底、空地淤积厚度超标......"
							},
							{
								detail:"墙体不完整、不连续、不均匀"
							}
						]
					},
					{
						name:"现场作业安全管理",
						flag:true,
						delete:true,
						info:""
					}
				],
				data: [
				        {
				            id: 1,
				            projectName: "问题10",
				            type: "安全",
				            severity: "较严重",
				            description: "问题描述略",
				            detail: "详细描述略",
							flag:true,
							delete:true,
				        },
				        {
				            id: 2,
				            projectName: "问题2",
				            type: "质量",
				            severity: "严重",
				            description: "问题描述略",
				            detail: "详细描述略",
							flag:true,
							delete:true,
				        },
				        {
				            id: 3,
				            projectName: "问题3",
				            type: "文明施工",
				            severity: "严重",
				            description: "问题描述略",
				            detail: "详细描述略",
							flag:true,
							delete:true,
				        }
				    ],
					dataList: [],
					searchDetail: ''
			};

		},
		// components:{
		// 	checkItemDetail
		// },
		onLoad(value) {
			console.log(value.username)
			if(value.username){
				this.getSearch(value.username)
			}
		},
		computed: {
			filterList() {
				var arr = [] //定义一个空数组
				this.data.forEach((item) => arr.push(item)) //在zhiweilist查找数据放入空数组
				if (this.projectnameSearch) { //如果有这个数据
					arr = this.data.filter(item => item.name.includes(this.projectnameSearch))
					//则在zhiweilist里过滤掉filterText
				}
				if (this.projectselectName !== '全部') {
					arr = arr.filter(item => item.status.includes(this.projectselectName))
				}
				return arr
			}
		},
		methods:{
			getSearch(value){
				this.projectnameSearch = value
				console.log(this.projectnameSearch)
			},
			projectSelect(e) {
			    this.projectselectIndex = e.detail.value;
			    this.projectselectName=this.projectChoose[this.projectselectIndex]
				this.filterList
			},
			showTag(index){
				// console.log(index)
				this.sort[index].flag = !this.sort[index].flag
				// console.log(this.sort[index].flag)
			},
			deleteTag(index){
				this.sort[index].delete = !this.sort[index].delete
			},
			
			showTagData(index){
				// console.log(index)
				this.data[index].flag = !this.data[index].flag
				// console.log(this.sort[index].flag)
			},
			deleteTagData(index){
				this.data[index].delete = !this.data[index].delete
			},
			
			redirectTodetail(){
				uni.redirectTo({
					url:'/pages/project/detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import url('search.scss');
</style>

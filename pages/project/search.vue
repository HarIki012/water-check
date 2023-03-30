<template>
	<view class="projectSearch" >
		<view class="projectStyle">
			<picker class="centerStyle" @change="projectSelect" :range="projectChoose">
				<label style="text-align: center;height: 100%;">{{ projectselectName }}</label>
			</picker>
		</view>
		<input class="selectStyle" style="padding-left: 20rpx;" type="text" v-model="projectnameSearch" placeholder="项目名称" confirm-type="search">
	</view>
	<view class="sortBorder">
		<view class="sort" v-for="(item,index) in sort">
				<view v-if="item.delete">
					<view class="delete iconfont icon icon-shanchu2" @click="deleteTag(index)"> </view>
					<view v-if="item.flag" class="sortItem iconfont icon icon-xiangxia1" @click = "showTag(index)">{{item.name}}</view>
					<view v-else class="sortItem iconfont icon icon-xiangyou" @click="showTag(index)">{{item.name}}</view>
						<view class="border" :class="{active:item.flag}">
							<view class="info" v-for="(item,index) in item.info">
								<view class="detail" @click="redirectTodetail">{{item.detail}}</view>
							</view>
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
	
</template>

<script>
	export default {
		data() {
			return {
				flag:false,
				projectselectName: '全部',
				projectnameSearch: '',
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
				        },
				        {
				            id: 2,
				            projectName: "问题2",
				            type: "质量",
				            severity: "严重",
				            description: "问题描述略",
				            detail: "详细描述略",
				        },
				        {
				            id: 3,
				            projectName: "问题3",
				            type: "文明施工",
				            severity: "严重",
				            description: "问题描述略",
				            detail: "详细描述略",
				        }
				    ]
			};
		},
		
		methods:{
			showTag(index){
				// console.log(index)
				this.sort[index].flag = !this.sort[index].flag
				// console.log(this.sort[index].flag)
			},
			deleteTag(index){
				this.sort[index].delete = !this.sort[index].delete
			},
			redirectTodetail(){
				uni.redirectTo({
					url:'/pages/project/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.projectSearch{
		padding-top: 30rpx;
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
		background-color: white;
		position: sticky;
		top: 5.4%;
	}
	.projectStyle{
		margin-left: 3%;
		border-radius: 5px;
		border: 1rpx solid gray;
		text-align: center;
		align-items: center;
		flex-direction: row;
		margin-right: 1%;
		width: 25%;
		height: 70rpx;
		position: sticky;
		top: 0;
	}
	.centerStyle{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: sticky;
	}
	.selectStyle{
		border-radius: 5px;
		border: 1rpx solid gray;
		width: 64%;
		height: 70rpx;
		position: sticky;
	}
	.sortItem{
		font-size: 35rpx;
	}
	.sortBorder{
		padding-left: 15rpx;
	}
	.border{
		
		height: 0rpx;
		overflow: hidden;
		// padding-bottom: 5rpx;
	}
	.active{
		height: auto;
		overflow: visible;
	}
	.detail{
		// width: 600rpx;
		background-color: #e3e3e3;
		padding: 10rpx;
		border-radius: 10rpx;
		margin: 15rpx;
		margin-right: 60rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.delete{
		font-size: 35rpx;
		
		position: relative;
		left: 630rpx;
		top: 40rpx;
	}
</style>

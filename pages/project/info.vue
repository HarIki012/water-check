<template>
	<view class="border"  :class="{active:flag}" >
		<view class="content" style="-webkit-flex-wrap: wrap;flex-wrap: wrap; " v-for="(item,index) in list">
			<view class="projectName" style="width: 200rpx">{{item.name}}</view>
			<view class="projectName-info" style="-webkit-flex: 1;flex: 1; flex-wrap: wrap; ">{{item.info}}
			<text class="location iconfont icon icon-zhinanzhen" v-if="item.name === '项目地址'" style="color: #0099ff; " @click="location">校正定位</text>
			</view>
		</view>
		
	</view>
	<view v-if="flag" class="iconfont icon icon-xiangshang" style="font-size: 50rpx; text-align: center;border-bottom: 1rpx solid gray;" @click = "showTag"></view>
	<view v-else class="show-or-noshow iconfont icon icon-xiangxia" style="font-size: 50rpx; text-align: center;border-bottom: 1rpx solid gray;" @click = "showTag"></view>
	<view style="padding: 25rpx;border-bottom: 1rpx solid gray;"></view>
	<view class="borderDown" style="border-bottom: 1rpx solid gray;" v-for="(item,index) in checks" @tap="gonavigate()">
		<view class="contentDown">
			<view class="check" style="font-weight: 550;padding-bottom: 15rpx;">{{item.check}}</view>
			<view class="leader">{{item.leader}}：{{item.leaderName}}</view>
			<view class="teaminfo">{{item.team}}：{{item.teamName}}</view>
			<view class="end-time" style="padding-bottom: 15rpx;">{{item.endTime}}：{{item.endTimeInfo}}</view>
		</view>
		<view class="status" >
			<text v-if="item.status === '待检查'" style="color: #eebb00;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}></text>
			<text v-if="item.status === '检查中'" style="color: #00BFFF;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}></text>
			<text v-if="item.status === '已检查'" style="color: #00CD00;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}></text>
			<text v-if="item.status === '已中止'" style="color: #EE2C2C;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}></text>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			
			return {
				flag: false,
				checks:[
					{
						check:"2023年第一次检查",
						leader:"组长",
						leaderName:"张三",
						team:"组员",
						teamName:"李四，王五",
						endTime:"结束时间",
						endTimeInfo:"2023年4月8日",
						status:"待检查"
					},{
						check:"2022年年末检查",
						leader:"组长",
						leaderName:"赵六",
						team:"组员",
						teamName:"周八，郑十",
						endTime:"结束时间",
						endTimeInfo:"2022年12月20日",
						status:"已检查"
					}
				],
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
			showTag(){
				this.flag = !this.flag;
			}, 
			location(){
				uni.showToast({
					title:"校正定位成功",
					duration:1000,
				})
			},
			gonavigate(){
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/project/checks'
				})
			}
		}
	}
</script>

<style lang="scss">
	.border{
		height: 530rpx;
		overflow: hidden;
	}
	.active{
		height: auto;
		overflow: visible;
	}
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
		flex-direction: row;
	}
	.location{
		display: flex;
		justify-content: left;
		-webkit-flex: 1;flex: 1;
	}
	.borderDown{
		flex-flow: row;
		justify-content: flex-start;
		display: flex;

	}
	.contentDown{
		width: 80%;
	}
	.status{
		padding-top:85rpx ;
	}
	.check,.leader,.teaminfo,.end-time{
		padding-left: 32rpx;
		padding-top: 10rpx;
	}
	@font-face {
	  font-family: "阿里巴巴普惠体 2.0 65 Medium";font-weight: 500;src: url("//at.alicdn.com/wf/webfont/R3pFSnXNf5DJ/ySEF0qX9msER.woff2") format("woff2"),
	  url("//at.alicdn.com/wf/webfont/R3pFSnXNf5DJ/wYtU5udvc31K.woff") format("woff");
	  font-display: swap;
	}
</style>

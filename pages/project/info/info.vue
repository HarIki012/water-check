<template>
	<view class="border"  :class="{active:flag}" >
		<view class="content" style="-webkit-flex-wrap: wrap;flex-wrap: wrap; " v-for="(item,index) in list">
			<view class="projectName" style="font-weight: 100; width: 200rpx">{{item.name}}</view>
			<view class="projectName-info" style="-webkit-flex: 1;flex: 1; flex-wrap: wrap; ">{{item.info}}
			<text class="location iconfont icon icon-dingwei" v-if="item.name === '项目地址'" style="color: #0CBCC2; " @click="addressGet()">校正定位</text>
			</view>
		</view>
		
	</view>
	<view v-if="flag" class="show-container" @click = "showTag">
		<text class="show-text">收起 </text>
		<view class="show-icon iconfont icon icon-xiangshang"> </view>
	</view>
	<view v-else class="show-container" @click = "showTag">
		<text class="show-text">展开 </text>
		<view class="show-icon iconfont icon icon-xiangxia"> </view>
	</view>
	
	
	<view class="borderDown"  v-for="(item,index) in checks" @tap="gonavigate()">
		<view style="padding: 25rpx;background-color: #F0F3F5;"></view>
		<view class="contentDown">
			
			<view class="check" >{{item.check}}</view>
			<view class="status" >
				<text v-if="item.status === '待检查'" style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '检查中'" style="color: #02baf7;background-color: #dbfdff;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '已检查'" style="color: #00CD00;background-color: #e1ffe1;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '已中止'" style="color: #EE2C2C;background-color: #ffe6e6;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
			</view>
		</view>
		
		<view class="group-contianer">
			<view class="leader">{{item.leader}}：{{item.leaderName}}</view>
			<view class="teaminfo">{{item.team}}：{{item.teamName}}</view>
			<view class="end-time" style="padding-bottom: 15rpx;">{{item.endTime}}：{{item.endTimeInfo}}</view>
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
				],
				addressMessage:'',
				addressData:'',
			}
		},
		onLoad() {

		},
		methods: {
			showTag(){
				this.flag = !this.flag;
			}, 
			addressGet(){
				const that = this;
				wx.getLocation({
					type: 'wgs84',
					geocode:true,//设置该参数为true可直接获取经纬度及城市信息
					success: function (res) {
						console.log(res)
						that.addressMessage = res;
						that.addressData = res.latitude + ', ' + res.longitude
						console.log(that.addressData)
						uni.showToast({
							title: '地址更新成功',
							duration: 1500
						});
					},
					fail: function () {
						uni.showToast({
							title: '地址更新失败',
							duration: 1500
						});
					}
				});
			},
			gonavigate(){
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/project/checks/checks'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import url('info.scss');
</style>

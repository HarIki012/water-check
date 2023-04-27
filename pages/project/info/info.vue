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
	
	
	<view class="borderDown"  v-for="(item,index) in checks" @tap="gonavigate(item.patrolId,item.status)">
		<view style="padding: 25rpx;background-color: #F0F3F5;"></view>
		<view class="contentDown">
			<text v-if="item.status === '未检查'" class="check-before" style="color: #f1a532;border-left: 5px solid #f1a532;"></text>
			<text v-if="item.status === '进行中'" class="check-before" style="color: #02baf7;border-left: 5px solid #02baf7;"></text>
			<text v-if="item.status === '已提交'" class="check-before" style="color: #00CD00;border-left: 5px solid #00CD00;"></text>
			<text v-if="item.status === '已检查'" class="check-before" style="color: #00CD00;border-left: 5px solid #00CD00;"></text>
			<text v-if="item.status === '已中止'" class="check-before" style="color: #EE2C2C;border-left: 5px solid #EE2C2C;"></text>
			<view class="check" >{{item.check}}</view>
			<view class="status" >
				<text v-if="item.status === '未检查'" style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '进行中'" style="color: #02baf7;background-color: #dbfdff;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '已提交'" style="color: #00CD00;background-color: #e1ffe1;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
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
import { projectInfo_API } from '../../../api/api.js'
import { patrolByProject_API } from '../../../api/api.js'
import { basisByProject_API } from '../../../api/api.js'
import { updataProject_API } from '../../../api/api.js'
	export default {
		data() {
			
			return {
				projectTable: [],
				projectId:'', //项目ID
				flag: false,
				temp: {
					patrolId:0,
					check:"2023年第一次检查",
					leader:"组长",
					leaderName:"",
					team:"组员",
					teamName:"",
					endTime:"结束时间",
					endTimeInfo:"",
					status:""
				},
				checks:[
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
					info:"水务局,城建局",
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
				basisData:'',
			}
		},
		onLoad(value) {
			this.projectId = value.id
			this.getprojectInfo()
			this.getpatrolByProject()
			this.setBasisByProject()
		},
		methods: {
			// 获取项目详情
			async getprojectInfo(){
				projectInfo_API(this.projectId).then(res=>{
					// console.log(res)
					this.projectTable = res.data.data
					// console.log(this.projectTable)
					this.list[0].info = this.projectTable.name
					this.list[1].info = this.projectTable.district
					this.list[2].info = this.projectTable.type
					this.list[3].info = this.projectTable.address
					this.list[4].info = this.projectTable.employer
					this.list[5].info = this.projectTable.builder
					this.list[6].info = this.projectTable.supervisor
					//this.list[7].info = this.projectTable.regulator
					this.list[8].info = this.projectTable.contracts
					this.list[9].info = this.projectTable.visualProgress
				})
			},
			// 获取巡检信息
			async getpatrolByProject(){
				patrolByProject_API(this.projectId).then(res=>{
					console.log(res.data.data)
					const checksTemp = []
					for(var i = 0 ; i< res.data.data.length;i++ ){
						var teamName = ''
						for(var j = 0; j <res.data.data[i].inspectionTeams[0].expertList.length; j++){ //队员名字
							teamName = teamName + res.data.data[i].inspectionTeams[0].expertList[j].name
							if(j < res.data.data[i].inspectionTeams[0].expertList.length - 1){
								teamName = teamName +'，'
							}
						}
						this.temp = {
							patrolId:res.data.data[i].id,
							check: res.data.data[i].name, //巡检活动名,
							leader:"组长",
							leaderName:res.data.data[i].inspectionTeams.leader,
							team:"组员",
							teamName:teamName,
							endTime:"结束时间",
							endTimeInfo:res.data.data[i].patrolDate[res.data.data[i].patrolDate.length- 1],
							status:""
						}
						for(var k = 0 ;k<this.projectTable.patrolStatus.length;k++){
							if(this.projectTable.patrolStatus[k].patrol_name === this.temp.check){
								if(this.projectTable.patrolStatus[k].status === "待检查"){
									this.temp.status = "未检查"
								}else{
									this.temp.status = this.projectTable.patrolStatus[k].status
								}
								
							}
						}
						checksTemp.push(this.temp)
						//console.log(this.temp)
					}
					this.checks = checksTemp
				})
			},
			// 展开或收起
			showTag(){
				this.flag = !this.flag;
			}, 
			// 获取定位
			addressGet(){
				const that = this;
				wx.getLocation({
					type: 'wgs84',
					geocode:true,//设置该参数为true可直接获取经纬度及城市信息
					success: function (res) {
						that.addressMessage = res;
						that.addressData = res.latitude + ', ' + res.longitude
						console.log(that.addressData)
						
						uni.chooseLocation({
							latitude:res.latitude,
							longitude:res.longitude,
							success:function(result){
								that.projectTable.address = result.name
								that.projectTable.latitude = result.latitude
								that.projectTable.longitude = result.longitude
								that.list[3].info = result.name
								console.log('位置名称：' + result.name);
								console.log('详细地址：' + result.address);
								console.log('纬度：' + result.latitude);
								console.log('经度：' + result.longitude);
								console.log(that.projectTable)
								updataProject_API(that.projectTable).then(res =>{
									console.log(res.data.message)
								})
								
							}
						})
						
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
			//跳转页面
			gonavigate(id,status){
				var data = {
					projectId:this.projectId,
					patrolstatus:status,
				}
				uni.setStorage({
					key:'patrolStutas_key',
					data:data,
					success:function(){
						console.log("patrolStutas save success")
					}
				})
				uni.redirectTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/project/checks/checks?id=' + id
				})
			},
			//存储从项目获取的basis模板
			setBasisByProject(){
				basisByProject_API(this.projectId).then(res =>{
					this.basisData = res.data.data
					console.log(this.basisData)
					uni.setStorage({
						key:'template_key',
						data:this.basisData,
						success:function(){
							console.log("template save success")
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
@import url('info.scss');
</style>

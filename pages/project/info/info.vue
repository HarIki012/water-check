<template>
	<view class="border"  :class="{active:flag}" >
		<view class="content" style="-webkit-flex-wrap: wrap;flex-wrap: wrap; " v-for="(item,index) in list" :key="index">
			<view class="projectName" style="font-weight: 100; width: 200rpx">{{item.name}}</view>
			<view class="projectName-info" v-if="item.info === null" style="-webkit-flex: 1;flex: 1; flex-wrap: wrap; ">暂无数据</view>
			<view class="projectName-info" style="-webkit-flex: 1;flex: 1; flex-wrap: wrap; ">{{item.info}}
				<text class="location iconfont icon icon-dingwei" v-if="item.name === '项目地址'" @click="addressGet()">校正定位</text>
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
	
	
	<view class="borderDown"  v-for="(item,index) in checks" :key="index" @tap="gonavigate(item.patrolId,item.status,item.check,item.id,item.endTimeInfo)">
		<view style="padding: 25rpx;background-color: #F0F3F5;"></view>
		<view class="contentDown">
			<text v-if="item.status === '未检查'" class="check-before" style="color: #f1a532;border-left: 5px solid #f1a532;"></text>
			<text v-if="item.status === '进行中'" class="check-before" style="color: #02baf7;border-left: 5px solid #02baf7;"></text>
			<text v-if="item.status === '已提交'" class="check-before" style="color: #00CD00;border-left: 5px solid #00CD00;"></text>
			<text v-if="item.status === '已检查'" class="check-before" style="color: #00CD00;border-left: 5px solid #00CD00;"></text>
			<text v-if="item.status === '已中止'" class="check-before" style="color: #EE2C2C;border-left: 5px solid #EE2C2C;"></text>
			<text v-if="item.status === '已审核'" class="check-before" style="color: #ee430e;border-left: 5px solid #EE2C2C;"></text>
			<view class="check" >{{item.check}}</view>
			<view class="status" >
				<text v-if="item.status === '未检查'" style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '进行中'" style="color: #02baf7;background-color: #dbfdff;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '已提交'" style="color: #00CD00;background-color: #e1ffe1;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '已检查'" style="color: #00CD00;background-color: #e1ffe1;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '已中止'" style="color: #EE2C2C;background-color: #ffe6e6;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
				<text v-if="item.status === '已审核'" style="color: #ee430e;background-color: #ffe6e6;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
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
import { teamByProject_API } from '../../../api/api.js'
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
					info:"",
				},
					{
					name:"辖区归属",
					info:"",
				},
					{
					name:"项目类型",
					info:"",
				},
					{
					name:"项目地址",
					info:"",
				},
					{
					name:"建设单位",
					info:"",
				},
					{
					name:"施工单位",
					info:"",
				},
					{
					name:"监理单位",
					info:"",
				},
					{
					name:"监管部门",
					info:"城务局，水务局",
				},
					{
					name:"总监",
					info:"",
				},
					{
					name:"项目经理",
					info:"",
				},
					{
					name:"项目负责人",
					info:"",
				},
					{
					name:"形象进度",
					info:"50%",
				}
				],
				addressMessage:'',
				addressData:'',
				basisData:'',
				leaderName:[],
				projectTemp:'',
				patrolIdList:[],
				patrolList:[],
				teamMember:[],
				role:'',
				token:'',
				uploadData:{
					data:'',
					token:''
				},
				update:false,
				jump:0,
				
			}
		},
		onLoad(value) {
			//console.log(value)
			this.token = uni.getStorageSync('token_key')
			this.uploadData.token = this.token
			if(value.update !== undefined && value.update){
				var temp = this.checks.findIndex(item => item.id === value.patrolId)
				if(temp === -1){
					temp = 0
				}
				this.checks[temp].status = value.status
				uni.removeStorageSync('project_key');
				this.update = true
			}
			console.log(this.update + "load")
			this.projectId = value.projectId
			this.getUserRole()
			this.getprojectInfo()
			if(this.role !== "Guest"){
				console.log("获取！")
				if(this.checks.length === 0){
					this.getpatrolByProject()
					this.setBasisByProject()
				}
				
			}
		},
		onShow() {
			setTimeout(()=>{
				this.jump = 1
			},1500)
		},
		methods: {
			getUserRole(){
				var temp = uni.getStorageSync('user_key')
				this.role = temp.role
			},
			// 获取项目详情
			getprojectInfo(){
				this.uploadData.data = this.projectId
				projectInfo_API(this.uploadData).then(res=>{
					
					console.log(res)
					if(res.statusCode === 500){
						uni.showToast({
							title:"登录失效，重新登录！",
							icon:'error',
							duration:1500,
						})
						setTimeout(()=>{
							uni.setStorage({
								key:'user_key',
								data:this.userQuit,
								success:function(){
									console.log("user quit!")
								}
							})
							
							try {
								uni.clearStorageSync();
							} catch (e) {
								// error
							}
							
							uni.redirectTo({
								url:'/pages/login/login'
							})
						},1500)
					}else{
						this.projectTable = res.data.data
						// console.log(this.projectTable)
						this.list[0].info = this.projectTable.name
						this.list[1].info = this.projectTable.district
						this.list[2].info = this.projectTable.type
						this.list[3].info = this.projectTable.address
						this.list[4].info = this.projectTable.employer
						this.list[5].info = this.projectTable.builder
						this.list[6].info = this.projectTable.supervisor
						this.list[7].info = this.projectTable.regulator
						this.list[8].info = this.projectTable.director
						this.list[9].info = this.projectTable.projectManager
						this.list[10].info = this.projectTable.projectLeader
						this.list[11].info = this.projectTable.visualProgress
						// this.list[12].info = this.projectTable.visualProgress
					}
				})
			},
			// 获取巡检信息
			getpatrolByProject(){
				this.uploadData.data = this.projectId
				patrolByProject_API(this.uploadData).then(res=>{
					//console.log(res.data.data)
					this.projectTemp = res.data.data
					const checksTemp = []
					for(var i = 0 ; i< this.projectTemp.length;i++ ){
						var teamName = ''
						var teamNameList = []
						for(var j = 0; j <this.projectTemp[i].inspectionTeams[0].expertList.length; j++){ //队员名字
							teamNameList.push(this.projectTemp[i].inspectionTeams[0].expertList[j].name)
							teamName = teamName + this.projectTemp[i].inspectionTeams[0].expertList[j].name
							if(j < this.projectTemp[i].inspectionTeams[0].expertList.length - 1){
								teamName = teamName +'，'
							}
						}
						this.teamMember.push(teamNameList)
						this.temp = {
							patrolId:this.projectTemp[i].id,
							check: this.projectTemp[i].name, //巡检活动名,
							leader:"组长",
							leaderName:this.leaderName,
							team:"组员",
							teamName:teamName,
							endTime:"结束时间",
							endTimeInfo:this.projectTemp[i].patrolDate[this.projectTemp[i].patrolDate.length- 1],
							status:"",
							id:''
						}
						
						this.patrolIdList.push(this.projectTemp[i].id)
						
						for(var k = 0 ;k<this.projectTable.patrolStatus.length;k++){
							if(this.projectTable.patrolStatus[k].patrol_name === this.temp.check){
								if(this.projectTable.patrolStatus[k].status === "待检查"){
									this.temp.status = "未检查"
								}else{
									this.temp.status = this.projectTable.patrolStatus[k].status
								}
							}
						}
						if(this.projectTable.patrolStatus.length === 0){
							this.temp.status = "进行中"
						}
						checksTemp.push(this.temp)
						//console.log(this.temp)
					}
					this.checks = checksTemp
					this.getLeaderName()
					console.log(this.checks)
				})
			},
			async getLeaderName(){
				// 返回的值，按id从大到小排序
				for(var i = 0;i<this.patrolIdList.length;i++){
					var idtemp={
						id:Number(this.projectId),
						patrolId:this.patrolIdList[i]
					}
					this.uploadData.data = idtemp
					await teamByProject_API(this.uploadData).then(res => {
						this.patrolList.push(res.data.data)
					})
				}
				//console.log(this.patrolList)
				for(var i = 0;i<this.checks.length;i++){
					this.checks[i].leaderName = this.patrolList[i].leader
					this.checks[i].id = this.patrolList[i].id
					var teamName = ''
					for(var j = 0; j <this.patrolList[i].expertList.length; j++){ //队员名字
						teamName = teamName + this.patrolList[i].expertList[j].name
						if(j < this.patrolList[i].expertList.length - 1){
							teamName = teamName +'，'
						}
					}
					this.checks[i].teamName = teamName
				}
				//console.log(this.checks)
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
						//console.log(that.addressData)
						
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
								that.uploadData.data = that.projectTable
								updataProject_API(that.uploadData).then(res =>{
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
			gonavigate(id,status,name,teamid,time){
				try{
					var expert = uni.getStorageSync('user_key')
					var username = expert.name
					var session = {
						id:id,
						projectId:this.projectId,
						patrolstatus:status,
						patrolname:name,
						teamId:teamid,
						projectName:this.list[0].info,
						deadline:time,
					}
					console.log(session)
					uni.setStorage({
						key:'patrolStutas_key',
						data:session,
						success:function(){
							console.log("patrolStutas save success")
						},
						fail:function(){
							console.log("失败")
						}
					})
				}catch(e){
					
				}
				let temp = {
					id:id,
					url:Date.now(),
					projectId:this.projectId,
					patrolstatus:status,
					teamid:teamid,
					deadline:time,
				}
				console.log(this.jump)
				if(this.jump === 1){
					uni.navigateTo({
						//保留当前页面，跳转到应用内的某个页面
						url: '/pages/project/checks/checks?id=' + JSON.stringify(temp)
					})
				}
			},
			//存储从项目获取的basis模板
			setBasisByProject(){
				this.uploadData.data = this.projectId
				basisByProject_API(this.uploadData).then(res =>{
					this.basisData = res.data.data
					//console.log(this.basisData)
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

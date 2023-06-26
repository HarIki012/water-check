<template>
	<view class="backgroundStyle">
		<view class="stick-bar">
			<view v-if="this.osName === 'android'" class="wx-top">
				<!-- 搜索图标 -->
				<image src="/static/img/fanhui1.png" @click="openPop" class="create-button"></image>
				<!-- <view class="create-button iconfont icon icon-new_document" @click="openPop"></view> -->
				<view class="create-word" @click="openPop">新建项目</view>
				<view class="title-word">项目列表</view>
			</view>
			<view v-else class="ios-top">
				<!-- 搜索图标 -->
				<image src="/static/img/fanhui1.png" @click="openPop" class="create-button-ios"></image>
				<!-- <view class="create-button iconfont icon icon-new_document" @click="openPop"></view> -->
				<view class="create-word-ios" @click="openPop">新建项目</view>
				<view class="title-word-ios">项目列表</view>
			</view>
			
			
			<view class="projectSearch">
				<view class="projectStyle" >
					<picker class="centerStyle" @change="projectSelect" :range="projectChoose">
						<label style="color: #0D72BE;margin-right: 10rpx;">{{ projectselectName }}</label>
						<text class="iconfont icon icon-xiangxia"></text>
					</picker>
					<!-- <label style="color: #0D72BE;margin-right: 10rpx;">{{ projectselectName }}</label>
					<text class="iconfont icon icon-xiangxia"></text> -->
				</view>
				<view class="selectStyle">
					<image src="../../../static/img/sousuo.png" class="search-icon"></image>
					<input type="text" v-model="projectnameSearch" placeholder="项目名称" confirm-type="search">
				</view>
				<text class="searchButton">搜索</text>
			</view>
		</view>
		
		<view >
			<view class="tableStyle" v-for="(item,index) in filterList" :key="item.id" @click="navigatortoinfo(item.id)">
				<view class="tableContent" style="display: flex;align-items: center;">
					<image class="gongdan-icon" src="../../../static/img/gongdan1.png"></image>
					<!-- <view class="logoItem iconfont icon icon-chazhao" style="display: flex;align-items: center;"></view> -->
					<view style="width: 80%;display: flex;align-items: center;">
						{{item.name}}
					</view>
				</view>
				
				<view class="statusStyle"> 
					<view style="display: flex;width: 100%;justify-content: flex-end;">
						<text style="color: #BFBFBF;">状态：</text>
						<view v-if="item.patrolStatus !== null && item.patrolStatus.length !== 0">
							<text v-if="item.status === '未检查'" style="color: #FF881A;background-color: #FFF4EA;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<text v-if="item.status === '待检查'" style="color: #FF881A;background-color: #FFF4EA;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<text v-if="item.status === '未开始'" style="color: #FF881A;background-color: #FFF4EA;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<text v-if="item.status === '检查中'" style="color: #399CFF;background-color: #EBF5FF;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<text v-if="item.status === '已检查'" style="color: #00D64F;background-color: #E6FBEE;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<text v-if="item.status === '已中止'" style="color: #FF4538;background-color: #FFEDEC;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<text v-if="item.status === '已提交'" style="color: #00D64F;background-color: #E6FBEE;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<text v-if="item.status === '已审核'" style="color: #FF4538;background-color: #FFEDEC;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
							<!-- <text v-else style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">未开始</text> -->
						</view>
						<view v-else>
							<text style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">未开始</text>
						</view>
					</view>
				</view>
				
				<view class="patrol-container">
					<text class="patrol-name">{{ item.patrolName }}</text>
				</view>
			</view>
		</view>
		
		
		<!-- 新建项目弹窗 -->
		<uni-popup ref="popup">
			<view class="pop">
				<view class="newStyle">
					<text style="width: 100%;text-align: center;padding-left: 50rpx;">新建项目 </text>
					<view class="iconfont icon icon-shanchu2" style="margin-right: 30rpx;" @click="closeButton"></view>
				</view>
				<view class="popup-use">
					<text style="color: #0D72BE;">项目名称</text>
					<text style="color: red;"> *</text>
				</view>
				<view class="popup-use1">
					<input class="input-style" style="padding-left: 20rpx;" placeholder="请输入项目名称" type="text" v-model="newProjectname" confirm-type="done" @confirm="oldInput">
				</view>
				
				<view class="popup-use">
					<text style="color: #0D72BE;">所属巡检活动 </text>
					<text style="color: red;"> *</text>
				</view>
				<view class="popup-use1">
					<view class="project-time">
						<picker style="width: 90%;" @change="dateSelect" :range="patrolList">
							<label class="label-style">{{ dateName }}</label>
						</picker>
						<picker @change="dateSelect" :range="patrolList">
							<text class="iconfont icon icon-xiangxia"></text>
						</picker>
					</view>
				</view>
				
				<view class="popup-use">
					<text style="color: #0D72BE;">所属巡检小组 </text>
					<text style="color: red;"> *</text>
				</view>
				<view class="popup-use1">
					<view class="project-time">
						<picker style="width: 90%;" @change="teamSelect" :range="teamsList" :disabled="chooseTeam">
							<label v-if="teamName !== ''" class="label-style">{{ teamName }}组</label>
							<label v-else class="label-style">请选择巡检小组</label>
						</picker>
						<picker @change="teamSelect" :range="teamsList" :disabled="chooseTeam">
							<text class="iconfont icon icon-xiangxia"></text>
						</picker>
					</view>
					<!-- <view v-else class="project-time">
						<picker style="width: 90%;" @change="teamSelect" :range="teamsList" disabled=true>
							<label v-if="teamName !== ''" class="label-style">{{ teamName }}组</label>
							<label v-else class="label-style">请选择巡检小组</label>
						</picker>
						<picker @change="teamSelect" :range="teamsList">
							<text class="iconfont icon icon-xiangxia"></text>
						</picker>
					</view> -->
				</view>
				
				<view class="popup-use">
					<view style="width: 65%;text-align: left;color: #0D72BE;">
						项目地址
					</view>
					<view style="width: 35%;text-align: right;color: #0CBCC2;" @tap="addressGet">
						<image style="height: 30rpx;width: 30rpx;" src="../../../static/img/huoqu1.png" ></image>
						点击定位
					</view>
				</view>
				<view class="popup-use1">
					<input class="input-style" style="padding-left: 20rpx;" v-if="upData" type="text" v-model="addressData" confirm-type="done">
				</view>
				
				<button v-if="this.newProjectname && this.dateName !== this.firstName && this.teamName" class="buttonStyle"  @tap="closePop('top')">确 定</button>	
				<button v-else class="buttonStyle-disabled" >确 定</button>
				
			</view>
		</uni-popup>
		
		<uni-popup ref="area" type="top" class="area-popup">
			<view class="area-container">
				<button>江岸区</button>
			</view>
		</uni-popup>
		
		<tabbar-shadow></tabbar-shadow>
	</view>
</template>

<script>
import { warn } from "vue"
import { projectsAll_API } from '../../../api/api.js'
import { projectsAllnew_API } from '../../../api/api.js'
import { createProject_API } from '../../../api/api.js'
import { getpatrolsAll_API } from '../../../api/api.js'
import { teamsAll_API } from '../../../api/api.js'
import { updataPatrol_API } from '../../../api/api.js'
import { teamBindProject_API } from '../../../api/api.js'
import { projectByExpert_API } from '../../../api/api.js'
	export default {
		data() {
			return {
				projectTable: [],
				newProjectname: '',
				isNew: '',
				blankSpace: '',
				dateChooseOld: ['2023年第一次检查','2023年第二次检查','2023年第三次检查','2023年第四次检查','2023年第五次检查','2023年第六次检查'],
				dateChoose: ['水务局试用巡检活动','自定义测试巡检'],
				patrolList:[],
				patrolidList:[],
				projectChoose: ['区域选择',"洪山区","东湖风景区","汉阳区","江汉区","武昌区","江夏区","东西湖区","青山区","硚口区","东湖高新区","新洲区","蔡甸区","江岸区","经开区","黄陂区"],
				projectselectIndex: 0,
				dateIndex: 0,
				projectselectName: '区域选择',
				projectnameSearch: '',
				dateName:'请选择巡检活动',
				firstName:'请选择巡检活动',
				addressMessage: '',
				addressData: '',
				buttonUse: false,
				upData: true,
				sumData:10,
				testArr: '',
				loginData:{},
				role:'',
				token:'',
				patrolChange:'',
				teamsList:[],
				teamName:'',
				teamId:'',
				teamlistIndex:'',
				latitude:null,
				longitude:null,
				newproId:'',
				allpatrolList:'',
				modifyPatrol:'',
				testT:'1',
				teamidList:[],
				chooseTeam:true,
				osName:'',
			}
		},
		computed: {
			filterList() {
				var arr = [] //定义一个空数组
				if(this.projectTable.length === 0){
					
				}else{
					this.projectTable.forEach((item) => arr.push(item)) //在zhiweilist查找数据放入空数组
					if (this.projectnameSearch) { //如果有这个数据
						arr = this.projectTable.filter(item => item.name.includes(this.projectnameSearch))
						//则在zhiweilist里过滤掉filterText
					}
					if (this.projectselectName !== '区域选择') {
						arr = this.projectTable.filter(item => item.district.includes(this.projectselectName))
					}
					console.log(arr)
				}
				return arr
			},
			
		},
		onLoad() {
			this.getOSName()
			this.checkLogin()
		},
		onPullDownRefresh () {
			console.log('触发了下拉刷新')	
			this.checkLogin()
			setTimeout(()=>{
				uni.removeStorageSync('project_key');
				uni.stopPullDownRefresh()
			},500)
		},
		methods: {
			// 获取平台名称进行不同编译
			getOSName(){
				const that = this
				uni.getSystemInfo({
					success: function(res) {
						that.osName = res.osName
						console.log("使用机型为：",that.osName)
					}
				})
				// var test =  uni.getWindowInfo()
				// console.log(test)
			},
			openPopArea(){
				this.$refs.area.open()
			},
			//检测登录状态
			checkLogin(){
				try{
					this.loginData = uni.getStorageSync('user_key')
					console.log(this.loginData)
					this.token = uni.getStorageSync('token_key')
					console.log(this.token)
					if(this.token === undefined || this.token === ''){
						uni.redirectTo({
							url:'/pages/login/login'
						})
						//console.log(this.loginData.isLogin)
					}else{
						this.role = this.loginData.role
						this.getallProjects()
						this.getPatrols()
						// this.getTeams()
					}
				}catch(e){

				}
			},
			getTeams(){
				var tempData = {
					token:this.token
				}
				teamsAll_API(tempData).then(res=>{
					// console.log(res)
					var tempTeams = res.data.data
					//console.log(tempTeams)
					for(var i=0;i<tempTeams.length;i++){
						this.teamsList.push(tempTeams[i].id)
					}
					//console.log(this.teamsList)
				})
			},
			getPatrols(){
				var tempData = {
					token:this.token
				}
				getpatrolsAll_API(tempData).then(res=>{
					// console.log(res)
					var tempPatrol = res.data.data
					this.allpatrolList = tempPatrol
					//console.log(tempPatrol)
					for(var i=0;i<tempPatrol.length;i++){
						this.patrolidList.push({
							id: tempPatrol[i].id,
							name: tempPatrol[i].name
						})
						this.patrolList.push(tempPatrol[i].name)
					}
					//console.log(this.patrolList)
					
					//console.log(this.patrolidList)
				})
				
			},
			// 获取巡检活动(该方法废弃)
			getProjects(){
				
				var tranData = {
					data:{
						page:1,
						size:this.sumData,
						},
					token:this.token
				}
				try{
					projectsAllnew_API(tranData).then(res=>{
						console.log(res)
						this.sumData = res.data.data.count
						//console.log(res.data.data.data)
						this.getallProjects()
					})
				}catch(e){

				}
			},
			getallProjects(){
				uni.showLoading({
				    title: '加载中',
				})
				var tranData = {
					id:this.loginData.id,
					token:this.token
				}
				// projectsAllnew_API(tranData).then(result=>{
				// 	this.projectTable = result.data.data.data
				// 	console.log(this.projectTable)
				// 	console.log("数据获取成功！")
				// 	uni.hideLoading();
				// 	uni.setStorage({
				// 		key:'project_key',
				// 		data:this.projectTable,
				// 		success: function() {
				// 			console.log('project save success!')
				// 		}
				// 	});
				// })
				// console.log(tranData)
				
				// 获取每个专家有关的项目
				projectByExpert_API(tranData).then(res=>{
					let projectShow = []
					
					this.projectTable = res.data.data
					this.projectTable.forEach(item => {
						for(var title in item){
							var status = title.slice(-3)
							item[title].patrolName = title
							item[title].status = status
							projectShow.push(item[title])
						}
					})
					this.projectTable = projectShow
					uni.hideLoading();
				})
			
			},
			navigatortoinfo(id){
				uni.navigateTo({
					url:'/pages/project/info/info?projectId=' + id
				})
			},
			openPop(){
				if(this.role !== "Guest"){
					this.newProjectname = this.blankSpace
					this.errorTips1 = this.blankSpace
					this.errorTips2 = this.blankSpace
					this.dateName = this.firstName
					this.addressData = this.blankSpace
					this.teamName = this.blankSpace
					this.chooseTeam = true
					this.$refs['popup'].open();
				}
			},
			closePop() {
				uni.showLoading({
					title: '新建项目中'
				})
				var newProject = {
				  "name": this.newProjectname,
				  "type": "市政",
				  "district": "",
				  "address": this.addressData,
				  "longitude": this.longitude,
				  "latitude": this.latitude,
				  "employer": "",
				  "builder": "",
				  "supervisor": "",
				  "projectLeader": "",
				  "projectManager": "",
				  "director": "",
				  "patrolStatus": [
					{
					  "patrol_name": this.dateName,
					  "status": "待检查"
					}
				  ],
				  "regulator": null,
				  "visualProgress": null,
				  "template": null
				}
				var data = {
					newProject:newProject,
					token:this.token
				}
				//console.log(newProject)
				
				createProject_API(data).then(res=>{
					//console.log(res.data.data)
					if (res.data.message === 'success') {
						this.newproId = res.data.data.id
						uni.hideLoading();
						uni.showToast({
							title: '添加成功!',
							duration: 1000
						});
						this.modifyPatrol.projectIds.push(this.newproId + "")
						//console.log(this.modifyPatrol)
						var patrolData = {
							data:this.modifyPatrol,
							token:this.token
						}
						updataPatrol_API(patrolData).then(res1=>{
							console.log(res1)
						})
						var teamData = {
							teamid:this.teamId,
							data:[this.newproId],
							token:this.token
						}
						//console.log(teamData)
						teamBindProject_API(teamData).then(res2=>{
							console.log(res2)
						})
					} else {
						uni.hideLoading();
						uni.showToast({
							icon:"error",
							title: '添加失败!',
							duration: 1000
						});
					}
				})
				this.teamsList=[]
				this.$refs['popup'].close()
				this.getProjects()
			},
			closeButton(){
				this.$refs['popup'].close()
			},
			oldInput() {
				if (this.newProjectname){
					this.errorTips1 = 0
				} else {
					this.errorTips1 = 1
				}
			},
			dateSelect(e) {
			    this.dateIndex = e.detail.value;
			    this.dateName=this.patrolList[this.dateIndex]
				var patrolTemp = this.patrolidList.filter(item=>{
					return item.name === this.dateName
				})[0]
				this.modifyPatrol = this.allpatrolList.filter(item=>{
					return item.name === this.dateName
				})[0]
				console.log(this.modifyPatrol)
				var tempTeams = this.modifyPatrol.inspectionTeams
				console.log(tempTeams)
				for(var i=0;i<tempTeams.length;i++){
					this.teamsList.push(tempTeams[i].leader)
					this.teamidList.push({
						id:tempTeams[i].id,
						leader:tempTeams[i].leader
					})
				}
				console.log(this.teamsList)
				console.log(patrolTemp)
				console.log(this.teamidList)
				this.patrolChange = patrolTemp
				this.chooseTeam = false
			},
			teamSelect(e){
				this.teamlistIndex = e.detail.value;
				this.teamName=this.teamsList[this.teamlistIndex]
				console.log(this.teamName)
				var teamidTemp = this.teamidList.filter(item=>{
					return item.leader === this.teamName
				})[0]
				this.teamId = teamidTemp.id
				console.log(this.teamId)
			},
			projectSelect(e) {
			    this.projectselectIndex = e.detail.value;
			    this.projectselectName=this.projectChoose[this.projectselectIndex]
				this.filterList
			},
			addressGet(){
				const that = this;
				// if (this.addressMessage) {
				// 	that.addressData = '(' + that.addressMessage.latitude + ', ' + that.addressMessage.longitude + ')'
				// }
				wx.getLocation({
					type: 'wgs84',
					geocode:true,//设置该参数为true可直接获取经纬度及城市信息
					success: function (res) {
						//console.log(res)
						
						uni.chooseLocation({
							latitude:res.latitude,
							longitude:res.longitude,
							success:function(result){
								that.addressData = result.name
								that.latitude = result.latitude
								that.longitude = result.longitude
								
								console.log('位置名称：' + result.name);
								console.log('详细地址：' + result.address);
								console.log('纬度：' + result.latitude);
								console.log('经度：' + result.longitude);
								console.log(that.projectTable)
							}
						})
					},
					fail: function () {
						uni.showToast({
							title: '地址获取失败',
							duration: 1500
						});
					}
				});
			},
			
		},
	}
</script>

<style lang="scss" scoped>
@import url('project.scss');
</style>

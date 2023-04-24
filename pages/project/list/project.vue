<template>
	<view class="backgroundStyle">
		<view class="stick-bar">
			<view class="wx-top">
				<!-- 搜索图标 -->
				<view class="create-button iconfont icon icon-new_document" @click="openPop"></view>
				<view class="create-word" @click="openPop">新建</view>
				<view class="title-word">项目列表</view>
			</view>
			<view class="projectSearch">
				<view class="projectStyle">
					<picker class="centerStyle" @change="projectSelect" :range="projectChoose">
						<label style="color: #929293;margin-right: 10rpx;">{{ projectselectName }}</label>
						<text class="iconfont icon icon-xiangxia"></text>
					</picker>
				</view>
				<view class="selectStyle">
					<image class="logo iconfont icon icon-chazhao" ></image>
					<input type="text" v-model="projectnameSearch" placeholder="项目名称" confirm-type="search">
				</view>
				<text class="searchButton">搜索</text>
			</view>
		</view>
		
		
		
		<view >
			<view class="tableStyle" v-for="(item,index) in filterList" :key="item.id" @click="navigatortoinfo(item.id)">
				<view class="tableContent" style="display: flex;align-items: center;">
					<view class="logoItem iconfont icon icon-chazhao" style="display: flex;align-items: center;"></view>
					<view style="width: 80%;display: flex;align-items: center;">
						{{item.name}}
					</view>
				</view>
				
				<view class="statusStyle">
					<view style="display: flex;width: 100%;justify-content: flex-end;">
						<text style="color: darkgray;">状态：</text>
						<view v-if="item.patrolStatus !== null && item.patrolStatus.length !== 0">
							<text v-if="item.patrolStatus[0].status === '待检查'" style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.patrolStatus[0].status}}</text>
							<text v-if="item.patrolStatus[0].status === '检查中'" style="color: #02baf7;background-color: #dbfdff;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.patrolStatus[0].status}}</text>
							<text v-if="item.patrolStatus[0].status === '已检查'" style="color: #00CD00;background-color: #e1ffe1;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.patrolStatus[0].status}}</text>
							<text v-if="item.patrolStatus[0].status === '已中止'" style="color: #EE2C2C;background-color: #ffe6e6;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.patrolStatus[0].status}}</text>
						</view>
						<view v-else>
							<text style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">待检查</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 新建项目弹窗 -->
		<uni-popup ref="popup">
			<view class="pop">
				<view class="newStyle">
					<text style="width: 100%;text-align: center;padding-left: 50rpx;">新建项目</text>
					<view class="iconfont icon icon-shanchu2" style="margin-right: 30rpx;" @click="closeButton"></view>
				</view>
				<view class="popup-use">
					<text style="color: #5547ae;">项目名称</text>
					<text style="color: red;">*</text>
				</view>
				<view class="popup-use1">
					<input class="input-style" style="padding-left: 20rpx;" placeholder="请输入项目名称" type="text" v-model="newProjectname" confirm-type="done" @confirm="oldInput">
				</view>
				
				<view class="popup-use">
					<text style="color: #5547ae;">所属巡检活动</text>
					<text style="color: red;">*</text>
				</view>
				<view class="popup-use1">
					<view class="project-time">
						<picker style="width: 90%;" @change="dateSelect" :range="dateChoose">
							<label class="label-style">{{ dateName }}</label>
						</picker>
						<picker @change="dateSelect" :range="dateChoose">
							<text class="iconfont icon icon-xiangxia"></text>
						</picker>
					</view>
				</view>
				
				<view class="popup-use">
					<view style="width: 70%;text-align: left;color: #5547ae;">
						经纬度
					</view>
					<view style="width: 30%;text-align: right;color: #83ABC7;" @tap="addressGet">
						<text class="iconfont icon icon-xiangxia"></text>
						获取
					</view>
				</view>
				<view class="popup-use1">
					<input class="input-style" style="padding-left: 20rpx;" v-if="upData" type="text" v-model="addressData" confirm-type="done">
				</view>
				
				<button v-if="this.newProjectname && this.dateName !== this.firstName" class="buttonStyle" type="primary" @tap="closePop('top')">确定</button>	
				<button v-else class="buttonStyle" type="primary" disabled="true" @tap="closePop('top')">确定</button>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { warn } from "vue"
import { patrolAll_API } from '../../../api/api.js'
import { projectsAll_API } from '../../../api/api.js'
import { createProject_API } from '../../../api/api.js'
	export default {
		data() {
			return {
				projectTable: [],
				newProjectname: '',
				isNew: '',
				blankSpace: '',
				dateChoose: ['2023年第一次检查','2023年第二次检查','2023年第三次检查','2023年第四次检查','2023年第五次检查','2023年第六次检查'],
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
				testArr: ''
			}
		},
		computed: {
			filterList() {
				var arr = [] //定义一个空数组
				this.projectTable.forEach((item) => arr.push(item)) //在zhiweilist查找数据放入空数组
				if (this.projectnameSearch) { //如果有这个数据
					arr = this.projectTable.filter(item => item.name.includes(this.projectnameSearch))
					//则在zhiweilist里过滤掉filterText
				}
				if (this.projectselectName !== '区域选择') {
					arr = this.projectTable.filter(item => item.district.includes(this.projectselectName))
						// if (item.patrolStatus !== null && item.patrolStatus.length !== 0){
						// 	if (item.patrolStatus[0].status === this.projectselectName) {
						// 		return true
						// 	}
						// 	// item.patrolStatus[0].status.includes(this.projectselectName)
						// }
				}
				return arr
			}
		},
		onLoad() {
			this.getProjects()
		},
		methods: {
			// 获取巡检活动
			getProjects(){
				uni.showLoading({
				    title: '加载中',
				})
				var tranData = {
					page:1,
					size:this.sumData
				}
				projectsAll_API(tranData).then(res=>{
					// console.log(res)
					this.sumData = res.data.data.count
					console.log(res.data.data.data)
					this.getallProjects()
					
				})
			},
			getallProjects(){
				var tranData = {
					page:1,
					size:this.sumData
				}
				projectsAll_API(tranData).then(result=>{
					console.log(result.data.data.data)
					this.projectTable = result.data.data.data
					console.log("数据获取成功！")
					uni.hideLoading();
					console.log("隐藏加载！")
					uni.setStorage({
						key:'project_key',
						data:this.projectTable,
						success: function() {
							console.log('project save success!')
						}
					});
					console.log("存储数据！")
					
				})
			
			},
			navigatortoinfo(id){
				uni.navigateTo({
					url:'/pages/project/info/info?id=' + id
				})
			},
			openPop(){
				this.newProjectname = this.blankSpace
				this.errorTips1 = this.blankSpace
				this.errorTips2 = this.blankSpace
				this.dateName = this.firstName
				this.addressData = this.blankSpace
				this.$refs['popup'].open();
			},
			closePop() {
				uni.showLoading({
				                    title: '新建项目中'
				                })
				var newProject = {
				  "name": this.newProjectname,
				  "type": "水务工程",
				  "district": "青山区",
				  "address": "青山区友谊大道XXXX",
				  "employer": "XXX有限公司",
				  "builder": "XXX建设有限公司",
				  "supervisor": "XXX工程管理有限公司",
				  "patrolStatus": [{"patrol_name":this.dateName,"status":"待检查"}],
				  "regulator": "监管部门1",
				  "contracts": "监理-XXX-18888888888",
				  "visualProgress": "0%",
				}
				console.log(newProject)
				createProject_API(newProject).then(res=>{
					console.log(res.data.data)
					if (res.data.message === 'success') {
						uni.hideLoading();
						uni.showToast({
							title: '添加成功!',
							duration: 1000
						});
					} else {
						uni.hideLoading();
						uni.showToast({
							icon:"error",
							title: '添加失败!',
							duration: 1000
						});
					}
				})
				this.$refs['popup'].close()
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
			    this.dateName=this.dateChoose[this.dateIndex]
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
						console.log(res)
						that.addressMessage = res;
						that.addressData = res.latitude + ', ' + res.longitude
						console.log(that.addressData)
						uni.showToast({
							title: '地址获取成功',
							duration: 1500
						});
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

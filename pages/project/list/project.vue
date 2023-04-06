<template>
	<view class="backgroundStyle">
		<view class="projectSearch">
			<view class="projectStyle">
				<picker class="centerStyle" @change="projectSelect" :range="projectChoose">
					<label style="color: #929293;">{{ projectselectName }}</label>
					<text class="iconfont icon icon-xiangxia"></text>
				</picker>
			</view>
			<view class="selectStyle">
				<image class="logo iconfont icon icon-chazhao" ></image>
				<input type="text" v-model="projectnameSearch" placeholder="项目名称" confirm-type="search">
			</view>
			<text class="searchButton">搜索</text>
		</view>
		<view style="width: 100%;" @click="navigatortoinfo()">
			<view class="tableStyle" v-for="(item,index) in filterList">
				<view class="tableContent">
					<view class="logoItem iconfont icon icon-chazhao"></view>
					<view style="width: 80%;">
						{{item.name}}
					</view>
				</view>
				
				<view class="statusStyle">
					<text style="color: darkgray;">状态：</text>
					<text v-if="item.status === '待检查'" style="color: #f1a532;background-color: #fef7eb;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
					<text v-if="item.status === '检查中'" style="color: #02baf7;background-color: #dbfdff;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
					<text v-if="item.status === '已检查'" style="color: #00CD00;background-color: #e1ffe1;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
					<text v-if="item.status === '已中止'" style="color: #EE2C2C;background-color: #ffe6e6;border-radius: 20rpx;padding: 5rpx 15rpx 5rpx 15rpx;">{{item.status}}</text>
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
					<input class="oldStyle" style="padding-left: 20rpx;" placeholder="请输入项目名称" type="text" v-model="newProjectname" confirm-type="done" @confirm="oldInput">
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
					<input class="oldStyle" style="padding-left: 20rpx;" v-if="upData" type="text" v-model="addressData" confirm-type="done">
				</view>
				
				<button v-if="this.newProjectname && this.dateName !== this.firstName" class="buttonStyle" type="primary" @tap="closePop('top')">确定</button>	
				<button v-else class="buttonStyle" type="primary" disabled="true" @tap="closePop('top')">确定</button>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { warn } from "vue"
	export default {
		data() {
			return {
				projectTable:[
					{
						name:'2017年江岸区沿江商务区现状道路雨污管涵完善工程',
						status:'待检查',
					},
					{
						name:'百步亭路（兴业路-幸福街）道排工程',
						status:'已中止',
					},
					{
						name:'建设渠（幸福二路明渠-黄孝河明渠）综合整治工程',
						status:'已检查',
					},
					{
						name:'2018年江岸区沿江商务区现状道路雨污管涵完善工程',
						status:'待检查',
					},
					{
						name:'1111百步亭路（兴业路-幸福街）道排工程',
						status:'检查中',
					},
					{
						name:'1111建设渠（幸福二路明渠-黄孝河明渠）综合整治工程',
						status:'已检查',
					},
				],
				newProjectname: '',
				isNew: '',
				blankSpace: '',
				dateChoose: ['2023年第一次检查','2023年第二次检查','2023年第三次检查','2023年第四次检查','2023年第五次检查','2023年第六次检查'],
				projectChoose: ['区域选择', '待检查', '检查中', '已检查', '已中止'],
				projectselectIndex: 0,
				dateIndex: 0,
				projectselectName: '区域选择',
				projectnameSearch: '',
				dateName:'请选择巡检活动',
				firstName:'请选择巡检活动',
				addressMessage: '',
				addressData: '',
				buttonUse: false,
				upData: true
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
					arr = arr.filter(item => item.status.includes(this.projectselectName))
				}
				return arr
			},
			activeButton(){
				if (this.newProjectname && this.dateName !== this.firstName) {
					this.buttonUse = false
				} else {
					this.buttonUse = true
				}
			}
		},
		methods: {
			navigatortoinfo(){
				uni.navigateTo({
					url:'/pages/project/info/info'
				})
			},
			closePop() {
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
				uni.getLocation({
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
		onNavigationBarButtonTap(e) {
			this.newProjectname = this.blankSpace
			this.errorTips1 = this.blankSpace
			this.errorTips2 = this.blankSpace
			this.dateName = this.firstName
			this.addressData = this.blankSpace
			this.$refs['popup'].open();
		},
	}
</script>

<style lang="scss" scoped>
@import url('project.scss');
</style>

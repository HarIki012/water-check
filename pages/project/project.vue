<template>
	<view class="backgroundStyle">
		<view class="projectSearch">
			<view class="projectStyle">
				<picker class="centerStyle" @change="projectSelect" :range="projectChoose">
					<label>{{ projectselectName }}</label>
					<text class="show-or-noshow iconfont icon icon-xiangxia"></text>
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
					<text style="width: 100%;text-align: center;padding-left: 30rpx;">新建项目</text>
					<view class="iconfont icon icon-shanchu2" style="margin-right: 10rpx;" @click="closeButton"></view>
				</view>
				<view class="popup-use">
					<text style="color: red;">*</text>
					项目名称
				</view>
				<view class="popup-use1">
					<input class="oldStyle" style="padding-left: 20rpx;" type="text" v-model="newProjectname" confirm-type="done" @confirm="oldInput">
				</view>
				<view class="popup-use1">
					<view class="error" v-if="errorTips1===1">
						<text class="error-text">输入的项目名称不能为空！</text>
					</view>
				</view>
				
				<view class="popup-use1">
					<text style="color: red;">*</text>
					所属巡检活动
				</view>
				<view class="popup-use1">
					<view class="oldStyle">
						<picker class="centerStyle" @change="dateSelect" :range="dateChoose">
							<label >{{ dateName }}</label>
						</picker>
					</view>
				</view>
				<view class="popup-use1">
					<view class="error" v-if="errorTips2===1">
						<text class="error-text">请选择所属巡检活动！</text>
					</view>
				</view>
				
				<view class="popup-use">
					<view style="width: 80%;text-align: left;">
						经纬度
					</view>
					<view style="width: 20%;text-align: right;color: blue;" @tap="addressGet">
						获取
					</view>
				</view>
				<view class="popup-use1">
					<input class="oldStyle" style="padding-left: 20rpx;" v-if="upData" type="text" v-model="addressData" confirm-type="done">
				</view>
		
				<button class="buttonStyle"  type="primary" @tap="closePop('top')">
					确定
				</button>
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
				errorTips1: '',
				errorTips2: '',
				errorTips3: '',
				blankSpace: '',
				dateChoose: ['2023年第一次检查','2023年第二次检查','2023年第三次检查','2023年第四次检查','2023年第五次检查','2023年第六次检查'],
				projectChoose: ['区域选择', '待检查', '检查中', '已检查', '已中止'],
				projectselectIndex: 0,
				dateIndex: 0,
				projectselectName: '区域选择',
				projectnameSearch: '',
				dateName:'---请选择---',
				firstName:'---请选择---',
				addressMessage: '',
				addressData: '',
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
			}
		},
		methods: {
			navigatortoinfo(){
				uni.navigateTo({
					url:'/pages/project/info'
				})
			},
			closePop() {
				if (!this.newProjectname){
					this.errorTips1 = 1
				} else {
					this.errorTips1 = 0
				}
				if (this.dateName === this.firstName) {
					this.errorTips2 = 1
				} else {
					this.errorTips2 = 0
				}
				if (this.newProjectname && this.dateName !== this.firstName) {
					this.newProjectname = this.blankSpace
					this.addressData = this.blankSpace
					this.$refs['popup'].close()
				}
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
						that.addressData = '(' + res.latitude + ', ' + res.longitude + ')'
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

<style lang="scss">
	.backgroundStyle{
		width: 100%;
		height: 100%;
		background-color: #f2f5f8;
	}
	.titleStyle{
		text-align: center;
		margin-top: 30rpx;
		font-size: 40rpx;
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid lightslategray;
		padding-bottom: 20rpx;
	}
	.logo {
		margin-left: 10rpx;
		margin-right: 10rpx;
		height: 50rpx;
		width: 50rpx;
		display: flex;
		font-size: 45rpx;
	}
	.pop{
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.popup-use{
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		width: 530rpx;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
	}
	.popup-use1{
		padding: 10rpx 30rpx;
		padding-top: 10rpx;
		width: 530rpx;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
	}
	.error-icon{
		font-size: 28rpx;
		padding-left: 40rpx;
		display: inline-block;
		width: 2rpx;
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 20rpx;
		background-color: #fe3535;
		color: #FFFFFF;
		margin-right: 20rpx
	}
	.error-text{
		font-size: 28rpx;
		padding-top: 10rpx;
		color: red;
	}
	.oldStyle{
		border: 1rpx solid gray;
		width: 100%;
		height: 70rpx;
	}
	.projectSearch{
		padding-top: 30rpx;
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
		background-color: #f2f5f8;
		position: sticky;
		top: 0;
	}
	.projectStyle{
		margin-left: 3%;
		border-radius: 5px;
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
		border-radius: 15px;
		width: 55%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 70rpx;
		position: sticky;
		background-color: white;
	}
	.searchButton{
		margin-left: 25rpx;
		display: flex;
		height: 70rpx;
		justify-content: center;
		align-items: center;
		color: blue;
	}
	.buttonStyle{
		width: 300rpx;
		height: 88rpx;
		padding-top: 0rpx;
		font-size: 35rpx;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 40rpx;
	}
	.tableStyle{
		width: 90%;
		margin-top: 25rpx;
		margin-left: 5%;
		display: flex;
		flex-direction: column;
		height: 250rpx;
		background-color: white;
	}
	.logoItem{
		width: 100rpx;
		height: 100rpx;
		font-size: 60rpx;
		border-radius: 100rpx;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		background-color: aliceblue;
		align-items: center;
	}
	.tableContent{
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		height: 80%;
		font-size: 35rpx;
	}
	.newStyle{
		width: 100%;
		height: 100rpx;
		font-size: 35rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: aqua;
	}
	.statusStyle{
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		height: 20%;
		text-align: right;
		font-family: '阿里巴巴普惠体 2.0 65 Medium';
	}
	/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: "阿里巴巴普惠体 2.0 65 Medium";font-weight: 500;src: url("//at.alicdn.com/wf/webfont/R3pFSnXNf5DJ/ySEF0qX9msER.woff2") format("woff2"),
	  url("//at.alicdn.com/wf/webfont/R3pFSnXNf5DJ/wYtU5udvc31K.woff") format("woff");
	  font-display: swap;
	}
</style>

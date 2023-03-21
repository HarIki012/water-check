<template>
	<view class="projectSearch" style="position: sticky;top: 5.4%;">
		<view class="projectStyle">
			<picker class="centerStyle" @change="projectSelect" :range="projectChoose">
				<label style="text-align: center;height: 100%;">{{ projectselectName }}</label>
			</picker>
		</view>
		<input class="selectStyle" style="padding-left: 20rpx;" type="text" v-model="projectnameSearch" placeholder="项目名称" confirm-type="search">
	</view>
	<view>
		<view class="tableStyle" v-for="(item,index) in filterList">
			<view class="tableContent">
				{{item.name}}
			</view>
			<view class="statusStyle">
				状态：
				<text v-if="item.status === '待检查'" style="color: #EEEE00;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}</text>
				<text v-if="item.status === '检查中'" style="color: #00BFFF;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}</text>
				<text v-if="item.status === '已检查'" style="color: #00CD00;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}</text>
				<text v-if="item.status === '已中止'" style="color: #EE2C2C;font-family: '阿里巴巴普惠体 2.0 65 Medium';">{{item.status}}</text>
			</view>
		</view>
	</view>
	
	
	<!-- 新建项目弹窗 -->
	<uni-popup ref="popup">
		<view class="pop">
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
			
			
			<view class="popup-use">
				<view style="width: 80%;text-align: left;">
					经纬度
				</view>
				<view style="width: 20%;text-align: right;color: blue;" @tap="addressGet">
					获取
				</view>
			</view>
			<view class="popup-use1">
				<input class="oldStyle" style="padding-left: 20rpx;" v-if="upData" type="text" v-model="addressData" confirm-type="done" @confirm="isInput">
			</view>
	
			<button class="buttonStyle" type="primary" @tap="toggle1('top')">
				确定
			</button>
		</view>
	</uni-popup>
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
				projectChoose: ['全部', '江夏区', '武昌区'],
				projectselectIndex: 0,
				dateIndex: 0,
				projectselectName: '全部',
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
				return arr
			}
		},
		methods: {
			toggle1() {
				this.newProjectname = this.blankSpace
				this.dateName = this.firstName
				this.addressData = this.blankSpace
				this.$refs['popup'].close()
			},
			oldInput() {
				if (this.newProjectname.length === 0){
					this.errorTips1 = 1
				} else {
					this.errorTips1 = 0
				}
			},
			dateSelect(e) {
			    this.dateIndex = e.detail.value;
			    this.dateName=this.dateChoose[this.dateIndex]
			},
			projectSelect(e) {
			    this.projectselectIndex = e.detail.value;
			    this.projectselectName=this.projectChoose[this.projectselectIndex]
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
			newInput(){
				
			},
			isInput(){
				
			},
			
		},
		onNavigationBarButtonTap(e) {
			this.newProjectname = this.blankSpace
			this.dateName = this.firstName
			this.addressData = this.blankSpace
			this.$refs['popup'].open();
		},
	}
</script>

<style lang="scss">
	.titleStyle{
		text-align: center;
		margin-top: 30rpx;
		font-size: 40rpx;
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid lightslategray;
		padding-bottom: 20rpx;
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
		padding-left: 3%;
		padding-top: 30rpx;
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
		background-color: white;
	}
	.projectStyle{
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
		margin-top: 30rpx;
		margin-left: 5%;
		display: flex;
		flex-direction: column;
		height: 300rpx;
		border: 1rpx solid 	#DCDCDC;
	}
	.tableContent{
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		display: flex;
		height: 80%;
		
	}
	.statusStyle{
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		height: 20%;
		text-align: right;
	}
	/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: "阿里巴巴普惠体 2.0 65 Medium";font-weight: 500;src: url("//at.alicdn.com/wf/webfont/R3pFSnXNf5DJ/ySEF0qX9msER.woff2") format("woff2"),
	  url("//at.alicdn.com/wf/webfont/R3pFSnXNf5DJ/wYtU5udvc31K.woff") format("woff");
	  font-display: swap;
	}
</style>

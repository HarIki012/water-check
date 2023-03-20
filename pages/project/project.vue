<template>
	<view class="projectSearch">
		<view class="projectStyle">
			<picker style="margin-top: 13rpx;text-align: center;" @change="projectSelect" :range="projectChoose">
				<label>{{ projectselectName }}</label>
			</picker>
		</view>
		<input class="selectStyle" style="padding-left: 20rpx;" type="text" v-model="projectnameSearch" placeholder="项目名称">
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
					<picker style="margin-top: 13rpx;text-align: center;" @change="dateSelect" :range="dateChoose">
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

<style>
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
		margin-top: 30rpx;
		padding-left: 3%;
		padding-top: 10rpx;
		width: 100%;
		display: flex;
		justify-content: left;
		letter-spacing: 2rpx;
	}
	.projectStyle{
		border-radius: 5px;
		border: 1rpx solid gray;
		margin-right: 1%;
		width: 25%;
		height: 70rpx;
	}
	.selectStyle{
		border-radius: 5px;
		border: 1rpx solid gray;
		width: 64%;
		height: 70rpx;
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
</style>

<template>

	
	<!-- 弹窗 -->
	<uni-popup ref="popup">
		<view class="pop">
			<view class="popup-use">
				<text style="color: red;">*</text>
				项目名称
			</view>
			<view class="popup-use1">
				<input class="oldStyle" type="text" v-model="newProjectname" confirm-type="done" @confirm="oldInput">
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
				经纬度
			</view>
			<view class="popup-use1">
				<input class="oldStyle" type="text" v-model="isNew" confirm-type="done" @confirm="isInput">
			</view>
	
			<button class="buttonStyle" type="primary" @tap="toggle1('top')">
				确定
			</button>
		</view>
	</uni-popup>
</template>

<script>
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
				dateIndex: 0,
				dateName:'---请选择---',
				firstName:'---请选择---',
			}
		},
		methods: {
			toggle1() {
				this.newProjectname = this.blankSpace
				this.dateName = this.firstName
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
			newInput(){
				
			},
			isInput(){
				
			},
			
		},
		onNavigationBarButtonTap(e) {
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

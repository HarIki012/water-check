<template name="projectdetail">
	<view>
		<view style="height: 20rpx;text-align: center;border: 1rpx solid darkgray;font-size: 20rpx;padding-top: 0rpx;">
			<text>···</text>
		</view>
		<view class="text">
			<text style="margin-bottom: 20rpx;">问题描述</text>
			<text v-if="projectData.projectName !== '自定义'" style="font-size: 33rpx;">{{projectData.description}}</text>
			<textarea v-if="projectData.projectName === '自定义'" class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.description" placeholder="请输入详情描述..." @blur="projectChange"></textarea>
		</view>
		<view v-if="projectData.projectName === '自定义'" class="text" style="flex-direction: row;">
			<text style="width: 25%;">问题类型</text>
			<text style="color: red;width: 25%;">*</text>
			<view style="width: 45%;text-align: right;">
				<picker @change="typeSelect" :range="typeChoose">
					<label style="margin-right: 20rpx;">{{ typeName }}</label>
					<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
				</picker>
				
			</view>
			
		</view>
		<view class="text" v-if="projectData.projectName !== '自定义'" style="flex-direction: row;" @click="navigateToDetail()">
			<text style="width: 95%;">条文规范</text>
			<text style="display: flex;text-align: right;">></text>
		</view>
		<view class="text" v-if="projectData.projectName === '自定义'" >
			<text style="margin-bottom: 20rpx;">条文规范</text>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="newRule" placeholder="条文规范" @blur="projectChange"></textarea>
			
		</view>
		<view class="choose-pic">
			<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
		</view>
		<view class="text" style="flex-direction: row;">
			<text style="width: 25%;">严重程度</text>
			<text style="color: red;width: 25%;">*</text>
			<view style="width: 45%;text-align: right">
				<picker @change="severitySelect" :range="severityChoose">
					<label style="margin-right: 20rpx;">{{ severityselectName }}</label>
					<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
				</picker>
			</view>
			
		</view>
		<view class="text">
			<text style="margin-bottom: 20rpx;">详情描述</text>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.detail" placeholder="详情描述" @blur="projectChange"></textarea>
		</view>
		<view class="choose-pic">
			<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
		</view>
		<view class="text">
			<view style="flex-direction: row; margin-bottom: 20rpx;">
				<text style="margin-bottom: 20rpx;">整改要求</text>
			</view>
			<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="projectData.rectify" placeholder="整改要求" @blur="projectChange"></textarea>
		</view>
	</view>
</template>

<script>
	export default {
		name:"projectdetail",
		props:{
			projectData:Object
			},
		data() {
			return {
				it:[{					
					id: 1,
					projectName:'南湖水环境提升工程',
					type: '安全',
					severity: '较严重',
					description: '问题描述略1',
					detail: '详细描述略',
					photoUrl: '',   //放图片
					rectify: '整改要求略',
					}
				],
				severityChoose:['无','一般','较严重','严重','非常严重'],
				severityselectIndex:'0',
				severityselectName:'无',
				typeChoose:['质量','安全','文明施工'],
				typeIndex:'0',
				typeName:'质量',
				newRule:'',
				from:0,//跳转页面确定
			};
		},
		mounted() {
			this.initData()
		},
		methods:{
			hello(){
				console.log('hello')
			},
			initData(){
				this.severityselectName = this.projectData.severity
				this.typeName = this.projectData.type
			},
			severitySelect(e) {
			    this.severityselectIndex = e.detail.value;
			    this.severityselectName=this.severityChoose[this.severityselectIndex]
				this.projectData.severity = this.severityselectName
				this.$emit("sendData",this.projectData)
			},
			typeSelect(e) {
			    this.typeIndex = e.detail.value;
			    this.typeName=this.typeChoose[this.typeIndex]
				this.projectData.type = this.typeName
				this.$emit("sendData",this.projectData)
			},
			projectChange(){
				this.$emit("sendData",this.projectData)
			},
			navigateToDetail(){
				uni.navigateTo({
					url:'/pages/project/detail/detail?from='+this.from
				})
			}
		}
	}
</script>

<style>
	.choose-pic{
		display: flex;
		margin-left: 20rpx;
		margin-right: 30rpx;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		padding-left: 30rpx;
		font-size: 35rpx;
	}
.text{
	display: flex;
	flex-direction: column;
	margin-left: 30rpx;
	margin-right: 30rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	padding-left: 30rpx;
	font-size: 35rpx;
	border-top: 1rpx solid darkgray;
}
.detailStyle{
		display: flex;
		padding-top: 10rpx;
		position: relative;
		width: 90%;
		height: 300rpx;
		border: 1rpx solid darkgray;
		border-radius: 10rpx;
}
.detailPic{
	position: relative;
	height: 100rpx;
	width: 100rpx;
	display: flex;
	top: -50rpx;
	}
.detailToPicture{
		font-size: 50rpx;
		position: relative;
		top: -65rpx;
		left: 25rpx;
	}
	.detailToVideo{
		font-size: 60rpx;
		position: relative;
		top: -120rpx;
		left: 105rpx;
		color: #707070;
	}
</style>
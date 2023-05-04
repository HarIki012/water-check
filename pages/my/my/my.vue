<template>
	<view class="backgroundStyle">
		<!-- 我的界面展示 -->
		<view class="name">
			<image class="logoStyle iconfont icon icon-yonghu" ></image>
			<view class="leftStyle ">姓名</view>
			<view class="rightStyle">{{adminname}}</view>
		</view>
		<view class="name">
			<image class="logoStyle iconfont icon icon-shouji"></image>
			<view class="leftStyle">手机号</view>
			<view class="rightStyle">{{phonenumber}}</view>
		</view>
		<view class="gapStyle"></view>
		<view class="name" @tap="openPop('top')">
			<image class="logoStyle iconfont icon icon-xiugaimima" ></image>
			<view class="leftStyle">修改密码</view>
			<view class="rightStyle">></view>
		</view>
		<view class="name1" @click="redirectTo()">
			<image class="logoStyle iconfont icon icon-qingjiashenqing"></image>
			<view class="leftStyle">报备</view>
			<view class="rightStyle" >></view>
		</view>
		<view class="quit" @click="redirectToLogin()">
			退出登录
		</view>
		
		<!-- 修改密码弹窗 -->
		<uni-popup ref="popup">
			<view class="pop">
				<view class="popup-use">
					<text style="color: red;">*</text>
					旧密码
				</view>
				<view class="popup-use1">
					<input class="oldStyle" type="password" v-model="oldPassword" confirm-type="done" @confirm="oldInput">
				</view>
				<view class="popup-use1">
					<view class="error" v-if="errorTips1===1">
						<text class="error-text">输入的旧密码错误！</text>
					</view>
				</view>
				<view class="popup-use1">
					<text style="color: red;">*</text>
					新密码
				</view>
				<view class="popup-use1">
					<input class="oldStyle" type="password" v-model="newPassword" confirm-type="done" @confirm="newInput">
				</view>
				<view class="popup-use1" v-if="errorTips2===1">
					<view class="error">
						<text class="error-text">输入的新密码和旧密码一致！</text>
					</view>
				</view>
				<view class="popup-use1" v-else-if="errorTips2===2">
					<view class="error">
						<text class="error-text">密码至少6位！</text>
					</view>
				</view>
				<view class="popup-use">
					<text style="color: red;">*</text>
					确认密码
				</view>
				<view class="popup-use1">
					<input class="oldStyle" type="password" v-model="isNew" confirm-type="done" @confirm="isInput">
				</view>
				<view class="popup-use1">
					<view class="error" v-if="errorTips3==1">
						<text class="error-text">输入的新密码和确认密码不一致！</text>
					</view>
				</view>
				<button class="buttonStyle" type="primary" @tap="closePop('top')">
					确定
				</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { userUpdate_API } from '../../../api/api.js'
	export default {
		data() {
			return {
				adminname: '张三',
				phonenumber: '130****9219',
				oldPassword: '',
				realPassword: '123456',
				newPassword: '',
				isNew: '',
				errorTips1: '',
				errorTips2: '',
				errorTips3: '',
				blankSpace: '',
				userQuit:0,
				userData:{},
				userId:1,
			}
		},
		onLoad() {
			this.getUser()
		},
		methods: {
			//获取用户信息
			getUser(){
				try{
					this.userData = uni.getStorageSync('user_key')
					this.adminname = this.userData.name
					this.phonenumber = this.userData.phone
					this.userId = this.userData.id
				}catch(e){

				}
			},
			
			// 初始化修改密码弹窗
			initPop() {
				this.oldPassword = this.blankSpace
				this.newPassword = this.blankSpace
				this.isNew = this.blankSpace
				this.errorTips1 = this.blankSpace
				this.errorTips2 = this.blankSpace
				this.errorTips3 = this.blankSpace
			},
			// 打开弹窗
			openPop() {
				this.$refs['popup'].open();
				this.initPop()
			},
			// 关闭弹窗
			closePop() {
				this.oldInput()
				this.newInput()
				this.isInput()
				if (this.errorTips1 === 0 && this.errorTips2 === 0 && this.errorTips3 === 0){
					this.initPop()
					this.$refs['popup'].close();
					uni.showToast({
						title: '密码修改成功',
						duration: 1500
					});
					var temp = {
						id:this.userId,
						phone:this.phonenumber,
						password:this.newPassword
					}
					userUpdate_API(temp).then(res => {
						console.log(res)
					})
				}
			},
			// 验证旧密码
			oldInput() {
				if (this.oldPassword !== this.realPassword){
					this.errorTips1 = 1
				} else {
					this.errorTips1 = 0
				}
			},
			// 验证新密码规范
			newInput(){
				if(this.newPassword){
					if (this.newPassword.length < 6){
					this.errorTips2 = 2
					}
					if (this.newPassword === this.realPassword){
						this.errorTips2 = 1
					} 
					if (this.newPassword.length >= 6 && this.newPassword !== this.realPassword) {
						this.errorTips2 = 0
					}
				} else {
					this.errorTips2 = 2
				}
				
			},
			// 验证 确认密码
			isInput(){
				if (this.isNew === this.newPassword){
					this.errorTips3 = 0
				} else {
					this.errorTips3 = 1
				}
			},
			redirectTo()
			{
				uni.navigateTo({
					url:'/pages/my/offwork/offwork'
				});
			},
			async redirectToLogin(){
				
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
			}
			
		}
	}
</script>

<style lang="scss" scoped>
@import url("my.scss");
</style>

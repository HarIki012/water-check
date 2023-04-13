<template>
	<view class="hs-content">
		<view class="head-container">
			<image class="hs-logo" src="../../static/hs-logo.png"></image>
			<text  class="hs-title" >青山区水务工程巡查系统</text>
		</view>
		<form class="hs-form" @submit="formSubmit">
			<view class="hs-tel-wrap">
				<text class="iconfont icon icon-yonghu"></text>
				<input name="tel" class="tel" type="tel"  maxlength=11 placeholder="请输入您的账号" placeholder-class="hs-plh-tel" v-model="userName"/>
			</view>
			<view class="hs-psd-wrap">
				<text class="iconfont icon icon-mima"></text>
				<input name="psd" class="psd" type="text" placeholder="请输入密码" placeholder-class="hs-plh-psw" :password="showPassword" v-model="userPwd"/>
				<text class="hs-show iconfont icon icon-chakan" :class="[!this.showPassword ? 'hs-eye-active' : 'hs-show']" @click="changePassword">&#xe568;</text>
			</view>
			<button formType="submit" :disabled="!loginButtonState" :class="[loginButtonState ? 'hs-login-btn' : 'hs-login-btn-disable']" class="hs-login-btn" type="default" >登 录</button>
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: 12345678910,
				password: 123456,
				showPassword:true,
				userName:'',
				userPwd:''
			};
		},
		computed:{
			loginButtonState(){//当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
				console.log(this.userName)
				console.log(this.userPwd)
				return this.userName !== '' && this.userPwd !== ''
			}
		},
		methods:{
			// 验证账号密码
			formSubmit(e) {
				var rule = [
					{name:"error",  errorMsg:"账号或密码输入错误"},
					{name:"null",   errorMsg:"请输入账号或密码"}
				];
				
				var formData = e.detail.value;
				var reg = /^1[0-9]{10,10}$/;
				if (!formData.tel | !formData.psd){
					// 输入账号或者密码不全
					uni.showToast({
						title: rule[1].errorMsg,
						icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
						duration: 1500    //持续时间为 2秒
					})  
					console.log(rule[1].errorMsg);
				}
				else if (!reg.test(formData.tel)) {
					// 账号或密码输入错误
					uni.showToast({
						title: rule[0].errorMsg,
						icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
						duration: 1500    //持续时间为 2秒
					})  
					console.log(rule[0].errorMsg);
				}
				else if (formData.tel == this.phone & formData.psd == this.password){
					// 跳转到项目页面
					uni.switchTab({
						url: '/pages/project/list/project'
					});
				}
			},
			
			changePassword: function() {
			    this.showPassword = !this.showPassword;
				console.log(this.showPassword)
			}
		}
	}
</script>

<style lang="scss" scoped>
@import 'login.scss';
</style>

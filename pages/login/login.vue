<template>
	<view class="hs-content">
		
		<view  class="hs-title" >青山区水务工程巡查系统</view>
		<form class="hs-form" @submit="formSubmit">
			<view class="hs-tel-wrap">
				<text class="iconfont icon icon-yonghu"></text>
				<input name="tel" class="tel" type="tel" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength=11 placeholder="请输入您的账号" placeholder-class="hs-plh-tel"/>
			</view>
			<view class="hs-psd-wrap">
				<text class="iconfont icon icon-mima"></text>
				<input name="psd" class="psd" password placeholder="请输入密码" placeholder-class="hs-plh-psw"/>
			</view>
			<button formType="submit" class="hs-login-btn" type="default" >登 录</button>
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: 13277271520,
				password: 123456,
			};
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
						url: '/pages/project/project'
					});
				}
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
@import 'login.scss';
</style>

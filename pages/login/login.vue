<template>
	<view class="content">
		<view style="text-align: center;margin-top: 300rpx;margin-bottom: 100rpx;font-weight: 700;font-size: 40rpx;">水务工程巡查</view>
		<form class="form" @submit="formSubmit">
			<view class="tel-wrap">
				<text class="iconfont icon icon-icon-user"></text>
				<input name="tel" class="tel" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength=11 placeholder="账号" />
			</view>
			<view class="psd-wrap">
				<text class="iconfont icon icon-mima"></text>
				<input name="psd" class="psd" password placeholder="密码" />
			</view>
			<button formType="submit" class="login-btn" type="default" >登录</button>
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
			formSubmit(e) {
				var rule = [
					{name:"error",  errorMsg:"账号或密码输入错误"},
					{name:"null",   errorMsg:"请输入账号或密码"}
				];
				var formData = e.detail.value;
				var reg = /^1[0-9]{10,10}$/;
				if (!formData.tel | !formData.psd){
					uni.showToast({
						title: rule[1].errorMsg,
						icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
						duration: 1500    //持续时间为 2秒
					})  
					console.log(rule[1].errorMsg);
				}
				else if (!reg.test(formData.tel)) {
					uni.showToast({
						title: rule[0].errorMsg,
						icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
						duration: 1500    //持续时间为 2秒
					})  
					console.log(rule[0].errorMsg);
				}
				else if (formData.tel == this.phone & formData.psd == this.password){
					uni.switchTab({
						url: '/pages/project/project'
					});
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
	page, .content{
		width: 100%;
		height: 100%;
	}
	.content {
		//background: url("../../static/imgs/login/login-background1.png") no-repeat;
		background-size: cover;
		
		.form{
			display: block;
			padding-top: 40upx;
		}
		.tel-wrap, .psd-wrap {
			width: 80%;
			margin: 0 auto;
			position: relative;
			height: 100upx;
			border: 1upx solid #eee;
			.iconfont {
				position: absolute;
				left: 20upx;
				top: 25upx;
				font-size: 48upx;
			}
			input{
				padding-left: 100upx;
				padding-top: 28upx;
				font-size: 36upx;
			}
		}
		.tel-wrap{
			margin-bottom: 20upx;
		}
		.psd-wrap{
			margin-bottom: 80upx;
		}
		.login-btn{
			width: 80%;
			margin: 0 auto 40upx;
			background: #0055ff;
			border-radius: 80upx;
			color: #fff;
			font-size: 32upx;
		}
	}
</style>

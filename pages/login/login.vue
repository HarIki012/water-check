<template>
	<view class="content">
		<view style="text-align: center;margin-top: 300rpx;margin-bottom: 100rpx;font-weight: 700;font-size: 40rpx;">水务工程巡查</view>
		<form class="form" @submit="formSubmit">
			<view class="tel-wrap">
				<text class="iconfont iconfont1 icon-username"></text>
				<input name="tel" class="tel" focus placeholder="账号" />
			</view>
			<view class="psd-wrap">
				<text class="iconfont iconfont1 icon-password"></text>
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
				
			};
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
		.text{
			width: 200rpx;
		}
		.form{
			display: block;
			padding-top: 40upx;
		}
		.tel-wrap, .psd-wrap {
			width: 80%;
			margin: 0 auto;
			position: relative;
			height: 100upx;
			border-bottom: 1upx solid #eee;
			.iconfont {
				position: absolute;
				left: 0;
				top: 30upx;
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

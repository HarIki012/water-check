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
	import { expertByPhone_API } from '../../api/api.js'
	import { login_API } from '../../api/api.js'
	export default {
		data() {
			return {
				phone: 13013013130,
				password: "123456",
				showPassword:true,
				userName:'',
				userPwd:'',
				allowLogin:false,
				expertData:{
					id:0,
					name:"",
					phone:"",
					isLogin:false,
				},
				allUserData:[],
				userToken:'',
				userRole:'',
			};
		},
		computed:{
			// 禁用登录按钮
			loginButtonState(){//当用户名和密码框都不为空时btnState==true,利用这个计算属性来动态控制按钮的禁用和颜色
				return this.userName !== '' && this.userPwd !== ''
			}
		},
		onLoad() {
		},
		methods:{
			
			// 验证账号密码
			async formSubmit(e) {
				var rule = [
					{name:"error",  errorMsg:"请输入正确的手机号"},
					{name:"null",   errorMsg:"请输入账号或密码"}
				];
				
				var formData = e.detail.value;
				var reg = /^1\d+$/;
				
				if (!formData.tel | !formData.psd){
					// 输入账号或者密码不全
					console.log("输入账号或者密码不全")
					uni.showToast({
						title: rule[1].errorMsg,
						icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
						duration: 1500    //持续时间为 2秒
					})  
					
				}
				else if (!reg.test(formData.tel)) {
					// 账号或密码输入错误
					uni.showToast({
						title: rule[0].errorMsg,
						icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
						duration: 1500    //持续时间为 2秒
					})  
				}else{
					
					let data = {
						 phone:formData.tel,
						 password:formData.psd
					}
					
					login_API(data).then(res => {
						if(res.data.message !== "success"){
							uni.showToast({
								title: "账号不存在或密码错误",
								icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
								duration: 1500    //持续时间为 2秒
							}) 
						}else{
							this.userToken = res.data.data.token
							this.userRole = res.data.data.user.role
							
							var tempData = {
								phone:formData.tel,
								token:this.userToken
							}
							uni.setStorage({
								key:'token_key',
								data:this.userToken,
								success:function(){
									console.log("token save success!")
								}
							});
							expertByPhone_API(tempData).then(res =>{
								this.expertData = {
									id:res.data.data.id,
									name:res.data.data.name,
									phone:res.data.data.phone,
									role:this.userRole,
									isLogin:true,
								}
								uni.setStorage({
									key:'user_key',
									data:this.expertData,
									success:function(){
										console.log("login success!")
									}
								});
								//跳转到项目页面
								uni.switchTab({
									url: '/pages/project/list/project'
								});
							})
						}
					})
				}
				
			
			},
			// 密码框显示密码
			changePassword: function() {
			    this.showPassword = !this.showPassword;
			}
		}
	}
</script>

<style lang="scss" scoped>
@import 'login.scss';
</style>

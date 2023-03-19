<template>
	<view>
		<view class="content">
			<text class="name">姓名\n</text>
			
			<text class="phone">手机号\n</text>
			<text class="updatepws">修改密码\n</text>
			<text class="offwork" >请假报备\n</text>
			
		</view>
		<button class="quit">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.content{
	position: relative;
	height: 600upx;
	width: 200rpx;
	.name,.phone,.updatepws,.offwork{
		text-align: left;
		
		
	}
	
}
</style>

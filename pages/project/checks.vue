<template>
	<view class="totalSearch" style="position: sticky;top: 5%;">
		<form class="form" @submit="search">
		<view class="checkSearch">
			<image class="logo" mode="scaleToFill" src="/static/logo.png"></image>
			<input class="selectStyle"  style="padding-left: 20rpx;" type="text" placeholder="问题检索" confirm-type="search" @confirm="search">
		</view>
		</form>
		<view class="typeStyle">
			<view  v-for="(item, index) in typeList"  :key="index" style="text-align: center;display: flex">
				<button :class="item==selectPoint?'chooseType':'unChoose'" type="default" @click="sequ(index)">
						{{item}}
				</button>
			</view>
		</view>
		<view style="margin-bottom: 150rpx;">
			<view v-for="(item, index) in newList" :key="index">
				<view class="titleStyle" @click="changeBig(index)" style="margin-top: 30rpx;">▼{{item.projectName}}</view>
				<view v-if="newList[index].bigisOpen">
					<view v-for="(it, id) in item.data" :key="id">
						<view style="display: flex;flex-direction: row;">
							<view :class="newList[index].data[id].isOpen===false?'closeStyle':'openStyle'" @click="changeSmall(index,id)" style="background-color: #e3e3e3;">{{it.description}}</view>
							<text v-if="newList[index].data[id].isOpen" class="deleteStyle" style="color: blue;background-color: #e3e3e3;">
								<text style="text-align: center;">
									删除
								</text>
							</text>
						</view>
						
						<view v-if="newList[index].data[id].isOpen">
							<view style="display: flex;flex-direction: column;border-bottom: 1rpx solid darkgray;">
								<view style="height: 20rpx;text-align: center;border: 1rpx solid darkgray;font-size: 20rpx;padding-top: 0rpx;">
									<text>···</text>
								</view>
								<view class="text">
									<text style="margin-bottom: 20rpx;">问题描述</text>
									<text style="font-size: 33rpx;">{{ it.description }}</text>
								</view>
								<view class="text" style="flex-direction: row;">
									<text style="width: 95%;">查看规范</text>
									<text style="display: flex;text-align: right;">></text>
								</view>
								<view class="text" style="flex-direction: row;">
									<text style="color: red;">*</text>
									<text style="width: 50%;">严重程度</text>
									<text style="width: 40%;text-align: right">{{ it.severity }}</text>
									<text style="width: 10%;font-size: 20rpx;text-align: right;padding-top: 10rpx;">▼</text>
								</view>
								<view class="text">
									<text style="margin-bottom: 20rpx;">详情描述</text>
									<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="it.detail" placeholder="详情描述"></textarea>
									<image class="detailPic" mode="scaleToFill" src="/static/logo.png"></image>
								</view>
								<view class="text">
									<view style="flex-direction: row; margin-bottom: 20rpx;">
										<text style="color: red;">*</text>
										<text style="margin-bottom: 20rpx;">整改要求</text>
									</view>
									<textarea class="detailStyle" style="padding-left: 20rpx;" type="text" v-model="it.rectify" placeholder="详情描述"></textarea>
								</view>
								<view style="height: 60rpx;text-align: center;" @click="changeSmall(index,id)">
									^
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
			

		
	</view>
	
	<button class="button-bottom">自定义问题添加</button>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				active:'',
				typeList: ['质量', '安全', '文明施工'],
				selectPoint: '',
				problemList: [
					{
						id: 1,
						projectName:'南湖水环境提升工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略1',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 2,
						projectName:'南湖水环境提升工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略2',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 3,
						projectName:'南湖水环境提升工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略3',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 4,
						projectName:'土石方工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略4',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 5,
						projectName:'土石方工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略5',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					}
				],
				newList:'',
			}
		},

		mounted() {
			this.changeData()
		},
		methods: {
			search(e){
				uni.navigateTo({
							 url:'/pages/project/search?username=' + e.detail.value
								}) //由搜索页传递到搜索结果页
						 //  uniCloud.database().collection('接口').get().then(res =>{
							// 		this.userName = ''
							// 		console.log(res);
							// })
			},
			changeBig(e){
				 this.newList[e].bigisOpen = !this.newList[e].bigisOpen
				 this.$forceUpdate()
			},
			changeSmall(e,n){
				this.newList[e].data[n].isOpen = !this.newList[e].data[n].isOpen
				this.$forceUpdate()
			},
			sequ(id) {
				this.selectPoint = this.typeList[id]

			},
			testM(){
				console.log(this.problemList.length)
			},
			changeData() {
				for (var j = 0; j < this.problemList.length; j++){
					this.problemList[j].isOpen = false
				}
				var map = {}
				var nList = []
				for (var i = 0; i < this.problemList.length; i++) {
					var item = this.problemList[i]
					if (!map[item.projectName]) {
						nList.push({
							projectName: item.projectName,
							data: [item],
							bigisOpen: true,
						})
						map[item.projectName] = item
					} else {
						for (var j = 0; j < nList.length; j++) {
							var nItem = nList[j]
							if (nItem.projectName == item.projectName) {
								nItem.data.push(item)
								break
							}
						}
					}
				}
				console.log(nList)
				this.newList = nList
			}
		}
	}
</script>


<style lang="scss">
	.logo {
			margin-left: 20rpx;
			height: 50rpx;
			width: 50rpx;
			display: flex;
		}
	.detailPic{
		margin-top: 25rpx;
		height: 100rpx;
		width: 100rpx;
		display: flex;
	}
	.selectStyle{
		width: 100%;
		height: 50rpx;
		margin-left: 10rpx;
		text-align: left;
	}
	.checkSearch{
		display: flex;
		margin-left: 5%;
		margin-top: 30rpx;
		border-radius: 5px;
		border: 1rpx solid gray;
		text-align: center;
		align-items: center;
		flex-direction: row;
		margin-right: 1%;
		width: 90%;
		height: 90rpx;
		position: sticky;
		top: 0;
	}
	.totalSearch{
		padding-top: 10rpx;
		width: 100%;
		justify-content: left;
		letter-spacing: 2rpx;
		background-color: white;
	}
	.typeStyle{
		margin-top: 30rpx;
		width: 100%;
		padding-left: 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.chooseType{
		width: 220rpx;
		height: 85rpx;
		background-color: #1E90FF;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		border: 0.5rpx solid #DCDCDC;
	}
	.unChoose{
		width: 220rpx;
		height: 85rpx;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: white;
		display: flex;
		border: 0.5rpx solid #DCDCDC;
	}
	.titleStyle{
		width: 80%;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		text-align: left;
		font-size: 40rpx;
	}
	.content{
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		font-size: 35rpx;
	}
	.closeStyle{
		border-radius: 15rpx;
		display: flex;
		width: 100%;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		font-size: 35rpx;
	}
	.openStyle{
		display: flex;
		width: 80%;
		margin-top: 30rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		font-size: 35rpx;
	}
	.deleteStyle{
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 20%;
		margin-top: 30rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
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
	.button-bottom{
		position: fixed;
		width: 100%;
		bottom: 0;
		color: #F5F5F5;
		background-color: #1E90FF;
		border-radius: 0rpx;
	}
	.button-bottom{
		position: fixed;
		width: 100%;
		bottom: 0;
		color: #F5F5F5;
		background-color: #1E90FF;
		border-radius: 0rpx;
	}
</style>

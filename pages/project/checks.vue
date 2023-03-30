<template>
	<view class="totalSearch" style="position: sticky;top: 5%;">
		<view class="checkSearch">
			<image class="logo" mode="scaleToFill" src="/static/logo.png"></image>
			<input class="selectStyle" style="padding-left: 20rpx;" type="text" placeholder="问题检索" confirm-type="search">
		</view>
		<view class="typeStyle">
			<view  v-for="(item, index) in typeList"  :key="index" style="text-align: center;display: flex">
				<button :class="item==selectPoint?'chooseType':'unChoose'" type="default" @click="sequ(index)">
						{{item}}
				</button>
			</view>
		</view>
		<view v-for="(item, index) in newList" :key="index" style="text-align: center" @click="heightChange">
			<uni-collapse style="margin-top: 30rpx;" ref="collapse" accordion @change="heightChange">
				<uni-collapse-item title-border="none" :border="false" :open="true">
					<template v-slot:title>
						<uni-list>
							<view style="display: flex;">
								<uni-list-item title='' :show-extra-icon="true" style="display: flex;width: 1%;"  @click="heightChange">
								</uni-list-item>
								<view class="titleStyle">▼{{item.projectName}}</view>
							</view>
						</uni-list>
					</template>
					<view>
						<view class="content" v-for="(it, id) in item.data" :key="id" style="text-align: center" @click="heightChange">
							<!-- <view v-for="(t,d) in it" :key="d">
								{{t}}
							</view> -->
							<!-- <text class="text">{{ it.description }}</text> -->
							<uni-collapse ref="collapsetwo" accordion @change="heightChange">
								<uni-collapse-item  title-border="none" :border="false" :open="false">
									<template v-slot:title>
										<uni-list>
											<view style="display: flex;" @click="heightChange">
												<uni-list-item title='' :show-extra-icon="true" style="display: flex;width: 1%;"  @click="heightChange">
												</uni-list-item>
												<view style="display: flex;width: 80%;text-align: left;background-color: #F5F5F5;">{{it.description}}</view>
												<view class="deleteStyle">删除</view>
											</view>
										</uni-list>
									</template>
									<view style="display: flex;flex-direction: column;" @click="heightChange">
										<text class="text">{{ it.description }}</text>
										<text class="text">{{ it.detail }}</text>
										<text class="text">{{ it.rectify }}</text>
										<text class="text">{{ it.severity }}</text>
									</view>
									
								</uni-collapse-item>
								
							</uni-collapse>
						</view>
					</view>
					
				</uni-collapse-item>
			</uni-collapse>
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
			heightChange(){
				this.$nextTick(() => {
					setTimeout(()=>{
						this.$refs.collapse.resize();
						this.$refs.collapsetwo.resize();
					},500)
				});
			},
			sequ(id) {
				this.selectPoint = this.typeList[id]

			},
			testM(){
				console.log(this.problemList.length)
			},
			changeData() {
				var map = {}
				var nList = []
				for (var i = 0; i < this.problemList.length; i++) {
					var item = this.problemList[i]
				    if (!map[item.projectName]) {
						nList.push({
							projectName: item.projectName,
							data: [item]
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
	.deleteStyle{
		display: flex;
		width: 20%;
		text-align: center;
		justify-content: center;
		align-items: center;
		color: #1E90FF;
		background-color: #F5F5F5;
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
		flex-direction: column;
		margin-top: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		font-size: 35rpx;
		background-color: #F5F5F5;
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

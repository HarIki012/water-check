<template>
	<view class="totalSearch">
		<form class="form" @submit="search">
		<view class="checkSearch">
			<image class="logo iconfont icon icon-chazhao" ></image>
			<input class="selectStyle "  style="padding-left: 20rpx;" type="text" placeholder="问题检索" confirm-type="search" @confirm="search">
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
				<view :class="newList[index].bigisOpen ? 'titleStyle iconfont icon icon-xiangxia1' : 'titleStyle iconfont icon icon-xiangyou'" @click="changeBig(index)" style="margin-top: 30rpx;">{{item.projectName}}</view>
				<view v-if="newList[index].bigisOpen">
					<view v-for="(it, id) in item.data" :key="id">
						<view style="display: flex;flex-direction: row;">
							<view :class="newList[index].data[id].isOpen===false?'closeStyle':'openStyle'" @click="changeSmall(index,id)" style="background-color: #e3e3e3;">{{it.description}}</view>
							<text v-if="newList[index].data[id].isOpen" class="deleteStyle" @click="deleteProject(newList[index].data[id])">
								<text style="text-align: center;">
									删除
								</text>
							</text>
						</view>
						
						<view v-if="newList[index].data[id].isOpen">
							<view style="display: flex;flex-direction: column;border-bottom: 1rpx solid darkgray;">
								<projectdetail :projectData="it" @sendData="getData"></projectdetail>
								<view style="height: 60rpx;text-align: center;" @click="changeSmall(index,id)">
									^
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="deletePop" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="是否删除此项问题" :content=deleteName @confirm="dialogConfirm"
								@close="dialogClose"></uni-popup-dialog>
		</uni-popup>

			
	</view>
	<view class="button-bottom">
		<button class="submit-button">提交</button>
		<button class="self-add-button" @tap="addProject">自定义问题添加</button>
	</view>
	
	
</template>

<script>
import projectdetail from "/components/projectdetail/projectdetail.vue";
	export default {
		data() {
			return {
				id: 0,
				active:'',
				typeList: ['质量', '安全', '文明施工'],
				selectPoint: '',
				problemList:'',
				msgType: 'type',
				initproblemList: [
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
						type: '质量',
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
						type: '质量',
						severity: '较严重',
						description: '问题描述略4',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					},
					{
						id: 5,
						projectName:'土石方工程',
						type: '文明施工',
						severity: '较严重',
						description: '问题描述略5',
						detail: '详细描述略',
						photoUrl: '',   //放图片
						rectify: '整改要求略',
					}
				],
				newList:'',
				deleteName:'',
				deleteId:'',
				newProject:'',
				sumProjects:''
			}
		},
		components:{
			projectdetail
		},
		mounted() {
			this.changeData(),
			this.getLength()
		},
		computed: {
			
		},
		methods: {
			getLength(){
				this.sumProjects = this.initproblemList.length
			},
			getData(res){
				console.log(this.initproblemList)
				for (var i = 0; i < this.initproblemList.length;i++){
					if (this.initproblemList[i].id === res.id) {
						this.initproblemList[i] = res
						console.log(this.initproblemList)
					}
				}
			},
			search(e){
				uni.navigateTo({
							 url:'/pages/project/search/search?searchText=' + e.detail.value
								}) //由搜索页传递到搜索结果页
			},
			changeBig(e){
				 this.newList[e].bigisOpen = !this.newList[e].bigisOpen
				 this.$forceUpdate()
				 this.active = !this.active
			},
			changeSmall(e,n){
				this.newList[e].data[n].isOpen = !this.newList[e].data[n].isOpen
				this.$forceUpdate()
			},
			sequ(id) {
				if(this.selectPoint === this.typeList[id]){
					this.selectPoint = null
				} else {
					this.selectPoint = this.typeList[id]
				}
				this.changeData()
			},
			testM(){
				console.log(this.problemList.length)
			},
			filterList() {
				var arr = [] //定义一个空数组
				this.problemList.forEach((item) => arr.push(item)) //在zhiweilist查找数据放入空数组
				if (this.selectPoint) { //如果有这个数据
					arr = this.problemList.filter(item => item.type.includes(this.selectPoint))
					//则在zhiweilist里过滤掉filterText
				}
				console.log(arr)
				this.problemList = arr
			},
			deleteProject(e) {
				console.log(e)
				this.deleteName = e.description
				this.deleteId = e.id
				this.$refs['deletePop'].open()
			},
			dialogConfirm(e) {
				console.log(this.deleteName)
				this.initproblemList = this.initproblemList.filter(item => item.id != this.deleteId)
				this.changeData()
			},
			dialogClose() {
				this.$refs['deletePop'].close()
			},
			addProject() {
				this.sumProjects = this.sumProjects + 1
				this.newProject = {
						id: this.sumProjects,
						projectName:'自定义',
						type: '质量',
						severity: '一般',
						description: '自定义问题描述',
						detail: '',
						photoUrl: '',   //放图片
						rectify: '',
					}
				// this.initproblemList[this.sumProjects] = this.newProject
				this.initproblemList.push(this.newProject)
				this.changeData()
			},
			changeData() {
				this.problemList = this.initproblemList
				this.filterList()
				for (var j = 0; j < this.problemList.length; j++){
					if (this.problemList[j].projectName === '自定义'){
						this.problemList[j].isOpen = true
					} else {
						this.problemList[j].isOpen = false
					}
				
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


<style lang="scss" scoped>
@import url('checks.scss');
</style>

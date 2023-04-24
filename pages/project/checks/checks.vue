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
								<projectdetail :projectData="it" @sendData="getData" @deleteId="getDeleteid"></projectdetail>
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
		<button class="submit-button" @tap="submitChange()">提交</button>
		<button class="self-add-button" @tap="addProject">自定义问题添加</button>
	</view>
	
	
</template>

<script>
import projectdetail from "/components/projectdetail/projectdetail.vue";
import { patrolID_API } from '../../../api/api.js'
import { updataProblems_API } from '../../../api/api.js'
import { addProblem } from '../../../api/api.js'
import { deleteFile } from '../../../api/api.js'
import { allProblem_API } from '../../../api/api.js'
import { bindTeam_API } from '../../../api/api.js'
import { deleteProblem_API } from '../../../api/api.js'
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
						photoUrl: [],   //放图片
						rectify: '整改要求略',
					},
					{
						id: 2,
						projectName:'南湖水环境提升工程',
						type: '质量',
						severity: '较严重',
						description: '问题描述略2',
						detail: '详细描述略',
						photoUrl: [],   //放图片
						rectify: '整改要求略',
					},
					{
						id: 3,
						projectName:'南湖水环境提升工程',
						type: '安全',
						severity: '较严重',
						description: '问题描述略3',
						detail: '详细描述略',
						photoUrl: [],   //放图片
						rectify: '整改要求略',
					},
					{
						id: 4,
						projectName:'土石方工程',
						type: '质量',
						severity: '较严重',
						description: '问题描述略4',
						detail: '详细描述略',
						photoUrl: [],   //放图片
						rectify: '整改要求略',
					},
					{
						id: 5,
						projectName:'土石方工程',
						type: '文明施工',
						severity: '较严重',
						description: '问题描述略5',
						detail: '详细描述略',
						photoUrl: [],   //放图片
						rectify: '整改要求略',
					}
				],
				newList:'',
				deleteName:'',
				deleteId:'',
				newProject:'',
				sumProjects:'',
				checkId:1,
				ifpicDelete:'no',
				deletepicMessage:'',
				teamid:'',
				problemId:'',
				terms:'',
				
			}
		},
		components:{
			projectdetail
		},
		onLoad(value) {
			if(value.id !== undefined) {
				this.checkId = value.id
			}
			console.log(this.checkId)
			this.getChecks()
			this.getTerms()
			
		},
		mounted() {
			// this.changeData(),
			// this.getLength()
		},
		methods: {
			getTerms(){
				try {
					this.terms = uni.getStorageSync('terms_key');
					if (this.terms) {
						console.log("terms get success!")
						this.addProject()
						this.problemList[this.problemList.length-1].isOpen = true
					}
				} catch (e) {
					// error
				}
			},
			async getChecks(){
				uni.showLoading({
				                    title: '加载中'
				                })
				patrolID_API(this.checkId).then(res=>{
					console.log(res.data.data.inspectionTeams[0].problems)
					this.initproblemList = res.data.data.inspectionTeams[0].problems
					this.teamid = res.data.data.inspectionTeams[0].id
					uni.setStorage({
						key:'problem_key',
						data:this.initproblemList,
						success: function() {
							console.log('problem save success!')
						}
					});
					this.changeData(),
					this.getLength()
					uni.hideLoading();
				})
				var sumProblems = "";
				allProblem_API(sumProblems).then(res=>{
					console.log(res.data.data)
					this.problemId = res.data.data[res.data.data.length-1].id
				})
			},
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
			getDeleteid(e){
				console.log(e)
				var raw = JSON.stringify([
				   e
				])
				console.log(raw)
				this.ifpicDelete = 'yes'
				this.deletepicMessage = raw
				console.log(this.deletepicMessage)
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
				this.problemList = arr
			},
			deleteProject(e) {
				console.log(e.id)
				// var data = JSON.stringify([
				//    e.id
				// ]);
				// deleteProblem_API(data).then(res=>{
				// 	console.log(res)
				// })
				this.deleteName = e.description
				this.deleteId = e.id
				this.$refs['deletePop'].open()
			},
			dialogConfirm(e) {
				console.log(this.deleteName)
				this.initproblemList = this.initproblemList.filter(item => item.id != this.deleteId)
				var data = JSON.stringify([
				   this.deleteId
				]);
				deleteProblem_API(data).then(res=>{
					console.log(res)
				})
				this.changeData()
			},
			dialogClose() {
				this.$refs['deletePop'].close()
			},
			addProject() {
				var sum = "";
				allProblem_API(sum).then(res=>{
					console.log(res.data.data)
					this.problemId = res.data.data[res.data.data.length-1].id
				})
				this.newProject = 
					{
					  "id": this.problemId,
					  "terms":this.terms,
					  "projectName": "自定义",
					  "type": "质量",
					  "severity": "一般",
					  "description": "问题描述略",
					  "detail": "详细描述略",
					  "photoUrl": [],
					  "rectify": "整改要求略",
					  "deadline": "2023-4-1",
					  "supervisionUnit": "督办单位1",
					  "finder": "专家1",
					  "readed": false,
					  
					}
					console.log(this.terms)
				// this.initproblemList[this.sumProjects] = this.newProject
				this.initproblemList.push(this.newProject)
				
				addProblem(this.newProject).then(res=>{
					console.log(res)
					
				})
				var bindMessage = {
					teamId: this.teamid,
					problemId: this.problemId
				}
					
				bindTeam_API(bindMessage).then(res=>{
					console.log(res)
					
				})
				this.changeData()
				this.problemList[this.problemList.length-1].isOpen = true
			},
			submitChange(){
				for(var i = 0;i<this.initproblemList.length;i++){
					// var submitData = {
					// 	"id": this.initproblemList.id,
					// 	"projectName": this.initproblemList.projectName,
					// 	"type": this.initproblemList.type,
					// 	"severity": this.severity,
					// 	"description": "问题描述略",
					// 	"detail": "详细描述略",
					// 	"photoUrl": [
					// 		"xxxx.jpg"
					// 	],
					// 	"rectify": "整改要求略",
					// 	"deadline": "2023-4-1",
					// 	"supervisionUnit": "督办单位1",
					// 	"finder": "专家2"
					// }
					console.log(this.initproblemList[i])
					updataProblems_API(this.initproblemList[i]).then(res=>{
						console.log(res)
					})
				}
				// deleteFile(this.deletepicMessage).then(res=>{
				// 	console.log(res)
					
				// })
				console.log(this.initproblemList)
				this.changeData()
				uni.showToast({
					title: '提交成功!',
					duration: 1000
				});
				
			},
			changeData() {
				this.problemList = this.initproblemList
				this.filterList()
				for (var j = 0; j < this.problemList.length; j++){
					if (this.problemList[j].projectName === '自定义'){
						this.problemList[j].isOpen = false
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
				var selfId = nList.length-1
				for(var i =0;i<nList.length;i++){
					if(nList[i].projectName === '自定义'){
						selfId = i
					}
				}
				if (selfId != nList.length-1){
					var tran = nList[selfId]
					nList[selfId] = nList[nList.length-1]
					nList[nList.length-1] = tran
				}
				this.newList = nList
			}
		}
	}
</script>


<style lang="scss" scoped>
@import url('checks.scss');
</style>

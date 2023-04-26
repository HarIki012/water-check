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
				<view :class="newList[index].bigisOpen ? 'titleStyle iconfont icon icon-xiangxia1' : 'titleStyle iconfont icon icon-xiangyou'" @click="changeBig(index)" style="margin-top: 30rpx;">{{item.typeOne}}</view>
				<!-- <view v-if="item.basis === null" :class="newList[index].bigisOpen ? 'titleStyle iconfont icon icon-xiangxia1' : 'titleStyle iconfont icon icon-xiangyou'" @click="changeBig(index)" style="margin-top: 30rpx;">自定义</view> -->
				<view v-if="newList[index].bigisOpen">
					<view v-for="(it, id) in item.data" :key="id">
						<view style="display: flex;flex-direction: row;">
							<view v-if="newList[index].data[id].readed===false" :class="newList[index].data[id].isOpen===false?'closeStyle':'openStyle'" @click="changeSmall(index,id)" style="background-color: #e3e3e3;">
								<text class="text-title-style">{{it.description}}</text>
							</view>
							<view v-if="newList[index].data[id].readed===true" :class="newList[index].data[id].isOpen===false?'closeStyle-readed':'openStyle'" @click="changeSmall(index,id)" style="background-color: #e3e3e3;">
								<text class="text-title-style">{{it.description}}</text>
							</view>
							<text v-if="newList[index].data[id].isOpen && newList[index].data[id].basis.typeOne !== '自定义'" class="deleteStyle" @click="clearProblems(newList[index].data[id])">
								<text style="text-align: center;">
									清空
								</text>
							</text>
							<text v-if="newList[index].data[id].isOpen && newList[index].data[id].basis.typeOne === '自定义'" class="deleteStyle" @click="deleteProject(newList[index].data[id])">

								<text style="text-align: center;">
									删除
								</text>
							</text>
						</view>
						
						<view v-if="newList[index].data[id].isOpen">
							<view style="display: flex;flex-direction: column;border-bottom: 1rpx solid darkgray;">
								<projectdetail :projectData="it" :status="projectStatus" @sendData="getData" @deleteId="getDeleteid"></projectdetail>
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
				checkId:2,
				ifpicDelete:'no',
				deletepicMessage:'',
				teamid:'',
				problemId:'',
				terms:{
					id: '1',
					terms: '1',
					typeOne: '1'
				},
				checkIdTemp:0,
				
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
			try{
				this.checkIdTemp = uni.getStorageSync('patrolId_key')
				if(Number(this.checkIdTemp) !== 0){
					this.checkId = this.checkIdTemp
				}
			}catch(e){
				//TODO handle the exception
			}
			this.getChecks()
			this.getTerms()
			this.savePatrolId()
			
		},
		mounted() {
			// this.changeData(),
			// this.getLength()
		},
		methods: {
			
			savePatrolId(){
				uni.setStorage({
					key:'patrolId_key',
					data:this.checkId,
					success:function(){
						console.log('patrolId save success!')
					}
				})
			},
			
			async getChecks(){
				uni.showLoading({
				                    title: '加载中'
				                })
				patrolID_API(this.checkId).then(res=>{
					console.log(res.data)
					this.projectStatus = res.data.data.status
					console.log(this.projectStatus)
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
			async getTerms(){
				console.log(this.terms)
				patrolID_API(this.checkId).then(res=>{
					console.log(res.data)
					this.initproblemList = res.data.data.inspectionTeams[0].problems
					this.teamid = res.data.data.inspectionTeams[0].id
					uni.setStorage({
						key:'problem_key',
						data:this.initproblemList,
						success: function() {
							console.log('problem save success!')
						}
					});
					try {
						this.terms = uni.getStorageSync('terms_key');
						console.log(this.terms)
						console.log(this.terms.id)
						if (this.terms.id !== undefined) {
							console.log("terms get success!")
							this.addProject()
							//this.terms = ''
							uni.setStorage({
								key:'terms_key',
								data:'',
								success: function() {
									console.log('terms save null success!')
								}
							});
							
						}
					} catch (e) {
						// error
					}
				})
				this.changeData()
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
			async changeSmall(e,n){
				console.log(e)
				console.log(n)
				console.log(this.newList)
				console.log('first'+this.newList[e].data[n])
				this.newList[e].data[n].isOpen = !this.newList[e].data[n].isOpen
				await uni.nextTick()
				console.log(this.newList[e].data[n].readed)
				console.log('two'+this.newList[e].data[n])
				if(!this.newList[e].data[n].readed){
					this.newList[e].data[n].readed = true
					// console.log(this.newList[e].data[n].id)
					// console.log(this.newList[e].data[n])
					if(this.newList[e].data[n].description !== '' || this.newList[e].data[n].rectify !== ''){
						//console.log("readed"+this.newList[e].data[n])
						if(this.newList[e].data[n].basis.typeOne === '自定义'){
							
							var tranData = this.newList[e].data[n]
							tranData.basis = null
							await uni.nextTick()
							console.log('测试'+tranData)
							updataProblems_API(tranData).then(res=>{
								//console.log(res)
							})
						} else{
							updataProblems_API(this.newList[e].data[n]).then(res=>{
								//console.log(res)
							})
						}
						//console.log(this.newList[e].data[n])
						// this.changeData()
					}
					// for(var i = 0;i<this.initproblemList.length;i++){
						
					// }
				}
				
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
			filterList() {
				var arr = [] //定义一个空数组
				this.problemList.forEach((item) => arr.push(item)) //在zhiweilist查找数据放入空数组
				if (this.selectPoint) { //如果有这个数据
					arr = this.problemList.filter(item => item.type.includes(this.selectPoint))
					//则在zhiweilist里过滤掉filterText
				}
				this.problemList = arr
			},
			clearProblems(e){
				for(var i = 0;i<this.initproblemList.length;i++){
					if(this.initproblemList[i].id === e.id){
						this.initproblemList[i].detail = ''
						this.initproblemList[i].rectify = ''
					}
				}
			},
			deleteProject(e) {
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
				})
				this.changeData()
			},
			dialogClose() {
				this.$refs['deletePop'].close()
			},
			addProject() {
				var sum = "";
				allProblem_API(sum).then(res=>{
					this.problemId = res.data.data[res.data.data.length-1].id
				})
				if(this.terms.length === 0){
					this.terms = {
						id: '',
						terms: '条款描述略',
						typeOne: ''
					}
					this.newProject =
						{
						  "termsUrl": [],
						  "terms":this.terms.terms,
						  "projectName": "您好",
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
				} else {
					this.newProject = 
					{
					  "termsUrl": [],
					  "terms":this.terms.terms,
					  "projectName": "您好",
					  "type": "质量", 
					  "severity": "一般",
					  "description": this.terms.description,
					  "detail": "详细描述略",
					  "photoUrl": [],
					  "rectify": "整改要求略",
					  "deadline": "2023-4-1",
					  "supervisionUnit": "督办单位1",
					  "finder": "专家1",
					  "readed": false,
						"basis": {
						      "id": this.terms.id,
						      "typeOne": this.terms.typeOne,
						      "terms": this.terms.terms,
							  "codeOne": "",
							  "codeTwo": "",
							  "codeThree": "",
							  "typeTwo": "",
							  "typeThree": "",
							  "category": "",
							  "description": "",
							  "regulations": "",
							  "labels": "",
							  "remarks": null,
							  "feedbacks": []
						  }
					  
					}
				}
				this.initproblemList.push(this.newProject)
				addProblem(this.newProject).then(res=>{
					console.log(res)
					this.problemId = res.data.data.id
					var bindMessage = {
						teamId: this.teamid,
						problemId: this.problemId
					}
					// console.log(this.teamid)
					// console.log(this.problemId)
					// console.log('绑定信息'+bindMessage)
					bindTeam_API(bindMessage).then(res=>{
						
					})
				})
				
				this.changeData()
				this.problemList[this.problemList.length-1].isOpen = true
			},
			submitChange(){
				var isSubmit = 'yes'
				for(var i = 0;i<this.initproblemList.length;i++){
					try{
						if(this.initproblemList[i].basis.typeOne === '自定义'){
							this.initproblemList[i].basis = null
						}
					}catch(e){
						//TODO handle the exception
					}
					
					//console.log(this.initproblemList[i])
					if(this.initproblemList[i].description === '' || this.initproblemList[i].rectify === ''){
						uni.showToast({
						    title: '问题描述与整改要求不能为空！',
						    icon: 'none',
						    duration: 2000
						})
						isSubmit = 'no'
						break
					} else {
						updataProblems_API(this.initproblemList[i]).then(res=>{
							console.log(res)
						})
					}
					
				}
				// deleteFile(this.deletepicMessage).then(res=>{
				// 	console.log(res)
					
				// })
				if (isSubmit === 'yes'){
					uni.showToast({
						title: '提交成功!',
						duration: 1000
					});
					this.changeData()
				} else {
					uni.showToast({
					    title: '问题描述与整改要求不能为空！',
					    icon: 'none',
					    duration: 2000
					})
				}
				console.log(this.initproblemList)
				
				
				
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
				for (var j = 0; j < this.problemList.length; j++){
					if (this.problemList[j].basis === undefined || this.problemList[j].basis === null || this.problemList[j].basis.typeOne === ''){
						this.problemList[j].basis = {
						      "id": '',
						      "codeOne": "",
						      "codeTwo": "",
						      "codeThree": "",
						      "typeOne": "自定义",
						      "typeTwo": "",
						      "typeThree": "",
						      "category": "",
						      "description": "",
						      "regulations": "",
						      "terms": '',
						      "responsibleParties": "",
						      "labels": "",
						      "remarks": null,
						      "feedbacks": []
						  }
					}
				
				}
				console.log('yes')
				//console.log(this.problemList[0].basis.typeOne)
				var map = {}
				var nList = []
				for (var i = 0; i < this.problemList.length; i++) {
					var item = this.problemList[i]
					if (!map[item.basis.typeOne]) {
						nList.push({
							typeOne: item.basis.typeOne,
							data: [item],
							bigisOpen: true,
						})
						map[item.basis.typeOne] = item
					} else {
						for (var j = 0; j < nList.length; j++) {
							var nItem = nList[j]
							if (nItem.typeOne == item.basis.typeOne) {
								nItem.data.push(item)
								break
							}
						}
					}
				}
				//console.log(nList)
				var selfId = nList.length-1
				for(var i =0;i<nList.length;i++){
					if(nList[i].typeOne === '自定义'){
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
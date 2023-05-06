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
				<view v-if="newList[index].bigisOpen" >
					<view v-for="(it, id) in item.data" :key="id">
						<view style="display: flex;flex-direction: row;">
							<view v-if="newList[index].data[id].readed===false" :class="newList[index].data[id].isOpen===false?'closeStyle':'openStyle'" @click="changeSmall(index,id)" style="background-color: #e3e3e3;">
								<text v-if="newList[index].data[id].rectify == '' &&  (newList[index].data[id].basis === null || newList[index].data[id].basis.typeOne === '自定义' || newList[index].data[id].basis.remarks === 'generate' || newList[index].data[id].isSelf === 'yes')" style="color: #ff0004;" class="text-title-style">{{it.description}}</text>
								<text v-else class="text-title-style">{{it.description}}</text>
							</view>
							<view v-if="newList[index].data[id].readed===true" :class="newList[index].data[id].isOpen===false?'closeStyle-readed':'openStyle'" @click="changeSmall(index,id)" style="background-color: #e3e3e3;">
								<text v-if="newList[index].data[id].rectify == '' && (newList[index].data[id].basis === null || newList[index].data[id].basis.typeOne === '自定义' || newList[index].data[id].basis.remarks === 'generate' || newList[index].data[id].isSelf === 'yes')" style="color: #ff0004;" class="text-title-style">{{it.description}}</text>
								<text v-else class="text-title-style">{{it.description}}</text>
							</view>
							<view v-if="newList[index].data[id].isOpen && !buttonUsed  " class="deleteStyle">
								<text v-if="newList[index].data[id].basis !== null && newList[index].data[id].basis.typeOne !== '自定义' && newList[index].data[id].basis.remarks !=='generate' && newList[index].data[id].isSelf === 'no'" style="width: 100%;" @click="clearProblems(newList[index].data[id])">
									<text style="text-align: center;">
										清空
									</text>
								</text>
								<text v-else style="width: 100%;" @click="deleteProject(newList[index].data[id])" >
									<text style="text-align: center;">
										删除
									</text>
								</text>
							</view>
						</view>
						
						<view v-if="newList[index].data[id].isOpen">
							<view style="display: flex;flex-direction: column;border-bottom: 1rpx solid darkgray;">
								<projectdetail :projectData="it"  @sendData="getData" @deleteId="getDeleteid"></projectdetail>
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
		<button class="submit-button" @tap="submitChange()" :disabled="buttonUsed">提交</button>
		<button class="self-add-button" @tap="addProject" :disabled="buttonUsed">自定义问题添加</button>
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
import { problemsbyId_API } from '../../../api/api.js'
import { projectInfo_API } from '../../../api/api.js'
import { projectUpdate_API } from '../../../api/api.js'

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
				typeOne: '1',
				category:'',
				length:1,
				description:'',
			},
			checkIdTemp:0,
			patrolId:'1',
			projectId:'1',
			projectStatus:'进行中',
			tranprojectName:'',
			templateDate:[],
			userName:'',
			patrolName:'',
			patrolTemp:'',
			projectstatusChange:'',
			buttonUsed:'',
			diyId:[],
			newOpen:''
			
		}
	},
	components:{
		projectdetail
	},
	onLoad(value) {
		
		console.log(value.id)
		value.id = JSON.parse(value.id)
		let idtemp = value.id
		// this.checkId = value.id.id
		// this.patrolId = this.checkId
		if(idtemp.id !== undefined) {
			console.log(idtemp.id)
			this.checkId = idtemp.id
			this.patrolId = this.checkId
		}
		this.projectId = idtemp.projectId
		this.projectId = Number(this.projectId)
		console.log(idtemp.patrolstatus)
		if(idtemp.patrolstatus !== undefined){
			this.projectStatus = idtemp.patrolstatus
			console.log("状态:"+this.projectStatus)
			if(this.projectStatus === '待检查' || this.projectStatus === '检查中' || this.projectStatus === '进行中' || this.projectStatus === '未检查' || this.projectStatus === '已检查'){
				this.buttonUsed = false
			} else {
				this.buttonUsed = true
				}
		}
		if(idtemp.teamid !== undefined){
			this.teamid = idtemp.teamid
		}
		try{
			//this.checkIdTemp = uni.getStorageSync('patrolId_key')
			this.userName = uni.getStorageSync('user_key')
			this.userName = this.userName.name
			// if(Number(this.checkIdTemp) !== 0){
			// 	this.checkId = this.checkIdTemp
			// }
		}catch(e){

		}
		
		this.getChecks()
		//this.getTerms()
		this.savePatrolId()
		this.getTemplate()
		this.getPatrol()
		this.getTerms()
		//this.savePatrolId()
		//this.getTemplate()
		this.sequ(0)
		//this.getDiy()
	},
	onShow() {
		// this.getTerms()
		
		//this.refresh(this.checkId)
		//this.sequ(0)
	},
	mounted() {
		// this.changeData(),
		// this.getLength()
	},
	onPullDownRefresh () {
		console.log('触发了下拉刷新')	
		this.getChecks()
		setTimeout(()=>{
			uni.stopPullDownRefresh()
		},500)
	},
	// onReachBottom() {
	// 	console.log('页面触底了')
	// },
	methods: {
		// 获取活动名，项目ID，项目状态，巡检组id
		getPatrol(){
			try{
				this.patrolTemp = uni.getStorageSync('patrolStutas_key')
				this.patrolName = this.patrolTemp.patrolname
				this.projectId = this.patrolTemp.projectId
				this.projectId = Number(this.projectId)
				this.projectStatus = this.patrolTemp.patrolstatus
				this.tranprojectName = this.patrolTemp.projectName
				
				//console.log(this.patrolTemp.projectName)
			}catch(e){

			}
		},
		
		//获取模板问题
		getTemplate(){
			try{
				//this.getPatrol()
				// 
				var idBoxthree = {
					id: this.projectId,
					patrol_id: this.patrolId
				}
				console.log(idBoxthree)
				console.log(typeof this.projectId)
				console.log(typeof this.patrolId)
				problemsbyId_API(idBoxthree).then(res => {
					console.log("获取原有问题！")
					
					console.log(res.data.data)
					if(Number(res.data.data) == 0){
						this.initproblemList = []
					}else{
						this.initproblemList = res.data.data
					}
					this.templateDate = uni.getStorageSync('template_key')
					console.log("get template success!")
					//console.log("生成模板问题")
					//console.log(this.templateDate)
					this.changeData()
					for(var i=0; i<this.templateDate.length;i++){
						//console.log("第"+i+"个")
						this.terms ={
							id: '1',
							terms: '1',
							typeOne: '1',
							typeTwo:'',
							category:'',
							length:1,
							description:'',
						}
						this.terms.id = this.templateDate[i].id
						this.terms.terms = this.templateDate[i].terms
						this.terms.typeOne = this.templateDate[i].typeOne
						this.terms.description = this.templateDate[i].description
						for(var j = 0; j<this.typeList.length;j++){
							if (this.templateDate[i].category.indexOf(this.typeList[j]) !== -1) {
								this.terms.category = this.typeList[j]
							}
						}
						this.terms.length = 1
						var isExist = this.initproblemList.filter(item => item.description === this.terms.description)
						if(isExist.length == 0){
							this.userName = "管理员"
							this.addProject()
							this.changeData()
						}
						this.terms = []
					}
					
					//this.getPatrol()
				})
			}catch(e){

			}
		},
		
		// 存储巡检ID
		savePatrolId(){
			uni.setStorage({
				key:'patrolId_key',
				data:this.checkId,
				success:function(){
					console.log('patrolId save success!')
				}
			})
		},

		getChecks(){
			uni.showToast({
				title: '数据加载中!',
				icon:"loading",
				duration: 1000
			});
			//this.getPatrol()
			var idBox = {
				id: this.projectId,
				patrol_id: this.patrolId
			}
			console.log(idBox)
			problemsbyId_API(idBox).then(res=>{
				//console.log(res.data.data)
				if(Number(res.data.data) === 0){
					//console.log(Number(res.data.data))
					console.log("调用模板")
					//this.getTemplate()
				}else{
					this.tranprojectName = res.data.data[0].projectName
					this.initproblemList = res.data.data
					this.changeData(),
					this.getLength()
				}
			})
			var sumProblems = "";
		},
		// 快捷生成
		getTerms(){
			//this.getPatrol()
			var idBoxtwo = {
				id: this.projectId,
				patrol_id: this.patrolId
			}
			console.log(idBoxtwo)
			problemsbyId_API(idBoxtwo).then(res=>{
				//console.log(res.data.data)
				if(Number(res.data.data) === 0){
					//this.getTemplate()
				}else{
					this.initproblemList = res.data.data
					try {
						this.terms = uni.getStorageSync('terms_key');
						//this.getPatrol()
						for(var j = 0; j<this.typeList.length;j++){
							if (this.terms.category.indexOf(this.typeList[j]) !== -1) {
								this.terms.category = this.typeList[j]
							}
						}
						if (this.terms.id !== undefined) {
							console.log("terms get success!")
							console.log("即将新增问题")
							
							this.addProject()
							
							//this.terms = ''
							var tempData = []
							uni.setStorage({
								key:'terms_key',
								data:tempData,
								success: function() {
									console.log('terms save null success!')
								}
							});
							
						}
					} catch (e) {
						// error
					}
				}
				
			})
			this.changeData()
			
		},
		
		getLength(){
			this.sumProjects = this.initproblemList.length
		},
		
		getData(res){
			for (var i = 0; i < this.initproblemList.length;i++){
				if (this.initproblemList[i].id === res.id) {
					this.initproblemList[i] = res
				}
			}
		},
		
		getDeleteid(e){
			var raw = JSON.stringify([
			   e
			])
			this.ifpicDelete = 'yes'
			this.deletepicMessage = raw
		},
		
		search(e){
			var pages = getCurrentPages()
			//var temp = pages.filter(item => item.route === 'pages/project/search/search')
			console.log(pages)
			let delta = 0
			//console.log(temp.length)
			for(var i = 0;i<pages.length;i++){
				if(pages[i].route === 'pages/project/search/search'){
					delta = i
				}
			}
			console.log(delta)
			// var temp = pages.filter(item => item.router === '/pages/project/search/search')
			// console.log(temp.length)
			if(delta === 0){
				console.log("正常跳转！")
				uni.navigateTo({
					 url:'/pages/project/search/search?searchText=' + e.detail.value
				}) //由搜索页传递到搜索结果页
			}else{
				console.log("跳转堆栈！")
				var searchpage = pages[delta]
				console.log(searchpage)
				uni.navigateBack({
					delta:1,
					success() {
						searchpage.onLoad({
							basisSearch:e.detail.value,
							ismodify:true,
						})
					}
				})
			}
			// uni.navigateTo({
			// 	 url:'/pages/project/search/search?searchText=' + e.detail.value
			// }) //由搜索页传递到搜索结果页
		},
		changeBig(e){
			 this.newList[e].bigisOpen = !this.newList[e].bigisOpen
			 //this.$forceUpdate()
			 this.active = !this.active
		},
		changeSmall(e,n){
			if(this.newList[e].data[n].rectify === "" && this.newList[e].data[n].isSelf === 'yes'){
				if(this.newList[e].data[n].isOpen === true){
					// uni.showToast({
					// title: '整改要求不能为空!',
					// icon:"error",
					// duration: 2000
				// });
				}
				this.newList[e].data[n].isOpen = !this.newList[e].data[n].isOpen
			} else {
				console.log("看看")
				//this.$forceUpdate()
				this.newList[e].data[n].isOpen = !this.newList[e].data[n].isOpen
				console.log(this.newList[e].data[n])
				if(!this.newList[e].data[n].readed){
					this.newList[e].data[n].readed = true
					//console.log(this.newList[e].data[n].id)
					if(this.newList[e].data[n].description !== '' || this.newList[e].data[n].rectify !== ''){
						//console.log("readed"+this.newList[e].data[n])
						if(this.newList[e].data[n].basis.typeOne === '自定义'){
							console.log("自定义道路")
							var tranData = this.newList[e].data[n]
							tranData.basis = null
							console.log(tranData)
							console.log(typeof tranData.rectify)
							updataProblems_API(tranData).then(res=>{
								console.log(res)
								console.log("自定义道路")
							})
						} else{
							console.log(typeof this.newList[e].data[n].rectify)
							updataProblems_API(this.newList[e].data[n]).then(res=>{
								console.log(res)
								console.log("不是自定义道路")
							})
						}
					}
				}else{
					if(this.newList[e].data[n].basis === null || this.newList[e].data[n].basis.typeOne === '自定义'){
						var tranData = this.newList[e].data[n]
						tranData.basis = null
						console.log("用了这里")
						console.log(tranData)
						console.log(typeof tranData.rectify)
						updataProblems_API(tranData).then(res=>{
							console.log(res)
							console.log("用了这里")
						})
					}else{
						console.log(typeof this.newList[e].data[n].rectify)
						console.log("不是自定义且basis不为空")
						updataProblems_API(this.newList[e].data[n]).then(res=>{
							console.log(res)
							console.log("不是自定义且basis不为空")
						})
					}
				}
				
				this.$forceUpdate()
				//$nextTick()
				//this.refresh(e,n)
				
			}
			
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
			// 获取问题ID
			allProblem_API(sum).then(res=>{
				this.problemId = res.data.data[res.data.data.length-1].id
			})
			var tick = '0'
			if(this.terms.length === 0){
				console.log('用了if')
				tick = '1'
				//console.log(tick)
				this.newProject =
					{
					  "termsUrl": [],
					  "terms":"",
					  "projectName": this.tranprojectName,
					  "type": "质量",
					  "severity": "一般",
					  "description": "请填写问题描述",
					  "detail": "",
					  "photoUrl": [],
					  "rectify": "",
					  "deadline": "2023-4-1",
					  "supervisionUnit": "督办单位1",
					  "finder": this.userName,
					  "readed": false,
					  "basis": null
					}
				this.diyId.push(this.problemId)
			} else {
				console.log('用了else')
				this.newProject = 
				{
				  "termsUrl": [],
				  "terms":this.terms.terms,
				  "projectName": this.tranprojectName,
				  "type": this.terms.category, 
				  "severity": "一般",
				  "description": this.terms.description,
				  "detail": "",
				  "photoUrl": [],
				  "rectify": "",
				  "deadline": "2023-4-1",
				  "supervisionUnit": "督办单位1",
				  "finder": this.userName,
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
						  "remarks": this.terms.termfrom,
						  "feedbacks": [],
					}
				}
				if(this.terms.termfrom === 'generate'){
					this.diyId.push(this.problemId)
					tick = '1'
				}
			}
			this.initproblemList.push(this.newProject)
			//console.log(this.initproblemList)
			console.log("创建新问题")
			addProblem(this.newProject).then(res=>{
				console.log(res)
				this.problemId = res.data.data.id
				console.log(tick)
				if(tick === '1'){
					this.newOpen = res.data.data.id
				}
				//this.teamid = this.patrolTemp.teamId
				console.log(this.teamid)
				var bindMessage = {
					teamId: this.teamid,
					problemId: this.problemId
				}
				console.log("绑定信息")
				console.log(bindMessage)
				this.initproblemList[this.initproblemList.length - 1].id = this.problemId
				bindTeam_API(bindMessage).then(res=>{
					console.log(res)
				})
				this.changeData()
			})
			this.terms = ''
		},
		async submitChange(){
			var isSubmit = ['yes','yes','yes']
			var forsum = 0
			for(var i = 0;i<this.initproblemList.length;i++){
				forsum = forsum + 1
				try{
					if(this.initproblemList[i].basis.typeOne === '自定义'){
						this.initproblemList[i].basis = null
					}
				}catch(e){

				}
				
				if(this.initproblemList[i].basis === null){
					console.log("该问题是自定义问题")
					if(this.initproblemList[i].description === "请填写问题描述"){
						isSubmit[0]='no'
						break
					}
					if(this.initproblemList[i].rectify === ''){
						isSubmit[2] = 'no'
						console.log("整改要求没写")
						break
					}
				}else{
					if(!this.initproblemList[i].readed){
						isSubmit[1] = 'no'
						console.log("有模板问题未读")
						break
					}
				}
				if(this.initproblemList[i].rectify === ''  && this.initproblemList[i].finder !== "管理员"){
					isSubmit[2] = 'no'
					console.log("固定项整改要求没写")
					break
				} else {
					updataProblems_API(this.initproblemList[i]).then(res=>{
						console.log(res)
					})
				}
			}
			
			console.log("看一下isSubmit")
			//console.log(isSubmit)
			//console.log(forsum)
			if(isSubmit[0] === 'no'){
				uni.showToast({
					title: '请更新问题描述！',
					icon: 'none',
					duration: 2000
				})
			} else if(isSubmit[1] === 'no'){
				uni.showToast({
					title: '模板问题尚看完！',
					icon: 'none',
					duration: 2000
				})
			} else if(isSubmit[2] === 'no'){
				 uni.showToast({
				 	title: '整改要求不能为空！',
				 	icon: 'none',
				 	duration: 2000
				 })
			} else {
				uni.showToast({
					title: '提交成功!',
					duration: 1000
				});
				this.projectStatus = '已检查'
				projectInfo_API(this.projectId).then(res=>{
					this.projectstatusChange = res.data.data
					for (var i=0;i<this.projectstatusChange.patrolStatus.length;i++){
						if(this.projectstatusChange.patrolStatus[i].patrol_name === this.patrolName){
							this.projectstatusChange.patrolStatus[i].status = '已检查'
							projectUpdate_API(this.projectstatusChange).then(res=>{
								console.log(res)
							})
						}
					}
				})
				this.changeData()
				uni.redirectTo({
					url:'/pages/project/info/info?id='+this.projectId
				})
			}
			
			
		},
		changeData() {
			this.problemList = this.initproblemList
			this.filterList()
			
			// 添加是否为自定义问题字段
			
			//console.log(this.problemList)
			//console.log(this.templateDate)
			for (var j = 0; j < this.problemList.length; j++){
				this.problemList[j].isSelf = 'yes'
				this.problemList[j].isOpen = false
				for(var i=0;i<this.templateDate.length;i++){
					// console.log("看这里")
					// console.log(this.problemList[j].basis.id)
					if(this.problemList[j].basis !== null && this.problemList[j].basis.id !== undefined && this.problemList[j].basis.id === this.templateDate[i].id){
							this.problemList[j].isSelf = 'no'    //添加自定义字段
					}
				}
				
				if(this.problemList[j].id === this.newOpen){
					this.problemList[j].isOpen = true
				}
				
			}
			//console.log("看看tick")
			//console.log(this.newOpen)
			//console.log(this.problemList)
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
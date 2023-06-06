<template>
	<view>
		<view class="top" style="border-bottom: 1rpx solid #cacaca;"></view>
		<view class="description">
			<view class="name">描述</view>
			<view class="detail">{{data[0].description}}
				<view class="remarkContent">
					<view v-if="this.data[0].remarks.length !== 0" class="remark" v-for="(item,index) in data[0].remarks" :key="index">
						<text v-if="item === '强条'" class="remarkDetail" style="background-color: #bf1f00;">{{item}}</text>
						<text v-if="item === '专家重点'" class="remarkDetail" style="background-color: #ffd606;">{{item}}</text>
						<text v-if="item === '政府重点'" class="remarkDetail" style="background-color: #ff9020;">{{item}}</text>
						<text v-if="item === '过时'" class="remarkDetail" style="background-color: #ff6207;">{{item}}</text>
						<text v-if="item === '错误'" class="remarkDetail" style="background-color: #bfbfbf;">{{item}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="description">
			<view class="name">相关法规标准</view>
			<view class="detail" v-if="data[0].regulations === null">暂无数据</view>
			<view class="detail">{{data[0].regulations}}</view>
		</view>
		<view class="description">
			<view class="name">标准内容或条款</view>
			<view class="detail" v-if="data[0].terms === null">暂无数据</view>
			<view class="detail">{{data[0].terms}}</view>
		</view>
		<view class="description">
			<view class="name">责任主体</view>
			<view class="detail" v-if="data[0].responsibleParties === null">暂无数据</view>
			<view class="detail">{{data[0].responsibleParties}}</view>
		</view>
		<button v-if="this.cameFrom === '1'" class="hs-create" @click="generateIssues">生成问题</button>
		<view class="hs-feedback" @click="feedBack('top')">条款存在问题？点我反馈</view>
		
		<!-- 反馈弹窗 -->
		<uni-popup ref="popup">
			<view class="pop">
				<text class="Name">反馈内容</text>
				<textarea class="detailInfo" v-model="proofValue"  placeholder="请输入反馈内容..."/>
				<text class="Name">证明资料</text>
				<view class="hs-choose-pic">
					<uni-file-picker limit="2" title="上传图片" @select="pictureSelect" @delete="deleteFile"></uni-file-picker>
				</view>
				<button class="submit" @click="seedFeedBack()">发送</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { basisById_API } from '../../../api/api.js'
	import { feedbackBasis_API } from '../../../api/api.js'
	import { feedbackBindBasis_API } from '../../../api/api.js'
	import { rootBases_API } from '../../../api/api.js'
	export default {
		data() {
			return {
				data: [
				        {
				            id: 1,
							typeOne:'',
				            type: "",
				            description: "",
				            regulations: "",
				            terms: "",
				            responsibleParties: "",
				            remarks: [],
				        }
				    ],
				cameFrom:0,
				basisId:0,
				basisTable:[],
				proofValue:'',
				proofPictureUrl:[],
				feedBackId:0,
				patrolTemp:'',
				projectId:'',
				patrolStatus:'',
				teamId:0,
				deadline:'',
				token:'',
				user:'',
				deleteId:'',
				patrolId:0,
				rootBases:[],
			}
		},
		onLoad(value) {
			this.token = uni.getStorageSync('token_key')
			this.user = uni.getStorageSync('user_key')
			this.patrolId = uni.getStorageSync('patrolStutas_key').id
			this.cameFrom = value.from
			this.getStorageBasisId()
		},
		methods: {
			getStorageBasisId(){
				try {
					this.basisId = uni.getStorageSync('basisID_key');
					if (this.basisId) {
						console.log("basisID get success!")
						var temp = {
							id:this.basisId,
							token:this.token
						}
						basisById_API(temp).then(res => {
							this.basisTable = res.data.data
							const reg = /\d+/g //数字的正则
							rootBases_API(temp).then(res => {
								console.log(this.basisTable)
								this.data[0].id = this.basisTable.id
								this.data[0].description = this.basisTable.description
								this.data[0].regulations = this.basisTable.regulations
								this.data[0].terms = this.basisTable.terms
								this.data[0].responsibleParties = this.basisTable.responsibleParties
								this.rootBases = res.data.data
								if(this.basisTable.parentCode !== null){
									const code = this.basisTable.parentCode.match(reg)
									const baseTemp = this.rootBases.filter(item => (item.category === this.basisTable.category && item.code === code[0]))
									this.data[0].typeOne = baseTemp[0].description
								}else{
									this.data[0].typeOne = this.basisTable.description
								}
								console.log(this.data[0].typeOne)
								this.data[0].type = this.basisTable.category
								if(this.basisTable.labels !== null){
									const tempListLabel = this.basisTable.labels.match(reg) //labels “1，2，3，4” string > [1,2,3,4] list  labels.includes()
									if(tempListLabel !== null){
										for(var i = 0;i < tempListLabel.length;i++){
											if(tempListLabel[i] == 3) {
												let detail = "专家重点" 
												this.data[0].remarks.push(detail)
											}else if(tempListLabel[i] == 2){
												let detail = "政府重点"
												this.data[0].remarks.push(detail)
											}else if(tempListLabel[i] == 1){
												let detail = "强条"
												this.data[0].remarks.push(detail)
											}else if(tempListLabel[i] == 4){
												let detail = "过时"
												this.data[0].remarks.push(detail)
											}else if(tempListLabel[i] == 5){
												let detail = "错误"
												this.data[0].remarks.push(detail)
											}
										}
									}
								}
								this.patrolTemp = uni.getStorageSync('patrolStutas_key')
								this.projectId = this.patrolTemp.projectId
								this.patrolStatus = this.patrolTemp.patrolstatus
								this.teamId = this.patrolTemp.teamId
								this.deadline = this.patrolTemp.deadline
							})
						})
					}
				} catch (e) {
					// error
				}
			},
			feedBack(){
				this.$refs['popup'].open();
			},
			pictureSelect(e){
				uni.uploadFile({
					url: 'https://zsjs.huaskj.com/weps-api/upload_files', //仅为示例，非真实的接口地址
					filePath: e.tempFilePaths[0],
					name: 'files',
					formData: {
						'dirName': "水务/"
					},
					header:{
						"Authorization":this.token,
					},
					success: (uploadFileRes) => {
						let json_data = JSON.parse(uploadFileRes.data)
						//console.log(json_data.data[0]);
						this.uploadData = 'https://server-1315831071.cos.ap-nanjing.myqcloud.com/' + json_data.data[0]
						//console.log(this.uploadData)
						this.proofPictureUrl.push(
							json_data.data[0]
						)
						//console.log(this.proofPictureUrl)
					}
				})
			},
			deleteFile(e){
				var sameSum = 0
				for (var i = 0;i<this.proofPictureUrl.length;i++){
					if(this.proofPictureUrl[i].url === e.tempFilePath){
						this.deleteId = i
						sameSum = sameSum + 1
					}
				}
				if(sameSum >= 2){
					this.proofPictureUrl.splice(this.deleteId,1)
					//console.log(this.projectData.photoUrl)
				} else {
					this.proofPictureUrl.splice(this.deleteId,1)
					//console.log(this.projectData.photoUrl)
					let result = e.tempFilePath.slice(57)
					console.log(result)
				}
			},
			seedFeedBack(){
				var proofpic = []
				for(var i = 0;i<this.proofPictureUrl.length;i++){
					proofpic.push(this.proofPictureUrl[i])
				}
				var feedBackData = {
					data:{
						name: this.user.name,
						content: this.proofValue,
						status: "未审核",
						proofUrl: proofpic
					},
					token:this.token
				}
				//console.log(feedBackData)
				
				feedbackBasis_API(feedBackData).then(res =>{
					console.log(res.data.data)
					this.feedBackId = res.data.data.id
					var bindData = {
						data:{
						basisId:this.basisTable.id,
						feedbackId:this.feedBackId,
					},
						token:this.token
					}
					
					feedbackBindBasis_API(bindData).then(res =>{
						console.log("binding feedback to basis success!")
					})
					console.log("upload feedback success!")
				})
				uni.showToast({
					title:'反馈成功',
					duration:1500
				})
				this.$refs['popup'].close();
			},
			filterImgType(img) {
				if (/png/g.test(img)) {
					  return 'png'
				  } else if (/jpg/g.test(img)) {
					  return 'jpg'
				  } else if (/gif/g.test(img)) {
					  return 'gif'
				  } else if (/jpeg/g.test(img)) {
					  return 'jpeg'
				  }
			 },
			generateIssues(){
				var basisData = {
					id:this.data[0].id,
					description:this.data[0].description,
					typeOne:this.data[0].typeOne,
					terms:this.data[0].terms,
					category:this.data[0].type,
					termfrom:"generate",
				}
				console.log(basisData)
				uni.setStorage({
					key:'terms_key',
					data:basisData,
					success: function() {
						console.log('terms save success!')
					}
				});
				// 判断巡检结束 是否能够新增问题。
				if(this.patrolStatus == '未检查'|| this.patrolStatus == '检查中' || this.patrolStatus == '已检查'){
					let temp = {
						id:this.patrolId,
						url:Date.now(),
						projectId:this.projectId,
						patrolstatus:this.patrolStatus,
						teamid:this.teamId,
						deadline:this.deadline
					}
					console.log(temp)
					uni.redirectTo({
						url:'/pages/project/checks/checks?id='+JSON.stringify(temp)
					})
				}else{
					uni.showToast({
						title:"该项目已巡检结束！",
						icon:'error',
						duration:1000
					})
				}
				
				
			},
		}
	}
</script>

<style lang="scss" scoped>
@import url('detail.scss');
</style>

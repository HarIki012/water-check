<template>
	<view>
		<view class="top" style="border-bottom: 1rpx solid #cacaca;"></view>
		<view class="description">
			<view class="name">描述</view>
			<view class="detail">{{data[0].description}}
				<view class="remarkContent">
					<view v-if="this.data[0].remarks.length !== 0" class="remark" v-for="(item,index) in data[0].remarks">
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
			<view class="detail">{{data[0].regulations}}</view>
		</view>
		<view class="description">
			<view class="name">标准内容或条款</view>
			<view class="detail">{{data[0].terms}}</view>
		</view>
		<view class="description">
			<view class="name">责任主体</view>
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
					<uni-file-picker limit="2" title="上传图片" @select="pictureSelect"></uni-file-picker>
				</view>
				<button class="submit" @click="seedFeedBack()">发送</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { problemById_API } from '../../../api/api.js'
	import { basisById_API } from '../../../api/api.js'
	import { feedbackBasis_API } from '../../../api/api.js'
	import { feedbackBindBasis_API } from '../../../api/api.js'
	export default {
		data() {
			return {
				data: [
				        {
				            id: 1,
							typeOne:'',
				            type: "文明施工-1基本规定-1.1文明施工管理责任-1.1.1建设单位主要职责",
				            description: "未在招标文件或者承发包合同中明确设计、施工以及监理等单位有关文明施工的要求和措施。",
				            regulations: "武汉市水务工地文明施工标准化图册（2020年版）第1.1.1条，第1点",
				            terms: "第七条水利工程项目法人（建设单位）、监理、设计、施工等单位的负责人，对本单位的质量工作负领导责任。各单位在工程现场的项目负责人对本单位在工程现场的质量工作负直接领导责任。各单位的工程技术负责人对质量工作负技术责任。具体工作人员为直接责任人。\n第十六条2.组建建设单位由项目主管部门或投资各方负责；建设单位需具备下列条件：\n（1）具有相对独立的组织形式。内部机构设置，人员配备能满足工程建设的需要；\n（3）主要行政和技术、经济负责人是专职人员，并保持相对稳定。\n第四条（十一）水利工程建设项目法人应具备以下基本条件:3.总人数应满足工程建设管理需要，大、中、小型工程人数一般按照不少于30、12、6人配备，其中工程专业技术人员原则上不少于总人数的50%。\n4.项目法人的主要负责人、技术负责人和财务负责人应具备相应的管理能力和工程建设管理经验。其中，技术负责人应为专职人员，有从事类似水利工程建设管理的工作经历和经验，能够独立处理工程建设中的专业问题，并具备与工程建设相适应的专业技术职称。大型水利工程和坝高大于70米的水库工程项目法人技术负责人应具备水利或相关专业高级职称或执业资格，其他水利工程项目法人技术负责人应具备水利或相关专业中级以上职称或执业资格",
				            responsibleParties: "建设单位",
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
				
			}
		},
		onLoad(value) {
			this.cameFrom = value.from
			this.getStorageBasisId()
		},
		methods: {
			getStorageBasisId(){
				try {
					this.basisId = uni.getStorageSync('basisID_key');
					if (this.basisId) {
						console.log("basisID get success!")
						basisById_API(this.basisId).then(res => {
							this.basisTable = res.data.data
							this.data[0].id = this.basisTable.id
							this.data[0].description = this.basisTable.description
							this.data[0].regulations = this.basisTable.regulations
							this.data[0].terms = this.basisTable.terms
							this.data[0].responsibleParties = this.basisTable.responsibleParties
							this.data[0].typeOne = this.basisTable.typeOne
							this.data[0].type = this.basisTable.category
							const reg = /\d+/g
							const number = this.basisTable.labels.match(reg)
							
							console.log(number)
							if(number !== null){
								for(var i = 0;i < number.length;i++){
									if(number[i] == 3) {
										console.log(3)
										let detail = "专家重点" 
										this.data[0].remarks.push(detail)
									}else if(number[i] == 2){
										console.log(2)
										let detail = "政府重点"
										this.data[0].remarks.push(detail)
									}else if(number[i] == 1){
										console.log(1)
										let detail = "强条"
										this.data[0].remarks.push(detail)
									}else if(number[i] == 4){
										console.log(4)
										let detail = "过时"
										this.data[0].remarks.push(detail)
										console.log(5)
									}else if(number[i] == 5){
										let detail = "错误"
										this.data[0].remarks.push(detail)
									}
								}
							}
							
							console.log(this.data[0].remarks)
							
							this.patrolTemp = uni.getStorageSync('patrolStutas_key')
							this.projectId = this.patrolTemp.projectId
							this.patrolStatus = this.patrolTemp.patrolstatus
							this.teamId = this.patrolTemp.teamId
							//console.log(this.patrolStatus)
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
			seedFeedBack(){
				var proofpic = []
				for(var i = 0;i<this.proofPictureUrl.length;i++){
					proofpic.push(this.proofPictureUrl[i])
				}
				var feedBackData = {
					name: "专家1",
					content: this.proofValue,
					status: "未审核",
					proofUrl: proofpic
				}
				try{
					var expert = uni.getStorageSync('user_key')
					feedBackData.name = expert.name
				}catch(e){
					
				}
				console.log(feedBackData)
				feedbackBasis_API(feedBackData).then(res =>{
					this.feedBackId = res.data.data.id
					var bindData = {
						basisId:this.basisTable.id,
						feedbackId:this.feedBackId,
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
				console.log(this.data[0].type)
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
				// // 判断巡检结束 是否能够新增问题。
				// if(this.patrolStatus == '未检查'|| this.patrolStatus == '检查中'){
				// 	let temp = {
				// 		url:Date.now(),
				// 		projectId:this.projectId,
				// 		patrolstatus:this.patrolStatus
				// 	}
				// 	//console.log(temp)
				// 	uni.redirectTo({
				// 		url:'/pages/project/checks/checks?id='+JSON.stringify(temp)
				// 	})
				// }else{
				// 	uni.showToast({
				// 		title:"该项目已巡检结束！",
				// 		duration:1500
				// 	})
				// }
				let temp = {
					url:Date.now(),
					projectId:this.projectId,
					patrolstatus:this.patrolStatus,
					teamid:this.teamId,
				}
				//console.log(temp)
				uni.redirectTo({
					url:'/pages/project/checks/checks?id='+JSON.stringify(temp)
				})
				
			},
		}
	}
</script>

<style lang="scss" scoped>
@import url('detail.scss');
</style>

<template>
	<view class="projectSearch" >
		<view class="projectStyle">
			<picker class="centerStyle" @change="projectSelect" :range="projectChoose" >
				<label style="text-align: center;height: 100%;">{{ projectselectName }}</label>
			</picker>
		</view>
		<input class="selectStyle" style="padding-left: 20rpx;" type="text" :value="basisSearch" placeholder="问题检索" confirm-type="search">
		<text class="select-text" @click="searchByName">搜索</text>
	</view>
	<view class="sortBorder">
			<view class="sort" v-for="(item,index) in termsData">
				<view v-if="!item.delete">
					<view class="delete iconfont icon icon-shanchu2" @click="deleteTagData(index)"> </view>
					<view :class="item.flag ? 'sortItemOpen iconfont icon icon-xiangxia1' : 'sortItem iconfont icon icon-xiangyou'" @click="showTagData(index)">{{item.typeOne}}</view>
					<view :class="item.flag ? 'active':'border'">
						<view class="info" v-for="(item,index) in item.info">
							<view v-if="item.show" class="detail" @click="navigateTodetail(item.id)">{{item.description}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

</template>

<script>
	import { allBasis_API } from '../../../api/api.js'
	import { searchBasis_API } from '../../../api/api.js'
	export default {
		
		data() {
			return {
				flag:false,
				projectselectName: '全部',
				basisSearch: '',
				projectChoose: ['全部', '质量', '安全', '文明施工'],
				projectselectIndex: 0,
				problemTable:[],
				typeOneTable:[],
				problemData:[],
				dataList: [],
				searchDetail: '',
				from:1,
				basisSize:10,
				termsData:[],
				termsTable:[],
				termsTemp:{
					id:0,
					typeOne:'',
					info:[],
					delete:false,
					flag:true,
				},
				infoTemp:{
					id:0,
					category:"",
					description: "",
					show:true,
				},
				ismodify:false,
			};

		},
		// components:{
		// 	checkItemDetail
		// },
		onLoad(value) {
			//console.log(value.searchText)
			//console.log(value.ismodify)
			//console.log(value.basisSearch)
			if(value.ismodify === undefined){
				if(value.searchText){
					this.getSearch(value.searchText)
					this.getBasis(this.basisSearch)
				}
			}else if(value.ismodify === true){
				this.basisSearch = value.basisSearch
				this.termsData = []
				this.getBasis(value.basisSearch)
			}
			
		},
		onShow() {
			
			
		},
		computed: {
			
		},
		methods:{
			//获取所有依据
			getBasis(data){
				uni.showLoading({
					title:"搜索中..."
				})
				searchBasis_API(data).then(res =>{
					this.processBasisData(res.data.data)
					console.log("search basis success")
					uni.hideLoading()
				})
			},
			processBasisData(data){
				this.termsData = []
				this.termsTable = data
				if (this.termsTable) {
					var index = 0;
					this.typeOneTable = []
					for(var i = 0; i < this.termsTable.length ; i++){
						
						if(this.typeOneTable.includes(this.termsTable[i].typeOne)){
							//得到name相同的项目
							//获取相同typeOne的index
							const index = this.termsData.findIndex(item => item.typeOne === this.termsTable[i].typeOne);
							this.infoTemp = {
								id:this.termsTable[i].id,
								category:this.termsTable[i].category,
								description: this.termsTable[i].description,
								show:true,
							}
							this.termsData[index].info.push(this.infoTemp) //推入info
							//console.log("push info")
						}else{
							this.typeOneTable.push(this.termsTable[i].typeOne);
							this.infoTemp = {
								id:this.termsTable[i].id,
								category:this.termsTable[i].category,
								description: this.termsTable[i].description,
								show:true,
							}
							this.termsTemp = {
								id:i,
								typeOne:this.termsTable[i].typeOne,
								info:[],
								delete:false,
								flag:true,
							}
							this.termsTemp.info.push(this.infoTemp)
							this.termsData.push(this.termsTemp)
							//console.log("push problem")
						}
					}
				}
			},
			
			//按名称选择
			searchByName(){
				this.getBasis(this.basisSearch)
			},
			//按钮选择type
			filterList() {
				var arr = [] //定义一个空数组
				var arrInfo = []
				this.termsData.forEach((item) => {
					item.delete = false
					item.info.forEach((item) =>{
						item.show = true
					})
					arr.push(item)
					}) //将数据放入空数据
					
				if (this.projectselectName !== '全部') {
					//获取到有该字段的数据
					for(var i = 0;i<arr.length;i++){
						console.log(arr[i].info)
						arrInfo = arr[i].info.filter(item => !item.category.includes(this.projectselectName)).map(item => item.id);
						for(var j = 0;j<arrInfo.length;j++){
							if(arrInfo.length === arr[i].info.length){
								arr[i].delete = true
							}
							else{
								for(var k = 0;k<arr[i].info.length;k++){
									if (arr[i].info[k].id === arrInfo[j]){
										arr[i].info[k].show = false
									} 
								}
							}
						}
					}
				}
				
			},
			getSearch(value){
				this.basisSearch = value
				//console.log(this.projectnameSearch)
			},
			projectSelect(e) {
			    this.projectselectIndex = e.detail.value;
			    this.projectselectName=this.projectChoose[this.projectselectIndex]
				this.filterList()
			},
			//下拉
			showTagData(index){
				// console.log(index)
				this.termsData[index].flag = !this.termsData[index].flag
				// console.log(this.sort[index].flag)
			},
			//删除
			deleteTagData(index){
				this.termsData[index].delete = !this.termsData[index].delete
			},
			
			//跳转
			navigateTodetail(id){
				
				uni.setStorage({
					key:'basisID_key',
					data:id,
					success: function() {
						console.log('basisID save success!')
					}
				});
				
				uni.navigateTo({
					url:'/pages/project/detail/detail?from='+this.from
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
@import url('search.scss');
</style>

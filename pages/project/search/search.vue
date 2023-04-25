<template>
	<view class="projectSearch" >
		<view class="projectStyle">
			<picker class="centerStyle" @change="projectSelect" :range="projectChoose" >
				<label style="text-align: center;height: 100%;">{{ projectselectName }}</label>
			</picker>
		</view>
		<input class="selectStyle" style="padding-left: 20rpx;" type="text" v-model="basisSearch" placeholder="问题检索" confirm-type="search">
		<text class="select-text" @click="searchByName">搜索</text>
	</view>
	<view class="sortBorder">
			<view class="sort" v-for="(item,index) in termsData">
				<view v-if="!item.delete">
					<view class="delete iconfont icon icon-shanchu2" @click="deleteTagData(index)"> </view>
					<view :class="item.flag ? 'sortItemOpen iconfont icon icon-xiangxia1' : 'sortItem iconfont icon icon-xiangyou'" @click="showTagData(index)">{{item.projectName}}</view>
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
				termsData:[]
				termsTable:[],
				termsTemp:{
					typeOne:'',
					info:[],
					delete:false,
					flag:true,
				},
				infoTemp:{
					id:0,
					description: "",
					show:true,
				},
			};

		},
		// components:{
		// 	checkItemDetail
		// },
		onLoad(value) {
			//console.log(value.searchText)
			if(value.searchText){
				this.getSearch(value.searchText)
				this.getBasis(value.searchText)
			}
			
		},
		computed: {
			
		},
		methods:{
			//获取所有依据
			getBasis(data){
				searchBasis_API(data).then(res =>{
					this.processBasisData(res.data.data)
					console.log("search basis success")
				})
			},
			processBasisData(data){
				this.termsTable = data
				if (this.termsTable) {
					var index = 0;
					this.typeOneTable = []
					for(var i = 0; i < this.termsTable.length ; i++){
						
						if(this.typeOneTable.includes(this.termsTable[i].)){
							//得到name相同的项目
							const result = this.termsData.filter(item => item.typeOne === this.termsTable[i].typeOne).map(item => item.id);
							const index = result[0]
							this.infoTemp = {
								id:this.termsTable[i].id,
								description: this.termsTable[i].description,
								show:true,
							}
							this.termsData[index].info.push(this.infoTemp) //推入info
							console.log("push info")
						}else{
							this.typeOneTable.push(this.termsTable[i].typeOne);
							console.log(this.typeOneTable)
							this.infoTemp = {
								id:this.termsTable[i].id,
								description: this.termsTable[i].description,
								show:true,
							}
							this.termsTemp = {
								typeOne:this.termsTable[i].typeOne,
								info:[],
								delete:false,
								flag:true,
							}
							this.termsTemp.info.push(this.infoTemp)
							this.termsData.push(this.termsTemp)
							console.log("push problem")
						}
						
					}
					console.log(this.termsData)
				}
			},
			
			
			
			//按名称选择
			searchByName(){
				var arr = [] //定义一个空数组
				var arrInfo = []
				this.termsTable.forEach((item) => {
					item.delete = false
					item.info.forEach((item) =>{
						item.show = true
					})
					arr.push(item)
					}) //将数据放入空数据
				console.log(arr)
				if(this.basisSearch){
					for(var i = 0;i<arr.length;i++){
						console.log(arr[i].info)
						arrInfo = arr[i].info.filter(item => !item.description.includes(this.basisSearch)).map(item => item.id);
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
			//按钮选择type
			filterList() {
				var arr = [] //定义一个空数组
				var arrInfo = []
				this.termsTable.forEach((item) => {
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
						arrInfo = arr[i].info.filter(item => !item.type.includes(this.projectselectName)).map(item => item.id);
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
				this.termsTable[index].flag = !this.termsTable[index].flag
				// console.log(this.sort[index].flag)
			},
			//删除
			deleteTagData(index){
				this.termsTable[index].delete = !this.termsTable[index].delete
			},
			//跳转
			navigateTodetail(id){
				
				uni.setStorage({
					key:'basis_key',
					data:this.termsTable.info,
					success: function() {
						console.log('basis save success!')
					}
				});
				uni.setStorage({
					key:'problemId_key',
					data:id,
					success: function() {
						console.log('problemId save success!')
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

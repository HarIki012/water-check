<template>
	<view class="projectSearch" >
		<view class="projectStyle">
			<picker class="centerStyle" @change="projectSelect" :range="projectChoose" >
				<label style="text-align: center;height: 100%;">{{ projectselectName }}</label>
			</picker>
		</view>
		<input class="selectStyle" style="padding-left: 20rpx;" type="text" v-model="projectnameSearch" placeholder="项目名称" confirm-type="search">
		<text class="select-text" @click="searchByName">搜索</text>
	</view>
	<view class="sortBorder">
			<view class="sort" v-for="(item,index) in problemData">
				<view v-if="!item.delete">
					<view class="delete iconfont icon icon-shanchu2" @click="deleteTagData(index)"> </view>
					<view :class="item.flag ? 'sortItemOpen iconfont icon icon-xiangxia1' : 'sortItem iconfont icon icon-xiangyou'" @click="showTagData(index)">{{item.projectName}}</view>
					<view :class="item.flag ? 'active':'border'">
						<view class="info" v-for="(item,index) in item.info">
							<view v-if="item.show" class="detail" @click="navigateTodetail()">{{item.description}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

</template>

<script>
	export default {
		
		data() {
			return {
				flag:false,
				projectselectName: '全部',
				projectnameSearch: '',
				projectChoose: ['全部', '质量', '安全', '文明施工'],
				projectselectIndex: 0,
				problemTable:[],
				projectNameTable:[],
				problemTemp:{
					id:0,
					projectName:'',
					info:[],
					delete:false,
					flag:true,
				},
				infoTemp:{
					id:0,
					type:'',
					description: "",
					basis:1,
					show:true,
				},
				problemData:[],
				dataList: [],
				searchDetail: '',
				from:1,
			};

		},
		// components:{
		// 	checkItemDetail
		// },
		onLoad(value) {
			//console.log(value.searchText)
			if(value.searchText){
				this.getSearch(value.searchText)
			}
			this.getStorageProblem()
		},
		computed: {
			
		},
		methods:{
			//按名称选择
			searchByName(){
				var arr = [] //定义一个空数组
				var arrInfo = []
				this.problemData.forEach((item) => {
					item.delete = false
					item.info.forEach((item) =>{
						item.show = true
					})
					arr.push(item)
					}) //将数据放入空数据
				if(this.projectnameSearch){
					for(var i = 0;i<arr.length;i++){
						console.log(arr[i].info)
						arrInfo = arr[i].info.filter(item => !item.description.includes(this.projectnameSearch)).map(item => item.id);
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
				this.problemData.forEach((item) => {
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
				this.projectnameSearch = value
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
				this.problemData[index].flag = !this.problemData[index].flag
				// console.log(this.sort[index].flag)
			},
			//删除
			deleteTagData(index){
				this.problemData[index].delete = !this.problemData[index].delete
			},
			//跳转
			navigateTodetail(){
				uni.navigateTo({
					url:'/pages/project/detail/detail?from='+this.from
				})
			},
			//获取数据
			getStorageProblem(){
				try {
					this.problemTable = uni.getStorageSync('problem_key');
					if (this.problemTable) {
						console.log("problem get success!")
						var index = 0;
						for(var i = 0; i < this.problemTable.length ; i++){
							console.log(this.problemTable[i].projectName)
							if(this.projectNameTable.includes(this.problemTable[i].projectName)){
								//得到name相同的项目
								const result = this.problemData.filter(item => item.projectName === this.problemTable[i].projectName).map(item => item.id);
								const index = result[0]
								this.infoTemp = {
									id:this.problemTable[i].id,
									type:this.problemTable[i].type,
									description: this.problemTable[i].description,
									show:true,
									basis:this.problemTable[i].basis,
								}
								this.problemData[index].info.push(this.infoTemp) //推入info
								console.log("push info")
							}else{
								this.problemTemp.projectName = this.problemTable[i].projectName
								this.projectNameTable.push(this.problemTemp.projectName)
								this.infoTemp = {
									id:this.problemTable[i].id,
									type:this.problemTable[i].type,
									description: this.problemTable[i].description,
									show:true,
									basis:this.problemTable[i].basis,
								} 
								this.problemTemp.info.push(this.infoTemp)
								this.problemData.push(this.problemTemp)
								console.log("push problem")
							}
						}
						console.log(this.problemData)
					}
				} catch (e) {
					// error
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
@import url('search.scss');
</style>

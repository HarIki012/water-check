<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map class="map" 
					id="map" 
					:latitude="latitude" 
					:longitude="longitude" 
					:scale="scale" 
					subkey="EIZBZ-NQRWN-N2IFP-SLVKB-NAF65-SIBM4"
					:show-location="true"
					@markertap="clickMarker"
					>
				</map>
			</view>
		</view>
		<uni-popup class="popup-detail" ref="popup" type="bottom" background-color="#fff">
			<view class="title-content" >
				<text class="text">{{ title }}</text>
			</view>
			<view class="info-content">
				<text class="info-link iconfont icon-chazhao" @click="navigaToInfo">详情</text>
				<text class="navigation-link iconfont icon-ditu" @click="toAddress">去这里</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { projectsAll_API } from '../../api/api.js'
	export default {
		data() {
			return {
				mapCtx:null,
				projectTable: [],//存放项目数据
				id:0, // 使用 marker点击事件 需要填写id
				latitude: 30.475187166742604,  // 纬度
				longitude: 114.39870105601321, // 经度
				scale:10,//缩放等级
				sumData:1000, //多少条数据
				markerTemp:{
					id: 1,
					latitude: 30.575187166742604,
					longitude: 114.49870105601321,
					iconPath: '/static/maker_red.png',
					width:30,
					height:30,
					joinCluster:true,
					Callout:{
						content:'',
						anchorY:0,
						display:'ALWAYS',
						textAlign:'center',
						bgColor:'#eee',
						fontSize:14,
					},
					
					label:{
						content:'',
						anchorY:0,
						display:'ALWAYS',
						textAlign:'center',
						bgColor:'transparent',
						fontSize:14,
					}
				},
				markers:[],
				title:'',
				dataTemp:{},
				token:'',
			}
		},
		onLoad: function() {
			this.initMap()
		},
		onReady() {
			
		},
		onShow(){
			this.markers = []
			this.initMap()
		},
		methods: {
			initMap(){
				this.token = uni.getStorageSync('token_key')
				this._mapContext = uni.createMapContext("map", this);
				// 仅调用初始化才会触发on
				
				this._mapContext.initMarkerCluster({
					enableDefaultStyle: false,
					zoomOnClick: true,
					gridSize: 40,
					complete(res) {
					  console.log('initMarkerCluster', res)
					}
				});
				
				this._mapContext.on("markerClusterCreate", (e) => {
					console.log("markerClusterCreate", e);
					let clusterMarkers = []
					const clusters = e.clusters // 产生新的聚合簇
					clusters.forEach((cluster,index) => {
						const {
							center,
							clusterId,
							markerIds
						} = cluster
						let clusterObj = {
							clusterId,
							...center,
							width: 0,
							height: 0,
							iconPath: '',
							label: {// 定制聚合簇样式
								content: markerIds.length + '',
								fontSize: 16,
								color: '#fff',
								width: 30,
								height: 30,
								bgColor: '#419afcD9',
								borderRadius: 25,
								textAlign: 'center',
								anchorX: -10,
								anchorY: -35,
							}
						}
						clusterMarkers.push(clusterObj)
					})
					this._mapContext.addMarkers({
						markers:clusterMarkers,
						clear: false,
					})
				});
				this.addMarkers();
			},
			// 添加标记点位
			addMarkers() {
				this.getallProjects()
			  },
			getallProjects(){
				var tranData = {
					data:{
						page:1,
						size:10000,
						},
					token:this.token
				}
				projectsAll_API(tranData).then(result=>{
					this.projectTable = result.data.data.data
					uni.setStorage({
						key:'project_key',
						data:this.projectTable,
						success: function() {
							console.log('project save success!')
						}
					});
					let markers = [];
					if(this.markers.length === 0){
						for(var i = 0; i < this.projectTable.length;i++){
							this.markerTemp.dataset = this.projectTable[i]
							this.markerTemp.id = i
							this.markerTemp.latitude = this.projectTable[i].latitude
							this.markerTemp.longitude = this.projectTable[i].longitude
							this.markerTemp.label = {
							  content: this.projectTable[i].name.toString().substr(0, 10) + '...',
							  anchorY: 0,
							  display: 'ALWAYS',
							  textAlign: 'center',
							  bgColor: 'transparent',
							  fontSize: 14,
							  anchorX:-50,
							};
							
							let newMarker = Object.assign({},this.markerTemp)
							markers.push(newMarker)
						}
						this.markers = markers
					}else{
						markers = this.markers
					}
					console.log(markers)
					this._mapContext.addMarkers({
						markers,
						clear: false,
						complete(res) {
						  console.log('addMarkers', res)
						}
					})
				})
			
			},
			clickMarker(e){
				this.$refs.popup.open('bottom')
				console.log("我点击了一个标记点！")
				console.log(this.markers[e.markerId].dataset)
				this.dataTemp = this.markers[e.markerId].dataset
				this.title = this.markers[e.markerId].dataset.name
			},
			navigaToInfo(){
				uni.navigateTo({
					url:'/pages/project/info/info?projectId=' + this.dataTemp.id
				})
			},
			toAddress(){
				uni.openLocation({
					latitude: Number(this.dataTemp.latitude),  //目标纬度
					longitude: Number(this.dataTemp.longitude),  //目标经度
					name: this.dataTemp.address, //名称
					address: this.dataTemp.address, //地址
					scale: 28
				  });
			}
			
		}
	}
</script>

<style lang="scss" scoped>
@import url("map.scss");
</style>

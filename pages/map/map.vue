<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map class="map" 
					id="map" 
					:latitude="latitude" 
					:longitude="longitude" 
					:scale="scale" 
					:markers="covers"
					subkey="EIZBZ-NQRWN-N2IFP-SLVKB-NAF65-SIBM4"
					:show-location="true"
					>
					<!-- <view slot="callout">
						<view class="label" v-for="(item,index) in covers" :key="index">
							<view style="box-shadow: 0px 0px 6px 2px #ffffff;"  :marker-id="item.id" >{{ item.title }}</view>
						</view>
					</view> -->
				</map>
			</view>
		</view>
	</view>
</template>

<script>
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
				marikerTemp:{
					id: 1,
					latitude: 30.575187166742604,
					longitude: 114.49870105601321,
					iconPath: '/static/maker_red.png',
					width:30,
					height:30,
					joinCluster:true,
					callout:{
						content:'test',
						anchorY:43,
						display:'ALWAYS',
						textAlign:'center',
						bgColor:'transparent',
						fontSize:14,
					}
				},
				
			}
		},
		onLoad: function() {
			this.getProjectFromStorage()
		},
		onReady() {
			this._mapContext = uni.createMapContext("map", this);
			// 仅调用初始化才会触发on
			this._mapContext.initMarkerCluster({
				enableDefaultStyle: false,
				zoomOnClick: true,
				gridSize: 20,
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
		methods: {
			// 添加标记点位
			addMarkers() {
				const positions = [
				  {
					latitude: 30.575187166742604,
					longitude: 114.49870105601321,
				  }, {
					latitude: 30.565187166742604,
					longitude: 114.46870105601321,
				  }, {
					latitude: 30.555187166742604,
					longitude: 114.45870105601321,
				  }, {
					latitude: 30.545187166742604,
					longitude: 114.44870105601321,
				  }
				]
		
				const markers = []
		
				positions.forEach((p, i) => {
				  console.log(i)  
				  markers.push(
					Object.assign({},{
					  id: i + 1,  
					  iconPath: '/static/maker_red.png',
					  width:30,
					  height:30,
					  joinCluster:true,
					  callout:{
					  	content:'test'+ i,
					  	anchorY:43,
					  	display:'ALWAYS',
					  	textAlign:'center',
					  	bgColor:'transparent',
						fontSize:14,
					  }
					},p)
				  )
				})
				this._mapContext.addMarkers({
					markers,
					clear: false,
					complete(res) {
					  console.log('addMarkers', res)
					}
				})
			  },
			getProjectFromStorage(){
				uni.getStorage({
					key:'project_key',
					success: function(res){
						this.projectTable = res.data
						console.log("project get success!")
						console.log(this.projectTable[0].longitude)
						console.log(this.projectTable[0].latitude)
					}
				})
			},
			setMarkersData(){
				const postionsTemp = [];
				for(var i= 0; i < this.projectTable.length;i++){
					this.marikerTemp.id = i
					this.marikerTemp.latitude = this.projectTable[i].latitude
					this.marikerTemp.longitude = this.projectTable[i].longitude
					this.marikerTemp.callout.content = this.projectTable[i].name
				}
			},
		}
	}
</script>

<style>
map {
	width: 100%;
	height: 1400rpx;
}
</style>

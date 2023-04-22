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
					@markertap=""
					>
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
				markerTemp:{
					id: 1,
					latitude: 30.575187166742604,
					longitude: 114.49870105601321,
					iconPath: '/static/maker_red.png',
					width:30,
					height:30,
					joinCluster:true,
					callout:{
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
				
				
			}
		},
		onLoad: function() {
			
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
				this.getProjectFromStorage()
				const markers = [];
				for(var i = 0; i < this.projectTable.length;i++){
					this.markerTemp.id = i
					this.markerTemp.latitude = this.projectTable[i].latitude
					this.markerTemp.longitude = this.projectTable[i].longitude
					this.markerTemp.label = {
					  content: this.projectTable[i].name.toString(),
					  anchorY: 45,
					  display: 'ALWAYS',
					  textAlign: 'center',
					  bgColor: 'transparent',
					  fontSize: 14,
					};
					let newMarker = Object.assign({},this.markerTemp)
					markers.push(newMarker)
				}
				
				
				this._mapContext.addMarkers({
					markers,
					clear: false,
					complete(res) {
					  console.log('addMarkers', res)
					}
				})
			  },
			getProjectFromStorage(){
				try {
					this.projectTable = uni.getStorageSync('project_key');
					if (this.projectTable) {
						console.log("project get success!")
					}
				} catch (e) {
					// error
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

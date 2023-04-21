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
import { projectsAll } from '../../api/api.js'
const img = '/static/maker_red.png';
	export default {
		data() {
			return {
				
				mapCtx:null,
				projectTable: [],//存放项目数据
				id:0, // 使用 marker点击事件 需要填写id
				latitude: 30.475187166742604,  // 纬度
				longitude: 114.39870105601321, // 经度
				scale:10,//缩放等级
				sumData:100, //多少条数据
				covers: [{
					id: 1,
					latitude: 30.575187166742604,
					longitude: 114.49870105601321,
					iconPath: '/static/maker_red.png',
					width:30,
					height:30,
					joinCluster:true,
					title:'这是title1',
					callout:{
						content:'test1',
						anchorY:37,
						display:'ALWAYS',
						textAlign:'center',
						bgColor:'transparent',
					}
				}, {
					id: 2,
					latitude: 30.675187166742604,
					longitude: 114.59870105601321,
					iconPath: '/static/maker_red.png',
					width:30,
					height:30,
					joinCluster:true,
					title:'这是title1',
					callout:{
						content:'test2',
						anchorY:37,
						display:'ALWAYS',
						textAlign:'center',
						bgColor:'transparent',
					}
				}]
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
				gridSize: 11,
				complete(res) {
				  console.log('initMarkerCluster', res)
				}
			});
			
			this._mapContext.on("markerClusterCreate", (e) => {
				console.log("markerClusterCreate", e);
			});
			
			this.addMarkers();
		},
		methods: {
			
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
					  title:'这是title',
					  callout:{
					  	content:'test'+ i,
					  	anchorY:37,
					  	display:'ALWAYS',
					  	textAlign:'center',
					  	bgColor:'transparent',
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
			
			async getProjects(){
				uni.showLoading({
					title: '加载中'
				})
				var tranData = {
					page:1,
					size:this.sumData
				}
				projectsAll(tranData).then(res=>{
					// console.log(res)
					this.sumData = res.data.data.count
					console.log(res.data.data.data)
					this.getallProjects()
				})
			},
			getallProjects(){
				var tranData = {
					page:1,
					size:this.sumData
				}
				projectsAll(tranData).then(result=>{
					console.log(result.data.data.data)
					this.projectTable = result.data.data.data
					uni.hideLoading();
				})
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

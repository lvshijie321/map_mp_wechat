// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
	key: '4YDBZ-AXOE5-IRYIS-QGC4R-4GAHZ-R3BMS' // 必填
});

Page({
	data: {
		interviewers: [{
			id: 1,
			name: 'T.I.T 创意园1',
			width: 30,
			longitude: 121.54419,
			latitude: 31.22114,
			height: 30,
			iconPath: '/image/touxiang_moren@2x.png'
		}, {
			id: 2,
			name: 'T.I.T 创意园2',
			width: 30,
			height: 30,
			longitude: 121.54532,
			latitude: 31.22238,
			iconPath: '/image/touxiang_moren@2x.png'
		}, {
			id: 3,
			name: 'T.I.T 创意园3',
			width: 30,
			longitude: 121.54619,
			latitude: 31.22114,
			height: 30,
			iconPath: '/image/touxiang_moren@2x.png'
		}],
		markers: [],

	},
	onReady: function (e) {
		this.mapCtx = wx.createMapContext('myMap')

	},
	onLoad() {
		this.getLocation()
		this.setData({
			markers: this.data.interviewers
		})

		


	},
	getLocation() {
		wx.getLocation({
			type: 'wgs84',
			success: (res) => {
				 this.setData({
					latitude: res.latitude,
					longitude: res.longitude,
				 })
			}
		})
	},
	getCenterLocation: function () {
		this.mapCtx.getCenterLocation({
			success: function ({ latitude, longitude }) {
				console.log(res)

			}
		})
	},
	moveToLocation: function () {
		this.mapCtx.moveToLocation()
	},
	translateMarker: function () {
		this.mapCtx.translateMarker({
			markerId: 1,
			autoRotate: true,
			duration: 1000,
			destination: {
				latitude: 23.10229,
				longitude: 113.3345211,
			},
			animationEnd() {
				console.log('animation end')
			}
		})
	},
	onTap() {
		wx.showToast({
			title: '正在呼叫',
			icon: 'none'
		})
	},
	bindregionchange(e) {
		e.type === 'end' &&
			this.mapCtx.getCenterLocation({
				success: ({ latitude, longitude }) => {
					// 调用接口
					qqmapsdk.search({
						keyword: '公交站',  //搜索关键词
						location: `${latitude},${longitude}`,  //设置周边搜索中心点
						success: (res) => { //搜索成功后的回调
							const locations = res.data.map(item => ({
								id: item.id,
								// name: item.title,
								width: 30,
								height: 30,
								latitude: item.location.lat,
								longitude: item.location.lng,
								iconPath: '/image/but_wxjy@2x.png',
								label: {
									content:item.title,
									color: '#fec46d',
									fontSize: 10,
								},
							}))
							this.setData({
								markers: this.data.interviewers.concat(locations)
							})
						},
					});
				}
			})
	},
	includePoints: function () {
		this.mapCtx.includePoints({
			padding: [10],
			points: [{
				latitude: 23.10229,
				longitude: 113.3345211,
			}, {
				latitude: 23.00229,
				longitude: 113.3345211,
			}]
		})
	}
})

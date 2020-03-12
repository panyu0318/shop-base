<template>
  <baidu-map
    ref="myMap"
    @mousemove="syncPolyline"
    @click="paintPolyline"
    @rightclick="newPolyline"
    @moving="syncCenterAndZoom"
    @ready="ready"
    scroll-wheel-zoom style="height: 100%;" :center="location" :zoom="zoom" ak="a7QUVIOIcMqzQM62liWWTjAiWGb6An0I">
    <!--比例尺-->
    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    <!--缩放控件-->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <!--定位控件-->
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <!--城市列表-->
    <!--    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>-->
    <bm-control>
      <el-button type="primary" @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</el-button>
      <el-button type="primary" @click="clear">清空绘制</el-button>
    </bm-control>
    <bm-polyline :path="path" v-for="(path,index) of polyline.paths" :key="index"></bm-polyline>
  </baidu-map>
</template>

<script>
import {
  BaiduMap,
  BmControl,
  BmPolyline,
  BmScale,
  BmNavigation,
  BmGeolocation,
  BmCityList,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmlMarkerClusterer
} from 'vue-baidu-map'

export default {
  name: 'index',
  components: {
    BaiduMap,
    BmControl,
    BmPolyline,
    BmScale,
    BmNavigation,
    BmGeolocation,
    BmCityList,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmlMarkerClusterer
  },
  data () {
    return {
      polyline: {
        editing: false,
        paths: []
      },
      centerPoint: null,
      location: '北京',
      zoom: 15,
      BMap: null,
      map: null
    }
  },
  methods: {
    ready ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.getLocation()
    },
    getLocation () {
      let that = this
      // 浏览器定位
      var geolocation = new this.BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        that.location = r.point
        if (that.location) {
          that.map.panTo(that.location)
          that.drawPoint(that.location)
        }
      })
    },
    drawPoint (point) {
      this.map.addOverlay(new this.BMap.Marker(new this.BMap.Point(point.lng, point.lat)))
    },
    toggle (name) {
      this[name].editing = !this[name].editing
    },
    clear () {
      this.polyline.paths = []
    },
    syncPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const { paths } = this.polyline
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    newPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const { paths } = this.polyline
      if (!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    paintPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const { paths } = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    },
    syncCenterAndZoom (e) {
      this.centerPoint = e.target.getCenter()
      this.zoom = e.target.getZoom()
    }
  }
}
</script>

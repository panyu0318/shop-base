<template>
  <div ref="echarts"
       style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from 'echarts'
import store2 from 'store2'

const THEME_DARK = require('../../assets/theme/echarts-dark')
const THEME_LIGHT = require('../../assets/theme/echarts-light')

export default {
  name: 'echarts',
  props: {
    echartsOption: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      myEcharts: null
    }
  },
  mounted () {
    let that = this
    this.init()
    // 屏幕缩放的时候，重绘echart
    window.addEventListener('resize', () => {
      if (that.myEcharts) {
        that.myEcharts.resize()
      }
    })
  },
  created () {
    this.$listen('theme-change', this.updateChart, this)
  },
  methods: {
    init () {
      if (!this.echartsOption.series) {
        return
      }
      let currentOption = null
      switch (this.type) {
        case 'bar':
          currentOption = this.getBarOption()
          break
        case 'radar':
          currentOption = this.getRadarOption()
          break
        case 'line':
          currentOption = this.getLineOption()
          break
      }
      let currentTheme = store2('theme')
      switch (currentTheme) {
        case 'dark':
          this.myEcharts = echarts.init(this.$refs.echarts, THEME_DARK)
          break
        case 'light':
          this.myEcharts = echarts.init(this.$refs.echarts, THEME_LIGHT)
          break
        default:
          this.myEcharts = echarts.init(this.$refs.echarts)
      }
      this.myEcharts.setOption(currentOption)
    },
    getRadarOption () {
      this.echartsOption.series.forEach(item => {
        item.type = 'radar'
        item.data.forEach(child => {
          child.areaStyle = {
            opacity: 0.5
          }
        })
      })
      return {
        title: {
          text: this.echartsOption.title.text
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          radius: '50%',
          indicator: this.echartsOption.radar.indicator
        },
        series: this.echartsOption.series
      }
    },
    getBarOption () {
      this.echartsOption.series.forEach(item => {
        item.type = 'bar'
      })
      return {
        grid: {
          top: '32px',
          right: '0',
          bottom: '0',
          left: '0',
          containLabel: true
        },
        title: {
          text: this.echartsOption.title.text
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.echartsOption.xAxis[0].data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.echartsOption.series
      }
    },
    getLineOption () {
      this.echartsOption.series.forEach(item => {
        item.type = 'line'
      })
      return {
        grid: {
          top: '32px',
          right: '0',
          bottom: '0',
          left: '0',
          containLabel: true
        },
        title: {
          text: this.echartsOption.title.text
        },
        legend: {
          right: '0%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.echartsOption.xAxis[0].data
          }
        ],
        yAxis: [{
          type: 'value',
          splitArea: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: this.echartsOption.series
      }
    },
    destroyChart () {
      if (!this.myEcharts) {
        return
      }
      this.myEcharts.dispose()
      this.myEcharts = null
    },
    updateChart () {
      this.destroyChart()
      this.init()
    }
  }
}
</script>

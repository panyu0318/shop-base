<template>
  <div class="shop-network" style="height: 100%;width:100%;">
    <div id="network" style="height: 100%;width:100%;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

const serverImg = require('../../assets/img/server.png')
const clientImg = require('../../assets/img/pc.png')
export default {
  name: 'network',
  data () {
    return {
      mychart: null,
      totalHeight: 0,
      totalWidth: 0,
      serverWidth: 150,
      serverHeight: 75,
      clientWidth: 100,
      clientHeight: 50,
      centerNode: null,
      nodes: [],
      links: [],
      topData: [],
      topNodes: [],
      bottomData: [],
      bottomNodes: []
    }
  },
  mounted () {
    this.mychart = echarts.init(document.getElementById('network'))
    this.setDefaultData()
    this.setNodes()
    this.setLinks()
    this.setOption()
  },
  methods: {
    setLinks () {
      this.nodes.forEach(item => {
        if (item.value === 'centerNode') {
          return
        }
        this.links.push({
          source: item.name,
          target: '服务器'
        })
      })
    },
    setDefaultData () {
      for (let i = 0; i < 10; i++) {
        this.topData.push(1)
      }
      for (let i = 0; i < 10; i++) {
        this.bottomData.push(1)
      }
    },
    setNodes () {
      this.setCenterNode()
      this.orangizeNodes(this.topNodes, 'U')
      this.orangizeNodes(this.bottomNodes, 'D')
      this.nodes.push(
        ...[this.centerNode],
        ...this.topNodes,
        ...this.bottomNodes
      )
    },
    setOption () {
      this.mychart.setOption({
        series: [
          {
            type: 'graph', // 关系图
            // symbolSize: 50, // 关系图节点标记的大小
            roam: false, // 是否开启鼠标缩放和平移漫游
            focusNodeAdjacency: false, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            // edgeSymbol: ['circle', 'circle'], // 边两端的标记类型
            // edgeSymbolSize: [1, 1], // 边两端的标记大小
            symbol: 'rect',
            symbolKeepAspect: true,
            edgeLabel: {
              // 是否显示标签
              normal: {
                show: false
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            // 节点信息
            data: this.nodes,
            links: this.links,
            lineStyle: {
              // 关系边的公用线条样式
              normal: {
                opacity: 0.5, // 尾迹线条透明度
                curveness: 0, // 尾迹线条曲直度
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'red'
                    },
                    {
                      offset: 1,
                      color: 'blue'
                    }
                  ],
                  globalCoord: false
                }
              },
              emphasis: {
                color: 'red',
                width: 3,
                type: 'dashed'
              }
            },
            tooltip: {
              position: 'bottom',
              backgroundColor: 'green',
              textStyle: {
                fontSize: 18
              }
            }
          }
        ]
      })
    },
    setCenterNode () {
      this.totalWidth = document.getElementById('network').clientWidth // 窗口宽度
      this.totalHeight = document.getElementById('network').clientHeight // 窗口高度
      this.centerNode = {
        name: '服务器',
        value: 'centerNode',
        symbol: `image://${serverImg}`,
        symbolSize: [this.serverWidth, this.serverHeight],
        x: (this.totalWidth - this.serverWidth) / 2,
        y: (this.totalHeight - this.serverHeight) / 2
      }
    },
    // 整理上下级数据
    orangizeNodes (nodes, postion) {
      // 客户端之间的间距
      let CCOffset = 500
      let CSOffset = 800
      let start = 0
      let end = this.topData.length - 1
      if (postion !== 'U') {
        end = this.bottomData.length - 1
        CSOffset *= -1
      }
      let middle = end / 2
      while (start <= middle) {
        nodes.push({
          name: postion + '客户端' + start,
          value: postion + 'Node' + start,
          symbol: `image://${clientImg}`,
          symbolSize: [
            this.clientWidth,
            this.clientHeight
          ],
          x: (this.totalWidth - this.serverWidth) / 2 + (start - middle) * CCOffset,
          y: (this.totalHeight - this.serverHeight) / 2 - CSOffset
        })
        if (start !== end) {
          nodes.push({
            name: postion + '客户端' + end,
            value: postion + 'Node' + end,
            symbol: `image://${clientImg}`,
            symbolSize: [
              this.clientWidth,
              this.clientHeight
            ],
            x: (this.totalWidth - this.serverWidth) / 2 + (end - middle) * CCOffset,
            y: (this.totalHeight - this.serverHeight) / 2 - CSOffset
          })
        }
        start++
        end--
      }
    }
  }
}
</script>

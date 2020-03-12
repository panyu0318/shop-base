<template>
  <div id="network" style="height: 100%;width:100%;"></div>
</template>

<script>
import vis from 'vis'

const serverImg = require('../../../assets/img/server.png')
const clientImg = require('../../../assets/img/pc.png')
export default {
  name: 'vis3',
  data () {
    return {
      network: null,
      totalHeight: 0,
      totalWidth: 0,
      serverX: 0,
      serverY: 0,
      CCOffset: 100,
      CSOffset: 200,
      NTOffset: 50,
      nodes: [],
      edges: [],
      topData: [],
      topNodes: [],
      bottomData: [],
      bottomNodes: []
    }
  },
  mounted () {
    this.totalWidth = document.getElementById('network').clientWidth // 窗口宽度
    this.totalHeight = document.getElementById('network').clientHeight // 窗口高度
    this.serverX = 0
    this.serverY = this.totalHeight / 2
    this.initNetwork()
  },
  methods: {
    initNetwork () {
      this.setDefaultData()
      this.dataToNode(this.topNodes, 'U')
      this.dataToNode(this.bottomNodes, 'D')
      this.createNodes()
      // this.createEdges()
      let datas = {
        nodes: new vis.DataSet(this.nodes),
        edges: new vis.DataSet(this.edges)
      }
      let options = {
        height: '100%',
        width: '100%',
        autoResize: true,
        nodes: {
          fixed: true,
          scaling: {
            label: {
              min: 8,
              max: 20
            }
          }
        },
        edges: {
          hoverWidth: 2,
          width: 1,
          color: {
            color: 'black'
          }
        },
        groups: {
          client: {
            shape: 'image',
            image: clientImg,
            size: 30,
            font: {
              color: 'green',
              align: 'center'
            }
          },
          server: {
            shape: 'image',
            image: serverImg,
            size: 50,
            font: {
              color: 'red',
              align: 'center'
            }
          },
          line: {
            font: {
              size: 16,
              weight: 400,
              color: 'rgba(255, 255, 255, 0.8)'
            },
            color: {
              border: 'rgba(0,0,0,0)',
              background: 'rgba(0,0,0,0)',
              highlight: {
                background: 'rgba(0,0,0,0)',
                border: '#0064B6'
              },
              hover: {
                background: 'rgba(0,0,0,0)',
                border: '#0064B6'
              }
            }
          },
          imgOnlieTop: {
            shape: 'image',
            image: clientImg,
            size: 30,
            font: {
              weight: 400,
              color: 'rgba(255,255,255,0.8)',
              size: 16, // px
              align: 'center'
            }
          },
          imgOutlieTop: {
            size: 60,
            shape: 'image',
            image: './submodule/ioms-frontend/assets/images/overview/view-class/img1.png',
            font: {
              weight: 400,
              color: '#7E8790',
              size: 16, // px
              align: 'center'
            }
          },
          imgOnlieBottom: {
            size: 60,
            shape: 'image',
            image: './submodule/ioms-frontend/assets/images/overview/view-class/img3-blue.png',
            font: {
              weight: 400,
              color: 'rgba(255,255,255,0.8)',
              size: 16, // px
              align: 'center'
            }
          },
          imgOutlieBottom: {
            size: 30,
            shape: 'image',
            image: clientImg,
            font: {
              weight: 400,
              color: '#7E8790',
              size: 16, // px
              align: 'center'
            }
          },
          text: {
            shape: 'box',
            font: {
              size: 16,
              color: 'rgba(0,100,182,1)'
            }
          },
          boxOutlie: {
            shape: 'box',
            font: {
              size: 16,
              weight: 400,
              color: '#7E8790'
            },
            color: {
              border: 'rgba(0,0,0,0)',
              background: 'rgba(0,0,0,0)',
              highlight: {
                background: 'rgba(0,0,0,0)',
                border: '#7E8790'
              },
              hover: {
                background: 'rgba(0,0,0,0)',
                border: '#7E8790'
              }
            }
          },
          center: {
            shape: 'image',
            image: serverImg,
            size: 80,
            font: {
              weight: 400,
              color: 'rgba(255,255,255,0.8)',
              size: 16, // px
              align: 'center'
            }
          },
          point: {
            shape: 'dot',
            color: 'transparent'
          },
          data1: {
            shape: 'box',
            font: {
              size: 14,
              weight: 400,
              color: 'rgba(255, 255, 255, 1)'
            },
            color: {
              border: 'rgba(0,0,0,0)',
              background: 'rgba(24, 144, 255, 0.8)'
            },
            borderRadius: 0
          },
          data2: {
            shape: 'box',
            font: {
              size: 14,
              weight: 400,
              color: 'rgba(255, 255, 255, 1)'
            },
            color: {
              border: 'rgba(0,0,0,0)',
              background: 'rgba(36, 209, 229, 0.8)'
            }
          },
          data3: {
            shape: 'box',
            font: {
              size: 14,
              weight: 400,
              color: 'rgba(255, 255, 255, 1)'
            },
            color: {
              border: 'rgba(0,0,0,0)',
              background: 'rgba(187, 187, 187, 0.6)'
            }
          }
        }
      }
      this.network = new vis.Network(document.getElementById('network'), datas, options)
    },
    createNodes () {
      let { CSOffset, NTOffset } = this
      let centerNode = {
        id: 'server',
        x: this.serverX,
        y: this.serverY,
        group: 'server'
      }
      this.nodes.push({
        id: 'serverText',
        label: '服务器',
        x: this.serverX,
        y: this.serverY + NTOffset * 1.5,
        group: 'text'
      })
      this.nodes.push({
        id: 'topCenterPoint',
        x: this.serverX,
        y: this.serverY - CSOffset * 0.8,
        group: 'point'
      })
      this.nodes.push({
        id: 'bottomCenterPoint',
        x: this.serverX,
        y: this.serverY + CSOffset * 0.8,
        group: 'point'
      })
      this.edges.push({
        from: 'topCenterPoint',
        to: 'server'
      })
      this.edges.push({
        from: 'bottomCenterPoint',
        to: 'serverText'
      })
      this.nodes.push(...[centerNode], ...this.topNodes, ...this.bottomNodes)
    },
    createEdges () {
      [...this.topNodes, ...this.bottomNodes].forEach(item => {
        if (item.group !== 'text') {
          return
        }
        this.edges.push({
          from: item.id,
          to: 'server',
          arrows: 'to',
          scaling: {
            label: true
          },
          shadow: true,
          smooth: true
        })
      })
    },
    dataToNode (nodes, position) {
      let { CCOffset, CSOffset, NTOffset } = this
      let start = 0
      let end = 0
      if (position === 'U') {
        end = this.topData.length - 1
      } else {
        end = this.bottomData.length - 1
        CSOffset *= -1
        NTOffset *= -1
      }
      this.edges.push({
        from: position + 'Point' + start,
        to: position + 'Point' + end
      })
      let middle = end / 2
      while (start <= middle) {
        nodes.push({
          id: position + 'Node' + start,
          x: (start - middle) * CCOffset,
          y: this.serverY - CSOffset * 1.5,
          group: 'client'
        })
        nodes.push({
          id: position + 'Text' + start,
          label: position + 'Text' + start,
          x: (start - middle) * CCOffset,
          y: this.serverY - CSOffset * 1.5 + NTOffset,
          group: 'text'
        })
        nodes.push({
          id: position + 'Point' + start,
          x: (start - middle) * CCOffset,
          y: this.serverY - CSOffset * 0.8,
          group: 'point'
        })
        this.edges.push({
          from: position + 'Text' + start,
          to: position + 'Point' + start
        })
        if (start !== end) {
          nodes.push({
            id: position + 'Node' + end,
            x: (end - middle) * CCOffset,
            y: this.serverY - CSOffset * 1.5,
            group: 'client'
          })
          nodes.push({
            id: position + 'Text' + end,
            label: position + 'Text' + end,
            x: (end - middle) * CCOffset,
            y: this.serverY - CSOffset * 1.5 + NTOffset,
            group: 'text'
          })
          nodes.push({
            id: position + 'Point' + end,
            x: (end - middle) * CCOffset,
            y: this.serverY - CSOffset * 0.8,
            group: 'point'
          })
          this.edges.push({
            from: position + 'Text' + end,
            to: position + 'Point' + end
          })
        }
        start++
        end--
      }
    },
    setDefaultData () {
      for (let i = 0; i < 10; i++) {
        this.topData.push(i)
      }
      for (let i = 0; i < 5; i++) {
        this.bottomData.push(i)
      }
    }
  }
}
</script>

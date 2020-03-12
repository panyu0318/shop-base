<template>
  <div id="network" style="height: 100%;width:100%;"></div>
</template>

<script>
import vis from 'vis'

const serverImg = require('../../../assets/img/server.png')
const clientImg = require('../../../assets/img/pc.png')
export default {
  name: 'vis1',
  data () {
    return {
      network: null,
      totalHeight: 0,
      totalWidth: 0,
      serverX: 150,
      serverY: 75,
      nodes: [
        /* {
          id: 1,
          shape: 'image',
          image: serverImg,
          label: 'useImageSize',
          shapeProperties: { useImageSize: true }
        },
        { id: 2, shape: 'image', image: clientImg },
        {
          id: 3,
          shape: 'image',
          image: serverImg,
          label: 'imagePadding{2,10,8,20}+size',
          imagePadding: { left: 2, top: 10, right: 8, bottom: 20 },
          size: 40,
          color: {
            border: 'green',
            background: 'yellow',
            highlight: { border: 'yellow', background: 'green' },
            hover: { border: 'orange', background: 'grey' }
          }
        },
        {
          id: 4,
          shape: 'image',
          image: serverImg,
          label: 'pictures by this guy!'
        },
        { id: 5, shape: 'image', image: serverImg },
        { id: 6, shape: 'image', image: serverImg },
        { id: 7, shape: 'image', image: serverImg },
        { id: 8, shape: 'image', image: serverImg },
        {
          id: 9,
          shape: 'image',
          image: serverImg,
          label: 'useImageSize + imagePadding:15',
          shapeProperties: { useImageSize: true },
          imagePadding: 30,
          color: {
            border: 'blue',
            background: 'orange',
            highlight: { border: 'orange', background: 'blue' },
            hover: { border: 'orange', background: 'grey' }
          }
        },
        { id: 10, shape: 'image', image: serverImg },
        { id: 11, shape: 'image', image: serverImg },
        { id: 12, shape: 'image', image: serverImg },
        { id: 13, shape: 'image', image: serverImg },
        { id: 14, shape: 'image', image: serverImg },
        {
          id: 15,
          shape: 'image',
          image: serverImg,
          brokenImage: serverImg,
          label: 'when images\nfail\nto load'
        },
        {
          id: 16,
          shape: 'image',
          image: serverImg,
          brokenImage: serverImg,
          label: 'fallback image in action'
        } */
      ],
      edges: [
        /* { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 4, to: 5 },
        { from: 4, to: 10 },
        { from: 4, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8 },
        { from: 8, to: 9 },
        { from: 8, to: 10 },
        { from: 10, to: 11 },
        { from: 11, to: 12 },
        { from: 12, to: 13 },
        { from: 13, to: 14 },
        { from: 9, to: 16 } */
      ],
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
      this.createEdges()
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
          width: 1
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
          boxOnlie: {
            shape: 'box',
            font: {
              size: 16,
              weight: 400,
              color: 'rgba(0,100,182,1)'
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
          centerSide: {
            shape: 'box',
            color: {
              background: 'rgba(29,143,159,1)',
              highlight: {
                background: 'rgba(32,172,190,1)'
              },
              hover: {
                background: 'rgba(32,172,190,1)'
              }
            },
            font: {
              weight: 500,
              color: 'rgba(255,255,255,1)',
              size: 28
            }
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
      let centerNode = {
        id: 'server',
        label: '服务器',
        x: this.serverX,
        y: this.serverY,
        group: 'server'
      }
      this.nodes.push(...[centerNode], ...this.topNodes, ...this.bottomNodes)
    },
    createEdges () {
      [...this.topNodes, ...this.bottomNodes].forEach(item => {
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
      let CCOffset = 100
      let CSOffset = 200
      let start = 0
      let end = 0
      if (position === 'U') {
        end = this.topData.length - 1
      } else {
        end = this.bottomData.length - 1
        CSOffset *= -1
      }
      let middle = end / 2
      while (start <= middle) {
        nodes.push({
          id: position + 'Node' + start,
          label: position + 'Node' + start,
          x: (start - middle) * CCOffset,
          y: this.serverY - CSOffset,
          group: 'client'
        })
        if (start !== end) {
          nodes.push({
            id: position + 'Node' + end,
            label: position + 'Node' + end,
            x: (end - middle) * CCOffset,
            y: this.serverY - CSOffset,
            group: 'client'
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

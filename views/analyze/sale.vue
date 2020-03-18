<template>
  <div class="shop-sale" style="height: 100%;">
    <py-bread></py-bread>
    <el-form class="form-item-flex shop-search">
      <el-form-item label="统计日期" style="width:50%">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="统计类型" style="width:25%">
        <el-select v-model="type">
          <el-option v-for="(item,index) in typeOptions" :label="item.label" :value="item.value"
                     :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width:25%;text-align: right">
        <el-button @click="init">重置</el-button>
        <el-button @click="search" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="shop-sale-middle">
      <div>
        <py-echarts :echartsOption="leftOption" type="bar"></py-echarts>
      </div>
      <div style="margin-left: 10px;">
        <py-echarts :echartsOption="rightOption" type="radar"></py-echarts>
      </div>
    </div>
    <div class="shop-sale-bottom">
      <py-echarts :echartsOption="bottomOption" type="line"></py-echarts>
    </div>
  </div>
</template>
<script>
import pickerOptions from '../../mixins/pickerOptions/pickerOptions'
import dateUtils from '../../utils/dateUtils'

export default {
  name: 'sale',
  mixins: [pickerOptions],
  data () {
    return {
      date: null,
      type: null,
      leftOption: this.getLeftOption(),
      rightOption: this.getRightOption(),
      bottomOption: this.getBottomOption(),
      typeOptions: this.getDefaultTypeOptions()
    }
  },
  created () {
    this.init()
  },
  methods: {
    search () {

    },
    init () {
      this.setDefaultParam()
      this.search()
    },
    getLeftOption () {
      let scoreArray = []
      let growthArray = []
      let growthNegativeArray = []
      let departmentArray = []
      for (let i = 0; i < 5; i++) {
        scoreArray.push(i)
        growthArray.push(i)
        growthNegativeArray.push(i)
        departmentArray.push(i)
      }
      return {
        title: {
          text: '商品销售总量TOP5'
        },
        xAxis: [
          {
            data: departmentArray
          }
        ],
        series: [
          {
            name: '分数',
            barWidth: '20%',
            data: scoreArray
          },
          {
            name: '环比增长',
            barWidth: '10%',
            stack: '环比', // 堆叠
            data: growthArray
          },
          {
            name: '环比下降',
            barWidth: '10%',
            stack: '环比',
            data: growthNegativeArray
          }
        ]
      }
    },
    getRightOption () {
      let indicator = []
      let currentDataValue = []
      for (let i = 0; i < 5; i++) {
        indicator.push({
          name: 'category' + (i + 1)
        })
        currentDataValue.push(i + 1)
      }
      return {
        title: {
          text: '商品销售总额TOP5'
        },
        radar: {
          indicator: indicator
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: currentDataValue,
              name: '本月'
            }
          ]
        }]
      }
    },
    getBottomOption () {
      let timeArray = []
      let series = []
      for (let i = 1; i <= 3; i++) {
        series.push({
          name: 'category' + i,
          data: []
        })
      }
      for (let i = 0; i < 5; i++) {
        timeArray.push('time' + (i + 1))
        series[0].data.push(i)
        series[1].data.push(i * 2)
        series[2].data.push(i * 3)
      }
      return {
        title: {
          text: '近一年月销售总量'
        },
        xAxis: [{
          data: timeArray
        }],
        series: series
      }
    },
    setDefaultParam () {
      this.date = dateUtils.getToday()
    },
    getDefaultTypeOptions () {
      return [{
        label: '按单一商品销售总量统计',
        value: 'single_amount'
      }, {
        label: '按单一商品销售总额统计',
        value: 'single_money'
      }, {
        label: '按商品类别销售总量统计',
        value: 'category_amount'
      }, {
        label: '按商品类别销售总额统计',
        value: 'category_money'
      }]
    }
  }
}
</script>

import moment from 'moment'

let dataUtils = {}

// 获得本周的开始日期
dataUtils.getWeekStartDate = function () {
  let date = moment()
  if (date.format('d') !== '0') {
    return date.startOf('week').add(1, 'day').format('YYYY-MM-DD')
  } else {
    return date.startOf('week').add(-6, 'day').format('YYYY-MM-DD')
  }
}

// 获得本周的结束日期
dataUtils.getWeekEndDate = function () {
  let date = moment()
  if (date.format('d') !== '0') {
    return date.endOf('week').add(1, 'day').format('YYYY-MM-DD')
  } else {
    return date.endOf('week').add(-6, 'day').format('YYYY-MM-DD')
  }
}

// 获得本月的开始日期
dataUtils.getMonthStartDate = function () {
  return moment().startOf('month').format('YYYY-MM-DD')
}

// 获得本月的结束日期
dataUtils.getMonthEndDate = function () {
  return moment().endOf('month').format('YYYY-MM-DD')
}

// 获得本季度的开始日期
dataUtils.getQuarterStartDate = function () {
  return moment().startOf('quarter').format('YYYY-MM-DD')
}

// 获得本季度的结束日期
dataUtils.getQuarterEndDate = function () {
  return moment().endOf('quarter').format('YYYY-MM-DD')
}

// 获得本年度的开始日期
dataUtils.getYearStartDate = function () {
  return moment().startOf('year').format('YYYY-MM-DD')
}

// 获得本年度的结束日期
dataUtils.getYearEndDate = function () {
  return moment().endOf('year').format('YYYY-MM-DD')
}

// 获得今天的日期
dataUtils.getToday = function () {
  return moment().format('YYYY-MM-DD')
}

// 获得昨天日期
dataUtils.getYesterday = function () {
  return moment().add(-1, 'day').format('YYYY-MM-DD')
}

export default dataUtils

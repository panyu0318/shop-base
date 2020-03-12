import dateUtils from '../../utils/dateUtils'

export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '本日',
            onClick (picker) {
              picker.$emit('pick', [dateUtils.getToday(), dateUtils.getToday()])
            }
          },
          {
            text: '本周',
            onClick (picker) {
              picker.$emit('pick', [dateUtils.getWeekStartDate(), dateUtils.getToday()])
            }
          }, {
            text: '本月',
            onClick (picker) {
              picker.$emit('pick', [dateUtils.getMonthStartDate(), dateUtils.getToday()])
            }
          }, {
            text: '本季度',
            onClick (picker) {
              picker.$emit('pick', [dateUtils.getQuarterStartDate(), dateUtils.getToday()])
            }
          }, {
            text: '全年',
            onClick (picker) {
              picker.$emit('pick', [dateUtils.getYearStartDate(), dateUtils.getToday()])
            }
          }
        ],
        disabledDate: (current) => {
          return current.getTime() > new Date().getTime()
        }
      }
    }
  }
}

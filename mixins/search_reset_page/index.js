export default {
  data () {
    return {
      param: this.getDefaultParam(),
      defaultProps: this.getDefaultProps(),
      treeData: [],
      tableData: [],
      total: 0,
      multipleSelection: [],
      statusOptions: this.getDefaultStatusOptions(),
      rules: this.getDefaultRules()
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
    },
    search () {
      this.param.pageNo = 1
      this.refresh()
    },
    reset () {
      this.param = this.getDefaultParam()
      this.refresh()
    },
    rowClick (row) {
      this.$refs.table.toggleRowSelection(row)
    },
    handleSizeChange (val) {
      this.param.pageSize = val
      this.param.pageNo = 1
      this.refresh()
    },
    handleCurrentChange (val) {
      this.param.pageNo = val
      this.refresh()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getDefaultParam () {
      return {
        name: null,
        status: null,
        pageNo: 1,
        pageSize: 10
      }
    },
    getDefaultProps () {
      return {
        value: 'id',
        children: 'children',
        label: 'name',
        expandTrigger: 'hover',
        checkStrictly: true,
        emitPath: false
      }
    },
    getDefaultStatusOptions () {
      // 取消全部选项（新增、修改用不到）
      return [{
        label: '正常',
        value: 1
      }, {
        label: '停用',
        value: 0
      }]
    },
    getDefaultRules () {
      return {}
    }
  },
  filters: {
    statusFormat (value) {
      switch (value) {
        case 0:
          return '停用'
        case 1:
          return '正常'
        default:
          return '--'
      }
    }
  }
}

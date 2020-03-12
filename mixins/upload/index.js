export default {
  data () {
    return {
      uploadLimit: 1,
      uploadFileList: [],
      uploadlUrl: '',
      uploadDetail: {},
      uploadVisible: false,
      uploadTitle: '上传文件',
      uploadRules: {}
    }
  },
  methods: {
    upload () {
    },
    // 将选中的文件添加到文件数组中
    uploadSectionFile (param) {
      this.uploadFileList.push(param.file)
    },
    // 判断文件大小
    beforeUpload (file) {
      let fileAccept = file.name.split('.').pop()
      // 验证文件格式
      if (fileAccept.toLowerCase() !== 'xlsx') {
        this.$message({
          message: '只可上传附件为：xlsx',
          type: 'warning'
        })
        return false
      }
      if (file.size / 1024 / 1024 > 10) {
        this.$message.warning('文件不能超过10M!')
        return false
      }
    },
    // 删除文件处理函数
    handleRemove (file, files) {
      this.uploadFileList = []
      files.forEach(item => {
        this.uploadFileList.push(item.raw)
      })
    },
    // 文件个数超出限制
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.uploadLimit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    closeUploadDialog () {
      this.uploadVisible = false
      this.uploadFileList = []
      this.$refs.uploadForm.resetFields()
      this.$refs.upload.clearFiles()
    },
    openUploadDialog () {
      this.uploadVisible = true
    }
  }
}

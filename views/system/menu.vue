<template>
  <div style="height: 100%;">
    <py-search-tree-table>
      <template slot="top">
        <el-form :model="param" class="form-item-flex">
          <el-form-item label="名称" style="width:25%">
            <el-input v-model.trim="param.name" placeholder="菜单名称" :maxlength="30" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" style="width:25%">
            <el-select v-model="param.status" placeholder="全部" clearable>
              <el-option v-for="(item,index) in statusOptions" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:50%;text-align: right">
            <el-button @click="reset">重置</el-button>
            <el-button @click="search" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="left">
        <el-tree :data="menuTree" @node-drop="handleNodeDrop" :props="defaultProps" @node-click="handleNodeClick"
                 draggable highlight-current></el-tree>
      </template>
      <template slot="right">
        <el-button-group>
          <el-button @click="openAddDialog" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button @click="openEditDialog" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button @click="setStatus(1)" type="primary" icon="el-icon-delete">启用</el-button>
          <el-button @click="setStatus(0)" type="primary" icon="el-icon-delete">停用</el-button>
          <el-button @click="download" type="primary" icon="el-icon-plus">导出</el-button>
          <el-button @click="openUploadDialog" type="primary" icon="el-icon-plus">导入</el-button>
          <el-button @click="del" type="primary" icon="el-icon-delete">删除</el-button>
        </el-button-group>
        <el-table
          height="auto"
          @selection-change="handleSelectionChange"
          @row-click="rowClick"
          ref="table"
          :highlight-current-row="true"
          :data="tableData">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="parent"
            label="上级菜单">
            <template slot-scope="scope">
              <div @click="test(scope)">{{scope.row.parent||'&#45;&#45;'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="icon"
            label="图标">
            <template slot-scope="scope"><i :class="scope.row.icon"></i></template>
          </el-table-column>
          <el-table-column
            prop="url"
            label="链接">
            <template slot-scope="scope">
              <div>{{scope.row.url}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">{{scope.row.status|statusFormat}}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="shop-page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="param.pageNo"
          :page-size="param.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </template>
    </py-search-tree-table>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      @close="closeDialog"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="detail" :rules="rules" label-width="80px" ref="form">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model.trim="detail.name" :maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <el-input v-model.trim="detail.icon" :maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单链接" prop="url">
          <el-input v-model.trim="detail.url" :maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="dialogTitle==='新增'" label="参照菜单" prop="parent">
          <el-cascader
            v-model="detail.parentId"
            :show-all-levels="false"
            :options="menuTree"
            filterable
            clearable
            :props="defaultProps">
          </el-cascader>
        </el-form-item>
        <el-form-item v-if="dialogTitle==='新增'" label="参照位置" prop="position">
          <el-select v-model="detail.position" placeholder="请选择" filterable clearable>
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
       <el-button @click="closeDialog">取消</el-button>
       <el-button @click="submit" type="primary">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :title="uploadTitle"
      @close="closeUploadDialog"
      :visible.sync="uploadVisible"
      width="30%">
      <el-form :model="uploadDetail" :rules="uploadRules" label-width="80px" ref="uploadForm">
        <el-form-item label="选择文件" prop="file">
          <el-upload
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :http-request="uploadSectionFile"
            :auto-upload="true"
            :action="uploadlUrl"
            :before-upload="beforeUpload"
            multiple
            ref="upload"
            :limit="uploadLimit">
            <el-button type="primary"><i class="icon kc-icon-upload2"></i>点击上传</el-button>
            <div slot="tip" class="kc-upload__tip">文件不能超过10M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
       <el-button @click="closeUploadDialog">取消</el-button>
       <el-button @click="upload" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../service/menu'
import searchResetPage from '../../mixins/search_reset_page'
import upload from '../../mixins/upload'
import {createNamespacedHelpers} from 'vuex'
const {mapGetters, mapActions} = createNamespacedHelpers('shopStore')

export default {
  name: 'shop_menu',
  mixins: [searchResetPage, upload],
  data () {
    return {
      dialogVisible: false,
      dialogTitle: null,
      detail: this.getDefaultMenuDetail(),
      parentId: null,
      positionOptions: this.getDefaultPositionOptions()
    }
  },
  computed: {
    ...mapGetters(['menuTree'])
  },
  methods: {
    test (scope) {
      debugger
    },
    upload () {
      api.upload({
        fileList: this.uploadFileList
      }).then(res => {
        this.$message.success('上传成功！')
        this.closeUploadDialog()
        this.refresh()
      })
    },
    download () {
      this.$download(api.downloadUrl)
    },
    del () {
      let ids = this.multipleSelection.map(item => item.id)
      if (ids.length < 1) {
        this.$message.warning('请至少选中一项！')
        return
      }
      this.$confirm('是否确认删除？', '请注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.del(ids).then(() => {
          this.$message.success('删除成功！')
          this.updateMenuTree()
          this.refresh()
        })
      })
    },
    setStatus (status) {
      let ids = this.multipleSelection.map(item => item.id)
      if (ids.length < 1) {
        this.$message.warning('请至少选中一项！')
        return
      }
      api.setStatus({
        ids: ids,
        status: status
      }).then(() => {
        this.$message.success('设置成功！')
        this.updateMenuTree()
        this.refresh()
      })
    },
    handleNodeDrop (draggingNode, dropNode, dropType, event) {
      let param = {
        draggingNodeId: draggingNode.data.id,
        dropNodeId: dropNode.data.id,
        position: dropType
      }
      api.changePosition(param).then(res => {
      }).catch(() => {
        this.updateMenuTree()
      })
    },
    submit () {
      api.save(this.detail).then(res => {
        if (this.dialogTitle === '新增') {
          this.$message.success('新增成功！')
          this.reset()
        } else {
          this.$message.success('修改成功！')
          this.refresh()
        }
        this.closeDialog()
        this.updateMenuTree()
      })
    },
    refresh () {
      api.search(this.param).then(res => {
        this.tableData = res.results
        this.total = res.total
      })
    },
    openAddDialog () {
      this.dialogVisible = true
      this.dialogTitle = '新增'
      this.detail = this.getDefaultMenuDetail()
      this.detail.parent = this.parentId
    },
    openEditDialog () {
      if (this.multipleSelection.length < 1) {
        this.$message.warning('请先选择需要编辑的菜单！')
        return
      } else if (this.multipleSelection.length > 1) {
        this.$message.warning('只能选择一个菜单！')
        return
      }
      api.detail(this.multipleSelection[0].id).then(res => {
        this.detail = res
        if (this.detail.id === 0) {
          this.detail.id = null
        }
        this.detail.position = null
        this.dialogVisible = true
        this.dialogTitle = '编辑'
      })
    },
    closeDialog () {
      this.dialogVisible = false
      this.dialogTitle = null
      this.$refs.form.resetFields()
    },
    handleNodeClick (data) {
      this.parentId = data.id
      api.detail(data.id).then(res => {
        this.tableData = [res]
        this.total = 1
      })
    },
    rowClick (row, event, column) {
      this.parentId = row.id
      this.$refs.table.toggleRowSelection(row)
    },
    getDefaultMenuDetail () {
      return {
        id: null,
        parentId: null,
        name: null,
        icon: null,
        url: null,
        position: 'last'
      }
    },
    getDefaultPositionOptions () {
      return [{
        label: '首位',
        value: 'first'
      }, {
        label: '末尾',
        value: 'last'
      }, {
        label: '前面',
        value: 'before'
      }, {
        label: '后面',
        value: 'after'
      }]
    },
    getDefaultRules () {
      return {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'change' }
        ],
        icon: [
          { required: true, message: '请输入菜单图标', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请输入菜单链接', trigger: 'change' }
        ]
      }
    },
    ...mapActions(['updateMenuTree'])
  }
}
</script>

<style scoped>

</style>

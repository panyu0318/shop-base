<template>
  <div class="shop-role">
    <py-search-tree-table>
      <template slot="top">
        <el-form :model="param" class="form-item-flex">
          <el-form-item label="角色名称" style="width:25%">
            <el-input v-model.trim="param.name" placeholder="角色名称" :maxlength="30" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色状态" style="width:25%">
            <el-select v-model="param.status" clearable placeholder="全部">
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
      <template slot="right">
        <el-button-group>
          <el-button @click="openAuthorizeDialog" type="primary" icon="el-icon-edit">授权</el-button>
          <el-button @click="openAddDialog" type="primary" icon="el-icon-edit">新增</el-button>
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
            prop="status"
            label="状态">
            <template slot-scope="{row}">{{row.status|statusFormat}}</template>
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="detail.name" :maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-select v-model="detail.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
       <el-button @click="closeDialog">取消</el-button>
       <el-button @click="save" type="primary">确定</el-button>
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
    <el-dialog
      v-if="authorizeVisible"
      class="shop-role-authorize"
      :close-on-click-modal="false"
      :title="authorizeTitle"
      @close="closeAuthorizeDialog"
      :visible.sync="authorizeVisible"
      width="30%">
      <el-radio-group v-model="authorizeType" @change="getPermissionTree">
        <el-radio-button label="1">后端资源</el-radio-button>
        <el-radio-button label="2">前端资源</el-radio-button>
      </el-radio-group>
      <el-tree
        height="500px"
        :data="treeData"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        :default-checked-keys="authorizedIds"
        :props="defaultProps">
      </el-tree>
      <span slot="footer">
       <el-button @click="closeAuthorizeDialog">取消</el-button>
       <el-button @click="saveAuthorize" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import searchResetPage from '../../mixins/search_reset_page'
import upload from '../../mixins/upload'
import api from '../../service/role'
import permissionApi from '../../service/permission'

export default {
  name: 'role',
  mixins: [searchResetPage, upload],
  data () {
    return {
      dialogVisible: false,
      dialogTitle: null,
      detail: this.getDefaultDetail(),
      authorizeTitle: '资源权限管理',
      authorizeVisible: false,
      authorizeType: 1,
      authorizedIds: []
    }
  },
  methods: {
    refresh () {
      api.search(this.param).then(res => {
        this.tableData = res.results
        this.total = res.total
      })
    },
    save () {
      this.$refs.form.validate(validate => {
        if (validate) {
          api.save(this.detail).then(res => {
            if (this.dialogTitle === '新增') {
              this.$message.success('新增成功！')
              this.reset()
            } else {
              this.$message.success('修改成功！')
              this.refresh()
            }
            this.closeDialog()
          })
        }
      })
    },
    setStatus (status) {
      let ids = this.multipleSelection.map(item => item.id)
      if (ids.length < 1) {
        this.$message.warning('请至少选中一项！')
        return
      }
      api.changeStatus({
        ids: ids,
        status: status
      }).then(() => {
        this.$message.success('设置成功！')
        this.refresh()
      })
    },
    download () {
      this.$download(api.downloadUrl)
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
    closeAuthorizeDialog () {
      this.authorizeVisible = false
    },
    saveAuthorize () {
      api.authorize({
        roleId: this.multipleSelection[0].id,
        permissionIdList: this.$refs.tree.getCheckedKeys()
      }).then(res => {
        this.$message.success('授权成功！')
        this.closeAuthorizeDialog()
      })
    },
    getPermissionTree () {
      permissionApi.getPermissionTree({
        type: this.authorizeType
      }).then(res => {
        this.treeData = res
      })
    },
    openAuthorizeDialog () {
      let ids = this.multipleSelection.map(item => item.id)
      if (ids.length < 1) {
        this.$message.warning('请至少选中一项！')
        return
      }
      if (ids.length > 1) {
        this.$message.warning('只能选中一项！')
        return
      }
      Promise.all([this.getPermissionTree(), this.getAuthorized()]).then(() => {
        this.authorizeVisible = true
      })
    },
    getAuthorized () {
      api.authorized({
        id: this.multipleSelection[0].id,
        type: this.authorizeType
      }).then(res => {
        this.authorizedIds = res
      })
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
          this.refresh()
        })
      })
    },
    openAddDialog () {
      this.dialogVisible = true
      this.dialogTitle = '新增'
      this.detail = this.getDefaultDetail()
      this.detail.parent = this.parentId
      this.detail.type = this.param.type
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
        this.dialogVisible = true
        this.dialogTitle = '编辑'
      })
    },
    closeDialog () {
      this.dialogVisible = false
      this.dialogTitle = null
      this.$refs.form.resetFields()
    },
    getDefaultDetail () {
      return {
        id: null,
        name: null,
        status: 1
      }
    }
  }
}
</script>

<style scoped>

</style>

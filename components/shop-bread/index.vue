<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index) in breadList" :key="index" :to="{ path: item.path }">{{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'shop-bread',
  data () {
    return {
      breadList: []
    }
  },
  created () {
    this.getBreadList()
  },
  methods: {
    getBreadList () {
      switch (this.$route.name) {
        case 'menu':
          this.breadList = [{ name: '系统设置', path: '' }, { name: '菜单设置', path: '' }]
          break
        case 'resource':
          this.breadList = [{ name: '账号设置', path: '' }, { name: '资源授权', path: '' }]
          break
        case 'user':
          this.breadList = [{ name: '账号设置', path: '' }, { name: '用户管理', path: '' }]
          break
        case 'role':
          this.breadList = [{ name: '账号设置', path: '' }, { name: '角色管理', path: '' }]
          break
        case 'sale':
          this.breadList = [{ name: '统计分析', path: '' }, { name: '销售统计', path: '' }]
          break
      }
    }
  }
}
</script>

<style scoped>

</style>

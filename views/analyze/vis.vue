<template>
  <div class="shop-vis">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="vis1" name="vis1"></el-tab-pane>
      <el-tab-pane label="vis2" name="vis2"></el-tab-pane>
      <el-tab-pane label="vis3" name="vis3"></el-tab-pane>
      <el-tab-pane label="vis4" name="vis4"></el-tab-pane>
    </el-tabs>
    <div style="flex: 1;height: 0">
      <vis1 v-if="activeName==='vis1'"></vis1>
      <vis2 v-if="activeName==='vis2'"></vis2>
      <vis3 v-if="activeName==='vis3'"></vis3>
    </div>
  </div>
</template>

<script>
import vis1 from './vis-components/vis1'
import vis2 from './vis-components/vis2'
import vis3 from './vis-components/vis3'

export default {
  name: 'network',
  components: { vis1, vis2, vis3 },
  data () {
    return {
      activeName: 'vis1'
    }
  }
}
</script>

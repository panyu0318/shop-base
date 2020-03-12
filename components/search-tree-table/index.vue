<template>
  <div class="search-tree-table">
    <shop-bread></shop-bread>
    <div class="STT-content">
      <div class="STT-header" v-if="$slots.top">
        <slot name="top"></slot>
      </div>
      <div class="STT-body">
        <div class="STT-left" v-if="$slots.left">
          <slot name="left"></slot>
        </div>
        <div class="STT-right shop-table-page" v-if="$slots.right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-tree-table'
}
</script>

<style scoped>

</style>

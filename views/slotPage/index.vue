<template>
  <div style="height: 100%;width: 100%;">
    <iframe :src="src" style="height: 100%;width: 100%;border: 0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'slotPage',
  data () {
    return {
      src: ''
    }
  },
  created () {
    this.src = this.$route.meta.redirectUrl
  }
}
</script>

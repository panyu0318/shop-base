<template>
  <div style="height: 100%;">
    <BaiduMap style="height: 100%;" center="苏州"></BaiduMap>
  </div>
</template>

<script>
import BaiduMap from '../../components/baidu-map'

export default {
  name: 'shop-map',
  components: { BaiduMap }
}
</script>

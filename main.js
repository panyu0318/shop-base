import Vue from 'vue'
import global from './utils/global'
import shopBread from './components/shop-bread'
import searchTreeTable from './components/search-tree-table'

Vue.component('shop-bread', shopBread)
Vue.component('search-tree-table', searchTreeTable)

global.init()

var router = function (index) {
  return [{
    path: '/index',
    name: 'index',
    component: index,
    children: [{
      path: 'menu',
      name: 'menu',
      component: () => import('../views/system/menu.vue')
    }, {
      path: 'user',
      name: 'user',
      component: () => import('../views/auth/user.vue')
    }, {
      path: 'resource',
      name: 'resource',
      component: () => import('../views/auth/resource.vue')
    }, {
      path: 'role',
      name: 'role',
      component: () => import('../views/auth/role.vue')
    }, {
      path: 'network',
      name: 'network',
      component: () => import('../views/analyze/network.vue')
    }, {
      path: 'vis',
      name: 'vis',
      component: () => import('../views/analyze/vis.vue')
    }, {
      path: 'sale',
      name: 'sale',
      component: () => import('../views/analyze/sale.vue')
    }, {
      path: 'map',
      name: 'map',
      component: () => import('../views/analyze/map.vue')
    }]
  }]
}
export default router

export default {
  path: '/main',
  name: 'main',
  component: () => import('../views/Main.vue'),
  children: [
    { path: '/', redirect: '/table/list' },
    { path: '/settings', component: () => import('../views/GlobalSettings.vue')},
    { path: '/table/list', component: () => import('../views/TableList.vue') },
    { path: '/table/add', component: () => import('../views/TableAdd.vue') },
    { path: '/table/delete', component: () => import('../views/TableDelete.vue') },
    { path: '/category/list', component: () => import('../views/CategoryList.vue') },
    { path: '/category/add', component: () => import('../views/CategoryAdd.vue') },
    { path: '/category/delete', component: () => import('../views/CategoryDelete.vue') },
    { path: '/category/update', component: () => import('../views/CategoryUpdate.vue') },
    { path: '/dish/list', component: () => import('../views/DishList.vue') },
    { path: '/dish/add', component: () => import('../views/DishAdd.vue') },
    { path: '/order/list', component: () => import('../views/OrderList.vue') },
    { path: '/security', component: () => import('../views/Security.vue') },
  ]
}
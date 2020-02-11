import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 动态引入路由
const routerList = [];
function importAll(r) {
  r.keys().forEach(
    (key) => routerList.push(r(key).default)
  );
}

importAll(require.context('./router', true, /\.routes\.js/))
// 整个项目的路由词典：访问路径 <=> 视图组件
export default new Router({
  routes: [
    ...routerList,
    { path: '/', redirect: 'login' }
  ]
})

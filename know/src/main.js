import '../src/less/variable.less'
import Vue from 'vue'
import App from './App'
import Message from './components/Message'
import Zhihu from './components/Zhihu'
import Setting from './components/Setting'
import store from './store'
import VueRouter from 'vue-router'
import VueTouch from '../static/js/plugin/vue-touch.js'


Vue.use(VueTouch);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Zhihu
  },
  {
    path: '/zhihu/:id',
    component: Message
  },
  {
    path: '/setting',
    component: Setting
  }
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
window.bus = new Vue();

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App, Message, Setting }
})

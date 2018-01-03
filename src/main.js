import Vue from 'vue';
import VueRouter from 'vue-router';

//必须写 手动启用VueRouter
Vue.use(VueRouter);

//导入VueResource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://vue.studyit.io/';

//导入相关组件

import app from './App.vue';
// 导入 自定义路由模块
import router from './router.js';

// 导入 mui 文件
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';

import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})
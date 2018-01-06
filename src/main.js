import Vue from 'vue';
import VueRouter from 'vue-router';

//必须写 手动启用VueRouter
Vue.use(VueRouter);

//导入VueResource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://vue.studyit.io/';
Vue.http.options.emulateJSON = true;

//导入moment插件
import moment from 'moment'
Vue.filter('dateFormat',function(dataStr, partten = 'YYYY-MM-DD hh:mm:ss'){
   return moment(dataStr).format(partten)
})
//导入相关组件

import app from './App.vue';
// 导入 自定义路由模块
import router from './router.js';

// 导入 mui 文件
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';

// import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name,Swipe);
// Vue.component(SwipeItem.name,SwipeItem);
// Vue.component(Button.name,Button);
//因为按需导入对懒加载 小图标不支持 因此以完整导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})
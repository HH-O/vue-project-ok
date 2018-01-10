import Vue from 'vue';
import VueRouter from 'vue-router';

//必须写 手动启用VueRouter
Vue.use(VueRouter);


// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//页面载入冬本地内存获取购物车产品数据
var car = JSON.parse(localStorage.getItem("car") || "[]");
var store = new Vuex.Store({
    state: {
        car: car //购物车产品数据
    },
    mutations: {
        //添加商品到购物车
        addToCar(state, goodsinfo){
            var flag = false;
            //添加的是购物车中已有商品就将数量相加,否则添加该商品的全部信息
            state.car.some(item => {
            if(item.id === goodsinfo.id){
                item.count += parseInt(goodsinfo.count);
                flag = true;
                return true;
            }
            })
            if(!flag){
                state.car.push(goodsinfo);
            }
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        //将shopcar_numbox组件中变化的购物车产品数量跟新到store中
        updateGoodsInfo(state, goodsinfo){
            state.car.some( item => {
                if(item.id == goodsinfo.id){
                    item.count = JSON.parse(goodsinfo.count);
                    return true;
                }
                
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        // 根据Id，从store 中的购物车中删除对应的那条商品数据
        removeFormCar(state, id){
            state.car.some((item, i) => {
                if(item.id == id){
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        //将shopcar_numbox组件中购物车选中状态更新到store中
        updateGoodsSelected(state, info){
            state.car.forEach( item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters: {
        //将购买数量加入到app组件的购物车徽章上显示
        getAllCount(state){
            var c = 0;
            state.car.forEach( item => {
                c += item.count;
            })
            return c
        },
        //定义一个{[id: count]} 对象 向外暴露 去初始化渲染shopcar_numbox购物车购买数量
        getGoodsCount(state){
            var o = {};
            state.car.forEach( item => {
                o[item.id]= item.count;
            })
            return o
        },
        //定义一个{[id: selected]} 对象 向外暴露 购物车选中状态
        getGoodsSelected(state){
            var o = {};
            state.car.forEach( item => {
                o[item.id]= item.selected;
            })
            return o
        },
        //计算勾选物品的总数量 与 总价
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})


//导入VueResource
import VueResource from 'vue-resource';
Vue.use(VueResource);

//全局定义跟路由
Vue.http.options.root = 'http://vue.studyit.io/';
Vue.http.options.emulateJSON = true;
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)


//导入moment插件格式化时间
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

//引入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



var vm = new Vue({
    el: '#app',
    render: c => c(app),  //挂载根组件
    router,  //挂载路由
    store   //挂载vuex数据
})



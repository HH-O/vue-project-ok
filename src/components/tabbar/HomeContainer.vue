<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbotulist" :key="item.img">
            <img :src="item.img" alt="">
        </mt-swipe-item>
        
        </mt-swipe>

        <!-- 九宫格 到 6宫格 的改造 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                lunbotulist: []
            }
        },
        created(){
            this.getlunbitu()
        },
        methods:{
            getlunbitu(){
                this.$http.get('api/getlunbo').then( res => {
                    // console.log(res.body)
                   if(res.body.status === 0){
                        this.lunbotulist = res.body.message;
                   } else {
                       Toast('啊哈,图片走丢了');
                   }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;

    .mint-swipe-item {
       
        img {
            width: 100%;
            height: 100%;
        }
    }
} 

.mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        margin-top: 22px;
        img {
            width: 50px;
            height: 50px;
        }

        .mui-media-body{
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    } 
</style>
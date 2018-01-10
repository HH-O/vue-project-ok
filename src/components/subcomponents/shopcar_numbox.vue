<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                                                        <!-- 初始化购买数量 -->
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";

    export default {
        mounted() {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox();
        },
        methods: {
            //将数量的变化更新到store中
            countChanged() {
              var goodsinfo = {
                id: this.goodsid,
                count: this.$refs.numbox.value
              }
              this.$store.commit("updateGoodsInfo", goodsinfo);
            }
        },
        props: ["initcount","goodsid"]  //父子组件传值
    };
</script>

<style lang="scss" scoped>

</style>

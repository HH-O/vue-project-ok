<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（120字以内）" maxlength="120"  v-model="msg"></textarea>

    <mt-button type="primary" size="large"  @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <!-- :key 之前绑定的时间做唯一标志 容易冲突报错  此处更改为索引i -->
      <div class="cmt-item" v-for="(item, i) in comments" :key="i">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>

    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: ''
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
        this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
        .then( result => {
          if(result.body.status === 0){
            //加载更多评论  不清空之前的评论 拼接评论数组
            this.comments = this.comments.concat(result.body.message);
            //返回数据为空时 提示用户无更多数据
             if(result.body.message.length === 0){
               Toast('到底啦~~不要再加载啦')
            }
          } else {
            Toast('获得评论失败')
          }
        })
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    //提交评论
    postComment(){
      if(this.msg.trim().length === 0){
        return Toast('评论不能为空')
      }
      this.$http.post("api/postcomment/" + this.$route.params.id, {content: this.msg.trim()})
      .then( result => {
        if(result.body.status === 0){
          //拼接一个评论对象
          var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
          this.comments.unshift(cmt);
          this.msg = '';
        }
      })
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>

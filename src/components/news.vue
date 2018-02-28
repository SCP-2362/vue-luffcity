<template>
  <div class="news">
    <h2>深科技列表</h2>
    <div>{{err_msg}}</div>
    <ul>
      <li v-for="item in msgList">
        <h1><router-link :to="{'path':'/news_detail/'+item.pk}">{{item.title}}</router-link></h1>
        <span>来源{{item.source}}</span>
        <span>阅读{{item.view_num}}</span>
        <span>评论{{item.comment_num}}</span>
        <span>收藏{{item.collect_num}}</span>
        <p><router-link :to="{'path':'/news_detail/'+item.pk}">{{item.brief}}</router-link></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      msgList: [],
      err_msg:''
    }
  },
  mounted: function (){
    this.init()
  },
  methods:{
    init(){
      let that = this;
      this.$axios({
        url:'http://127.0.0.1:8000/api/news/',
        method:'GET',
        responseType: 'json'
      }).then(function (response) {
          let data = response.data;
          if (data.state === 10000){
            that.msgList = data.data
          }else{
            that.err_msg = data.msg
          }
      })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
  span .s1{
    color: red;
  }
</style>

<template>
    <div class="detail">
      <div>{{err_msg}}</div>
      <h1>{{title}}</h1>
      <div>{{msg}}</div>
      <a @click="dodianzan" > 点赞{{dianzan}}</a>;
      <a @click="doshoucang" > 收藏{{shoucang}}</a>
    </div>
</template>

<script>
    export default {
        name: "news_detail",
      data(){
          return{
            msg: '',
            title:'',
            err_msg:'',
            dianzan:'',
            shoucang:''
          }
      },
      mounted(){
          this.init()
      },
      methods:{
          init(){
            let nid=this.$route.params.id;
            let that = this;
            let url = 'http://127.0.0.1:8000/api/v1/news/'+nid+'/';
            this.$axios({
              url:url,
              method:'GET',
              responseType: 'json'
            }).then(function (response) {
              let data = response.data;
              if (data.state === 10000){
                that.msg = data.data.content;
                that.title = data.data.title;
              }else{
                that.err_msg = data.data.msg
              }
            })
          },
         dodianzan(){
            var user_name=this.$store.state.username
           console.log(user_name)
           if (user_name){
              let nid=this.$route.params.id;
              let that = this;
              let url = 'http://127.0.0.1:8000/api/v1/news/'+nid+'/';
              this.$axios({
               url:url,
               method:'POST',
               responseType: 'json'
              }).then(function (response) {
              let data = response.data;
              console.log(data)
              if (data.state === 10000) {
                 that.dianzan = data.data.agree_num;

              } else {
                 that.err_msg = data.data.msg
              }
            })


            }


          },
         doshoucang(){
            var user_name=this.$store.state.username
           console.log(user_name)
           if (user_name){
              let nid=this.$route.params.id;
              let that = this;
              let url = 'http://127.0.0.1:8000/api/v1/shoucang/'+nid+'/';
              this.$axios({
               url:url,
               method:'POST',
               responseType: 'json'
              }).then(function (response) {
              let data = response.data;
              console.log(data)
              if (data.state === 10000) {
                 that.shoucang = data.data.collect_num;

              } else {
                 that.err_msg = data.data.msg
              }
            })

            }

          },

      }
    }
</script>

<style scoped>

</style>

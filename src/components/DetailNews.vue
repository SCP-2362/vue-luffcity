<template>
    <div class="detail">
      <div>{{err_msg}}</div>
      <h1>{{title}}</h1>
       <a> 点赞 {{dianzan1}}</a>;
      <a > 收藏 {{shoucang1}}</a>
      <div>{{msg}}</div>
      <a @click="dodianzan" > 点赞 <span class='s1'>{{dianzan}}</span></a>;
      <a @click="doshoucang" > 收藏<span class="s1"> {{shoucang}}</span></a>
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
            dianzan1:'',
            shoucang1:'',
            dianzan:'',
            shoucang:'',
          }
      },
      mounted(){
          this.init()

      },
      methods:{
          init(){
            let nid=this.$route.params.id;
            let that = this;
            let url = 'http://127.0.0.1:8000/api/news/'+nid+'/';
            this.$axios({
              url:url,
              method:'GET',
              responseType: 'json'
            }).then(function (response) {
              let data = response.data;
              if (data.state === 10000){
                that.msg = data.data.content;
                that.title = data.data.title;
                that.dianzan1=data.data.agree_num;
                that.shoucang1=data.data.collect_num
              }else{
                that.err_msg = data.data.msg
              }
            })
          },

         dodianzan(){

           var  userToken = this.$store.state.token;
           console.log(userToken)
           if (userToken){
              let nid=this.$route.params.id;
              let that = this;
              let url = 'http://127.0.0.1:8000/api/news/'+nid+'/';
              this.$axios({
               url:url,
               method:'POST',
                data:{
                 userToken:userToken
                },
               responseType: 'json'
              }).then(function (response) {
              let data = response.data;
              console.log(data)
              if (data.state === 10000) {
                 that.dianzan1 = data.data.agree_num;

              } else {
                 that.dianzan = data.msg
              }
            })
            }
            else{
             this.$router.push('/login')
           }


          },
         doshoucang(){

            var  userToken = this.$store.state.token;
           console.log(userToken)
           if (userToken){
              let nid=this.$route.params.id;
              let that = this;
              let url = 'http://127.0.0.1:8000/api/shoucang/'+nid+'/';
              this.$axios({
               url:url,
               method:'POST',
                data:{
                   userToken:userToken
                },
               responseType: 'json'
              }).then(function (response) {
              let data = response.data;
              console.log(data)
              if (data.state === 10000) {
                 that.shoucang1 = data.data.collect_num;

              } else {
                 that.shoucang = data.msg
              }
            })

            }
            else{
              this.$router.push('/login')
           }

          },

      }
    }
</script>


<style scoped>


  span{
    color: red;
  }
</style>

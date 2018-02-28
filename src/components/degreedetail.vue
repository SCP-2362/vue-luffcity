<template>
  <div class="degree-detail">
    <h2>学位课详细</h2>
    <div class="head">
      <h2>{{head.title}}</h2>
      <!--<h3>{{head.brief}}</h3>-->
      <div>
        开课日期：
        限定席位：
      </div>
    </div>
    <div class="box">
      <h3>基本信息</h3>
      <p>{{box.brief}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'degree',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      head: {
        title: '',
      },
      box: {
        brief: '',

      }
    }
  },
  mounted:function () {
    this.initDegreeDetail()
  },
  methods:{
    initDegreeDetail:function () {
      let nid = this.pk = this.$route.params.id;  //获取id
      let that = this;
      this.$axios.request({
        url: 'http://127.0.0.1:8000/api/degrees/' + nid + '.json',
        methods:'GET',
        responseType:'json'
      }).then(function (response) {
        response = response.data.data

        console.log("头部", response);

        that.head.title = response.name;

        that.box.brief = response.brief
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
</style>

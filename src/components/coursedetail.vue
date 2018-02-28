<template>
  <div class="hello">
    <div>课程详细</div>
    <h3>{{ title }}</h3>
    <h3>{{ summary }}</h3>
    <ul class="tab">
      <li @click="coursebrief()">课程概述</li>
      <li @click="coursechapters()">课程章节</li>
      <li @click="coursequestion">常见问题</li>
    </ul>
    <div>
      <!--<h3>{{ brief }}</h3>-->
      <h5 v-text="brief"></h5>
      <!--<a href="" v-model="brief"></a>-->
      学习时间：{{ period }}
      难易程度：{{ level }}
      <p>{{ why_study }}</p>
      <p>{{ what_to_study_brief }}</p>
      <div>
        <h1>常见问题</h1>
        <ul v-for="item in question_list">
          <li>问：{{ item.question }}</li>
          <li>答：{{ item.answer }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title:'',
      summary:'',
      pk: null,
      brief:'',  //课程概述
      period:'', //学习时长
      level:'' , //难度
      why_study:'',  //为什么要学习Django
      what_to_study_brief:'', //我将学到那些内容
      question_list:[],
    }
  },
  mounted:function () {
    //当组件一加载就执行的函数
    this.initCoursesDetail();
//    this.coursebrief();
//    this.coursechapters();
    this.coursequestion();
  },
  methods:{
    initCoursesDetail(){
      let nid = this.$route.params.id;  //获取id
      let that = this;
      let url = 'http://127.0.0.1:8000/api/course/' + nid+'.json';
      this.pk = nid;
      console.log(url);
      this.$axios.request({
        url:url,
        methods:'GET',
        responseType:'json'
      }).then(function (response) {
//        console.log(response);
        that.title = response.data.data.name;
        that.summary = response.data.data.brief;
        that.period = response.data.data.period;
        that.level = response.data.data.level

      })
    },
    coursebrief(){
      let that = this;
      this.$axios.request({
        url:'http://127.0.0.1:8000/api/course/'+ this.pk+'.json'+'?data_type=detail',
            method:'GET',
            responseType:'json'
          }).then(function (response) {
//            console.log(response);
//            console.log(response.data.why_study,'为什么要学习');
            that.brief = response.data.data.brief;
            that.why_study = response.data.why_study;
            that.what_to_study_brief = response.data.what_to_study_brief
          })
      },
    coursechapters(){
        var that = this
        this.$axios.request({
        url:'http://127.0.0.1:8000/api/course/'+ this.pk+'.json'+'?data_type=chapters',
            method:'GET',
            responseType:'json'
          }).then(function (response) {
//            console.log(response)
          })
      },
    coursequestion(){
       var that = this;
       this.$axios.request({
              url:'http://127.0.0.1:8000/api/course/'+ this.pk+'.json'+'?data_type=question',
                  method:'GET',
                  responseType:'json'
                }).then(function (response) {
                  console.log(response.data);
                  that.question_list = response.data.data;
                  console.log(that.question_list)
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab li{
    list-style: none;
    display: inline-block;
  }
</style>

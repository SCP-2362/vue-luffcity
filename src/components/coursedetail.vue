<template>
  <div class="hello">
    <div>课程详细</div>
    <h3>{{ head.title }}</h3>
    <h3>{{ head.video_brief_link }}</h3>
    <div>
      学习时间：{{ head.period }}
      难易程度：{{ head.level }}
      学习人数：0人
    </div>
    <ul class="tab">
      <!--<li v-for="(item, index) in tabs" :class="{active:index == num}" @click="tab(index)">{{item}}</li>-->

      <li @click="tab('detail')">课程概述</li>
      <li @click="tab('chapters')">课程章节</li>
      <li @click="tab('question')">常见问题</li>
    </ul>
    <!--<div class="box">-->
    <div class="detail box">
      <h3>可以根据不同的学习情况购买不一样的学习套餐哦！</h3>
      <ul>
        <li v-for="item in box.detail.priceList">{{item.price}}/{{item.valid_period}}</li>
      </ul>
      <div>
        <h3>课程概述</h3>
        <p>{{box.detail.brief}}</p>
      </div>
      <div>
        <h3>为什么学习这门课程</h3>
        <p>{{box.detail.why_study}}</p>
      </div>
      <div>
        <h3>我将学到的内容</h3>
        <ol>
          <li v-for="item in box.detail.outlineList">{{item.title}}
            <div>{{item.content}}</div>
          </li>
        </ol>
      </div>
      <div>
        <h3>此项目如何有助于我的职业生涯？</h3>
        <p>{{box.detail.career_improvement}}</p>
      </div>
      <div>
        <h3>课程先修要求</h3>
        <p>{{box.detail.prerequisite}}</p>
      </div>
      <div>
        <h3>课程讲师简介</h3>
        <ul>
          <li v-for="item in box.detail.teacherList">
            {{item.name}}  {{item.title}} {{item.brief}}
          </li>
        </ul>
      </div>
    </div>
    <div class="chapters box">
      <ul>
        <li v-for="item in box.chapters">
          第{{item.chapter}}章 | {{item.name}}
          <ul>
            <li v-for="section in item.coursesections">
              {{section.name}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="comment box">

    </div>
    <div class="question box">
       <h1>常见问题</h1>
        <ul v-for="item in box.question_list">
          <li>问：{{ item.question }}</li>
          <li>答：{{ item.answer }}</li>
        </ul>
    </div>
    <!--</div>-->

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      pk: null,
      head: {
        title:'',
        video_brief_link:'',
        period:'', //学习时长
        level:''  //难度
      },
      box: {
        detail: {
          priceList: [],
          brief: '',
          why_study: '',
        },
        chapters: [],
		question_list: []
      },
    }
  },
  mounted:function () {
    //当组件一加载就执行的函数
    this.initCoursesDetail();
    this.coursedetail();
    this.coursechapters();
	  this.coursequestion();
  },
  methods:{
    initCoursesDetail(){
      let nid = this.pk = this.$route.params.id;  //获取id
      let that = this;
      this.$axios.request({
        url: 'http://127.0.0.1:8000/api/v1/courses/' + nid + '.json',
        methods:'GET',
        responseType:'json'
      }).then(function (response) {
        response = response.data.data

        console.log("头部", response);

        that.head.title = response.name;
        that.head.video_brief_link = response.detail.video_brief_link;
        that.head.period = response.period;
        that.head.level = response.level;
      })
    },
    coursedetail(){
      let that = this;
      this.$axios.request({
        url:'http://127.0.0.1:8000/api/v1/courses/'+ this.pk+'.json'+'?data_type=detail',
        method:'GET',
        responseType:'json'
      }).then(function (response) {
        if (response.data.state){
          response = response.data.data
          console.log("课程详细", response)

          that.box.detail.priceList = response.price
          that.box.detail.brief = response.course.brief
          that.box.detail.why_study = response.why_study
          that.box.detail.outlineList = response.outline
          that.box.detail.career_improvement = response.career_improvement
          that.box.detail.prerequisite = response.prerequisite
          that.box.detail.teacherList = response.teachers


        }else{
          alert(response.data.msg)
        }
      })
    },
    coursechapters(){
        var that = this
        this.$axios.request({
        url:'http://127.0.0.1:8000/api/v1/courses/'+ this.pk+'.json'+'?data_type=chapters',
            method:'GET',
            responseType:'json'
          }).then(function (response) {
            response = response.data.data
            console.log("课程章节", response)

            that.box.chapters = response
          })
      },
    tabChange(){
      $(".box").each(function () {
//        this.css("display", 'none')
      })
      console.log(this)
    },
    tab(cls) {
      $(".box").each(function (index, ele) {
        $(ele).css("display", "none")
      })
      $("."+cls).css("display", "block")
    },
	  coursequestion(){
       var that = this;
       this.$axios.request({
          url:'http://127.0.0.1:8000/api/v1/courses/'+ this.pk+'.json'+'?data_type=question',
              method:'GET',
              responseType:'json'
            }).then(function (response) {
              console.log("问题", response);
              that.box.question_list = response.data.data;
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

<template>
  <div class="course">
    <h2>课程列表</h2>
    <ul>
      <li v-for="item in courseList">
        <router-link :to="{'path':'/course-detail/'+item.id}">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'course',
  data () {
    return {
      msg: '',
      courseList:[]
    }
  },
  mounted:function () {
    //当组件一加载的时候就应该去数据库去获取数据
    this.initCourses()
  },
  methods:{
    initCourses:function () {
      var that = this;
      this.$axios.request({
        url:'http://127.0.0.1:8000/api/course/',
        method:"GET"
      }).then(function (response) {
        console.log(response);
        that.courseList = response.data.data  //吧从数据库中获取的数据保存在courseList列表中
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

<template>
  <div class="degree">
    <h2>学位课列表</h2>
    <ul>
      <li v-for="item in degreeCourseList">
        <router-link :to="{'path':'/degree-detail/'+item.id}">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'degree',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      degreeCourseList: [],
    }
  },
  mounted:function () {

    this.initDegreeCourses()
  },
  methods:{
    initDegreeCourses:function () {
      var that = this;
      this.$axios.request({
        url:'http://127.0.0.1:8000/api/degrees/',
        method:"GET"
      }).then(function (response) {
        console.log(response);
        that.degreeCourseList = response.data.data
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

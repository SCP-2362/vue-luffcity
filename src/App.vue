<template>
  <div id="app">
    <h1>路飞学城</h1>
    <div class="header">
      <router-link to="/index">首页</router-link>
      <router-link to="/course">课程</router-link>
      <router-link to="/degree">X学位</router-link>
      <router-link to="/news">深科技</router-link>
      <div v-if="this.$store.state.username">
        <a href="">{{this.$store.state.username}}</a> | <a href="">注销</a>
      </div>
      <div v-else>
        <router-link to="/login">登录</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 20px;
  }
  .header div{
    display: inline-block;
  }
</style>

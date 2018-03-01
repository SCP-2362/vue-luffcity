<template>
  <div class="index">
    <div v-if="this.$store.state.username">
      <h2>{{this.$store.state.username}}，欢迎登录路飞学城！</h2>
    </div>
    <div v-else>
      <h2>游客，欢迎来到路飞学城！</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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

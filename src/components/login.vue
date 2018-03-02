<template>
  <div class="login">
    <h2>登录页面</h2>
    <div>
      <label for="username">用户名</label>
      <input type="text" v-model="username" id="username" placeholder="请输入用户名">
    </div>
    <div>
      <label for="password">密码</label>
      <input type="text" v-model="password" id="password" placeholder="请输入密码">
    </div>
    <button @click="doLogin">提交</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
    }
  },
  methods:{
    doLogin(){
      let that = this
      this.$axios.request({
        url: 'http://127.0.0.1:8000/api/v1/login/',
        data: {
          username: this.username,
          password: this.password
        },
        method: 'POST',
        responseType: 'json',
      }).then(function (response) {
        console.log(response)
        let data = response.data
        if (data.state == '10000'){
          // 找到全局变量，把用户名和token赋值到其中。
          that.$store.commit('saveToken', data.data)
          // 重定向到index
          that.$router.push('/index')
        } else {
          alert(data.msg)
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
</style>

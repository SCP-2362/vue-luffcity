import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Course from '../components/course.vue'
import Degree from '../components/degree.vue'
import News from '../components/news.vue'
import Login from '../components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/course',
      name: 'Course',
      component: Course
    },
    {
      path: '/degree',
      name: 'Degree',
      component: Degree
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})

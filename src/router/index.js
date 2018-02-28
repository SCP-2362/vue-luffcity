import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Course from '../components/course.vue'
import CourseDetail from '../components/coursedetail.vue'
import Degree from '../components/degree.vue'
import News from '../components/news.vue'
import Login from '../components/login.vue'
import DegreeDetail from '../components/degreedetail.vue'
import DetailNews from '../components/DetailNews.vue'



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
      path: '/course-detail/:id/',
      name: 'CourseDetail',
      component: CourseDetail
    },
    {
      path: '/degree',
      name: 'Degree',
      component: Degree
    },
    {
      path: '/degree-detail/:id/',
      name: 'DegreeDetail',
      component: DegreeDetail
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
    {
      path: '/news_detail/:id',
      name: 'DetailNews',
      component: DetailNews
    },
  ]
})

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    props($route) {
      return {
        type: $route.query.type
      }
    }
  },
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue'),
    redirect: '/blog',
    children: [
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('../views/HomePage/Blog.vue')
      },
      {
        path: 'project',
        name: 'Project',
        component: () => import('../views/HomePage/Project.vue')
      },
      {
        path: 'tools',
        name: 'Tools',
        component: () => import('../views/HomePage/Tools.vue')
      },
      {
        path: 'favours',
        name: 'Favours',
        component: () => import('../views/HomePage/Favours.vue')
      },
      {
        path: 'xazh',
        name: 'Xazh',
        component: () => import('../views/HomePage/Xazh.vue')
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('../views/HomePage/Setting.vue')
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/Error/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

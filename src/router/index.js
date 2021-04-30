import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Boards from '../views/Boards.vue'
import Board from '../views/Board.vue'
import Teams from '../views/Teams.vue'

import { isLoggedIn } from '../services/auth.service'
import store from '../store/index'

Vue.use(VueRouter)

let titles = {
  dashboard: 'Accueil',
  boards: 'Tableaux',
  board: 'Tableau',
  teams: 'Equipes'
}

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: titles.dashboard,
      icon: 'data:image/png;base64,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'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:  {
      public: true,  // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true,  // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      public: true,  // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/logout',
    name: 'Logout'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/boards',
    name: 'Boards',
    component: Boards,
    meta: {
      title: titles.boards
    }
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
    meta: {
      title: titles.board
    }
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams,
    meta: {
      title: titles.teams
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)

  const loggedIn = isLoggedIn();

  //for logout
  if (to.name == 'Logout' && loggedIn) {
    store.dispatch('auth/logout')
  }

  if (!isPublic && !loggedIn) {
    return next({
      path: '/home',
      query: { redirect: to.fullPath }  // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next();
})

export default router

<template>
  <div id="app">
    <the-nav-bar></the-nav-bar>
    <div class="main" :class="{ 'darkerbg': isLoggedIn() }">  
      <auth-layout v-if="shouldUseAuthLayout()"></auth-layout>
      <app-layout v-else></app-layout>
    </div>
  </div>
</template>
<script>
import { isLoggedIn } from '@/services/auth.service'
import TheNavBar from '@/components/common/TheNavBar.vue'
import AppLayout from '@/views/layouts/AppLayout.vue'
import AuthLayout from '@/views/layouts/AuthLayout.vue'

export default {
  
  methods: {
    isLoggedIn() {
      return isLoggedIn()
    },
    shouldUseAuthLayout() {
      var authLayoutRoutes = ["Login", "Register"]
      return authLayoutRoutes.indexOf(this.$route.name) !== -1
    }
  },

  components: { TheNavBar, AppLayout, AuthLayout }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

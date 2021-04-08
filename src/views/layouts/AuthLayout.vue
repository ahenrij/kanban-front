<template>
  <div class="layout">
    <div class="container uk-child-width-expand@s" uk-grid>
      <div class="container-left uk-flex uk-flex-middle uk-flex-center">
          <div class="">
              <img class="login-icon" src="@/assets/images/auth.svg" alt="">
          </div>
      </div>
      <div class="uk-flex uk-flex-middle uk-flex-center">
          <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'AuthLayout',
  components: {
    
  }
}
</script>

<style scoped>
  .container {
    height: 100vh; background-color:#fff
  }
  .container-left {
    background-color: #448AFF;
  }

  /* Large */
  @media only screen and (min-width: 1200px)  {
    .login-icon {
      height: 370px;
    }
  }

  /* Large */
  @media only screen and (min-width: 960px) and (max-width: 1200px)  {
    .login-icon {
      height: 150px;
    }
  }

  /* Medium */
  @media only screen and (min-width: 640px) and (max-width: 960px) {
    .login-icon {
      height: 150px;
    }
  }

  /* Small */
  @media only screen and (max-width: 640px) {
    .login-icon {
      height: 150px;
    }
    .layout {
      padding-top: 80px
    }
  }
</style>
<template>
  <div class="home">
    <div class="container uk-child-width-expand@s" uk-grid>
      
      <div class="uk-flex uk-flex-middle uk-flex-last@s">
          <img src="@/assets/images/scrum_board.svg" alt="Kanban Board">
      </div>
      <div class="uk-flex uk-flex-middle">
          <div class="catching-block">
            <h1 style="font-family: Quicksand">Application Kanban</h1>
            <h2 class="catching-text uk-text-light">Gérez efficacement vos tâches et <br>Assurez un meilleur suivi de vos projets</h2>
            <bouton-router to="/register" title="Commencer" class="uk-margin-right" primary></bouton-router>
            <bouton-router to="/about" title="A propos"></bouton-router>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BoutonRouter from '@/components/utils/BoutonRouter.vue'

export default {
  name: 'Home',
  components: { BoutonRouter }
}
</script>

<style scoped>
  * {
    font-family: 'Montserrat';
  }
  .container {
    height: 100vh; background-color:#fff; text-align: left;
  }
  .container-left {
    background-color: #448AFF;
  }
  .login-icon {
    height: 400px;
    top: 45vh;
  }
  .catching-block {
    margin: 45px 40px 40px 45px;
  }
  a {
    padding-left: 50px; padding-right: 50px;
  }
  @media only screen and (max-width: 640px)  {
    .home {
      padding-top: 80px
    }
  }
</style>
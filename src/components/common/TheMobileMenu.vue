<template>
    <div>
        <div class="uk-hidden@m">
            <a class="uk-navbar-toggle uk-icon uk-navbar-toggle-icon" href="#" uk-navbar-toggle-icon="" aria-expanded="true"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="navbar-toggle-icon"><rect y="9" width="20" height="2"></rect><rect y="3" width="20" height="2"></rect><rect y="15" width="20" height="2"></rect></svg></a>
            <ul v-if="!isLoggedIn()" class="uk-nav-default uk-navbar-dropdown uk-navbar-dropdown-bottom-right" uk-drop="mode: click; cls-drop: uk-navbar-dropdown; boundary: !nav; flip: x" uk-nav>
                <li class="uk-active"><router-link to="/home">Accueil</router-link></li>
                <li class="uk-parent"><router-link to="/about">A propos</router-link></li>
                <li class="uk-parent"><router-link to="/login">Se connecter</router-link></li>
            </ul>
            <ul v-else class="uk-nav-default uk-navbar-dropdown uk-navbar-dropdown-bottom-right" uk-drop="mode: click; cls-drop: uk-navbar-dropdown; boundary: !nav; flip: x" uk-nav>
                <li><router-link class="logout" to="/logout" uk-icon="icon: sign-out">Déconnexion</router-link></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { isLoggedIn } from '@/services/auth.service'
export default {
    
    methods: {
        isLoggedIn: function (){
            return isLoggedIn();
        }
    }
}
</script>
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <nav style="position: fixed; width: 100%; z-index: 2;" :class="navbarClass" class="uk-background-primary@s" uk-navbar>
        <div class="uk-navbar-left uk-margin-left">
            <div class="uk-navbar-item">
                <img src="@/assets/images/icon.png" class="logo uk-padding-remove" alt="Logo" style="width:55px; height: 50px">
            </div>
            <!--iTresorerie label-->
            <a class="uk-navbar-item uk-logo uk-padding-remove uk-text-bold" :style="{ color: titleColor }" href="/" style="font-size: 2em;">{{ title }}</a>
        </div>
        <div class="uk-navbar-right">
            
            <div v-if="!isLoggedIn()">
                <ul class="uk-navbar-nav uk-visible@m uk-margin-right">
                    <li class="uk-active"><router-link to="/home">Accueil</router-link></li>
                    <li class="uk-parent"><router-link to="/about">A propos</router-link></li>
                    <li class="uk-parent"><router-link to="/login">Se connecter</router-link></li>
                </ul>
            </div>
            <div v-else>
                <ul class="uk-navbar-nav uk-visible@m uk-margin-right">
                    <li><router-link to="/profile">{{ user ? user.name : '' }}</router-link></li>
                    <li><router-link class="logout" to="/logout" uk-icon="icon: sign-out"></router-link></li>
                </ul>
            </div>
            
            <the-mobile-menu></the-mobile-menu>

        </div>
    </nav>
</template>

<script>
import TheMobileMenu from '@/components/common/TheMobileMenu.vue'
import { isLoggedIn } from '@/services/auth.service'
import { mapGetters } from 'vuex'

export default {
    data: function () {

        return {
            defaultNavbarClass: 'uk-navbar-nav',
            title: 'KanbanApp'
        }
    },

    computed: {

        ...mapGetters('data', [
            'get'
        ]),

        navbarClass: function() {
            if (this.loggedIn()) { //check from store variable
                return this.defaultNavbarClass + ' uk-box-shadow-small uk-background-default'
            }
            return this.defaultNavbarClass + ' uk-navbar-transparent';
        },

        titleColor: function() {
            if (this.shouldHaveWhiteTitle()) {
                return '#ffffff'
            }
            return '#272C2E';
        },

        user: function() {
            return this.get('user')
        }
    },

    methods: {

        ...mapGetters('auth', [
            'loggedIn'
        ]),

        isLoggedIn() {
            return isLoggedIn()
        },

        shouldHaveWhiteTitle() {
            var whiteTitleRoutes = ["Login", "Register"]
            return whiteTitleRoutes.indexOf(this.$route.name) !== -1
        },
    },
    components: { TheMobileMenu }
}
</script>

<style scoped>
    * {
        font-family: 'Montserrat' !important;
    }

    li > a {
        font-family: 'Lato' !important;
        font-size: 1.1em;
    }

    .logout:hover {
        color: #E91E63;
    }
    
    @media only screen and (max-width: 640px) {
        .logo {
            width: 40px; height: 40px;
        }
        nav {
            background-color: white;
            -webkit-box-shadow: 0px 0px 8px 2px #000000;
            -moz-box-shadow: 0px 0px 8px 2px #000000;
            box-shadow: 0px 0px 8px 2px #cecece;
        }
    }

    @media only screen and (min-width: 640px) {
        .logo {
            width: 60px; height: 60px;
        }
    }

</style>
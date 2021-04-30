<template>
    <div class="sidenav uk-card uk-card-default uk-card-body uk-padding-remove uk-visible@m" style="">

        <div class="uk-padding info-block">
            <span class="uk-text-lead uk-display-block organization">{{ user.firstName }} {{ user.lastName | uppercase }}</span>
            <small class="">{{ user.email }}</small>
        </div>
        
        <div class="">
            <ul class="uk-nav-default uk-nav-default uk-nav-parent-icon" uk-nav>
                <li :class="(this.$route.path == '/' ? 'active' : '')"><router-link to="/"><span class="uk-margin-small-right" uk-icon="icon: home; ratio: .9"></span><span> Accueil</span></router-link></li>
                <li :class="(['Boards', 'Board'].includes(this.$route.name) ? 'active' : '')"><router-link to="/boards"><span class="uk-margin-small-right" uk-icon="icon: thumbnails; ratio: .9"></span> Tableaux</router-link></li>
                
                <li class="uk-nav-divider"></li>
                <!--li :class="(this.$route.path == '/parameters' ? 'active' : '')"><router-link to="/parameters"><span class="uk-margin-small-right" uk-icon="icon: cog"></span> Paramètres</router-link></li-->
                <li><router-link class="logout uk-button uk-button-default" to="/logout"><span class="uk-margin-small-right" uk-icon="icon: sign-out; ratio: .8"></span> Déconnexion</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { StorageService } from '@/services/storage.service'

export default {
    data: function () {

        return {
            user: StorageService.getUser(),
        }
    },

    filters: {
        uppercase: function (str) {
            return str.toUpperCase()
        },
    }
}
</script>

<style scoped>
    a {
        font-size: 16px;
        color: #272C2E;
    }

    li {
        padding-top: 8px;
        padding-bottom: 8px;
        margin-top:0px !important;
        margin-bottom: 0px !important;
    }

    .sidenav {
        width: 280px;
        height: 100vh !important;
        margin-top: 80px;
        text-align: left !important;
        position: fixed;
        overflow-y: auto;
        z-index: 0;
        left:0 !important;
        margin-left: -30px !important;
        padding-left: 30px !important;
        padding-bottom: 100px !important;
    }

    .info-block {
        background: #f3f6fb;
    }

    li.active {
        background: #fafafa;
        border-left: solid 3px #448AFF;
    }

    li.active > a {
        color: #448AFF;
        padding-left: 37px !important;
    }

    .organization {
        font-size: 18px;
    }

    .logout {
        width: 185px;
        padding-left: 5px !important;
        padding-right: 5px !important;
        font-size: 13px;
        margin-left: 17px;
    }

    .logout:hover {
        background: #FF5252;
        border-color: #FF5252;
        color: white;
        transition: background-color .3s ease;
    }

</style>
<template>
    <div class="layout">
        
        <div v-if="isLoggedIn()" uk-grid>
            <side-nav/>
            <div class="uk-width-expand@s content">
                <div class="uk-padding uk-overflow-auto">
                    <router-view/>
                </div>
            </div>
        </div>

        <div v-else>
            <router-view/>
        </div>

    </div>
</template>

<script>

import { isLoggedIn } from '@/services/auth.service'
import SideNav from '@/components/common/TheSideNav'

export default {
    
    methods: {
        isLoggedIn: function() {
            return isLoggedIn();
        }
    },
    components: { SideNav }
}
</script>

<style scoped>
    .content {
        text-align: left;
        background-color: #f6f9fc;
        padding-top: 80px;
        padding-left: 0px !important;
    }

    @media only screen and (min-width: 960px) {
        .content {
            margin-left: 273px;
        }
    }
    
    @media only screen and (max-width: 960px) {
        .content {
            padding-left: 30px !important;
        }
    }    

    .darkerbg {
        background-color: #cccccc;
    }
</style>
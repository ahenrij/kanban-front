<template>
    <div>
        <h2>{{ title }}</h2>

        <div uk-grid>
            <div class="uk-width-2-3@s">
                <!--input search here ?-->
            </div>
            <div class="uk-width-1-3@s">
                <bouton title="Nouvelle équipe" class="uk-float-right" @onClicked="add" primary/>
            </div>
        </div>

        <div class="uk-margin-top">

        </div>
    </div>
</template>
<script>

import Bouton from '@/components/utils/Bouton.vue'

export default {
    data() {
        return {
            title: this.$route.meta.title,
            stateProperty: 'teams',
            baseUrl: '/api/team',
            teams: [],
            modalName: 'modal-team-edit',
            team: null
        }
    },

    methods: {

        add: function() {

        }
    },

    components: {
        Bouton
    }
}
</script>
<style scoped>

</style>
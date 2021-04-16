<template>
    <div>
        <h2>{{ title }}</h2>

        <div uk-grid>
            <div class="uk-width-2-3@s">
                <!--input search here ?-->
            </div>
            <div class="uk-width-1-3@s">
                <button class="uk-button uk-button-primary uk-float-right">Nouveau tableau</button>
            </div>
        </div>

        <notifications style="margin-right: 20px !important; margin-top: 150px  !important" group="data" />

        <!--main content-->
        <board-list :boards="boards" title="Tableaux personnels"/>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import BoardList from '@/components/boards/BoardList.vue'

export default {
    
    data() {
        return {
            title: this.$route.meta.title,
            stateProperty: 'boards',
            baseUrl: '/api/board',
            boards: []
        }
    },

    computed: {
        ...mapGetters('data', [
            'loading',
            'get'
        ])
    },

    async mounted() {
        
        if (this.get(this.stateProperty) != null) {
            this.boards = this.get(this.stateProperty)
        }
        this.loadData()
    },

    methods: {

        ...mapActions('data', ['makeRequest']),

        loadData: async function () {
                     
            const payload = {
                requestData: { method: 'get', url: this.baseUrl },
                commit: true,
                stateProperty: this.stateProperty
            }

            let response = await this.makeRequest(payload)
            
            if (!response) {
                this.toast('error', this.title, this.get('loadingError') ? this.get('loadingError') : 'Oops ! Une erreur est survenue')
            } else {
                this.boards =  response.data
            }            
        },

        toast: function(type, title, message) {
            this.$notify({ group: 'data', title: title, type: type, text: message });
        }
    },

    components: {
        BoardList
    }
}
</script>
<style scoped>

</style>
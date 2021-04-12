<template>
    <div>
        <h2>{{ title }}</h2>


        <notifications style="margin-right: 20px !important; margin-top: 150px  !important" group="data" />

        <!--main content-->
        <div class="uk-child-width-1-5@s uk-grid-match" uk-grid>
            <div v-for="board in boards" :key="board.id">
                <board :key="board.id" :board="board" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Board from '@/components/boards/Board.vue'

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
        Board
    }
}
</script>
<style scoped>

</style>
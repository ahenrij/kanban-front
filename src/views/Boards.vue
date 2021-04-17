<template>
    <div>
        <h2>{{ title }}</h2>

        <div uk-grid>
            <div class="uk-width-2-3@s">
                <!--input search here ?-->
            </div>
            <div class="uk-width-1-3@s">
                <bouton title="Nouveau tableau" class="uk-float-right" @onClicked="add" primary/>
            </div>
        </div>

        <board-edit :board="board" :url="baseUrl" @reload="loadData" :title="title" :id="modalName"/>
        <notifications style="margin-right: 20px !important; margin-top: 150px  !important" group="data" />

        <!--main content-->
        <div class="uk-margin-top">
            <h5>{{ title }}</h5>
            <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-6@l uk-grid-match" uk-grid>
                <div v-for="board in boards" :key="board.id">
                    <board :key="board.id" :board="board" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Board from '@/components/boards/Board.vue'
import BoardEdit from '@/components/boards/BoardEdit.vue'
import Bouton from '@/components/utils/Bouton.vue'
import UIkit from 'uikit'
import { mapGetters, mapActions } from 'vuex'


export default {
    
    data() {
        return {
            title: this.$route.meta.title,
            stateProperty: 'boards',
            baseUrl: '/api/board',
            boards: [],
            modalName: 'modal-board-edit',
            board: null
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

        add: function() {
            this.board = null
            UIkit.modal('#'+this.modalName).show()
        },

        toast: function(type, title, message) {
            this.$notify({ group: 'data', title: title, type: type, text: message });
        }
    },

    components: {
        Board, BoardEdit, Bouton
    }
}
</script>
<style scoped>

</style>
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

        <notifications style="margin-right: 20px !important; margin-top: 150px  !important" group="data" />

        <!--main content-->
        <div class="uk-margin-top">
            <div>Board's content</div>
        </div>
    </div>
</template>
<script>
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

        open: function(board) {
            alert('Open board ' + board.title)
        },

        add: function() {
            this.board = null
            UIkit.modal('#'+this.modalName).show()
        },

        edit: async function (id) {
            var board = this.getBoard(id)
            if (board) {
                this.board = board
                UIkit.modal('#'+this.modalName).show()
            }
        },

        remove: async function (id) {
            var board = this.getBoard(id)
            var self = this
            UIkit.modal.confirm('<h3>' + board.title + '</h3> Ce tableau est susceptible de contenir des informations importantes qui seront supprimées. Êtes-vous sûr de vouloir le supprimer ?', { labels: { cancel: 'Annuler', ok: 'Oui, supprimer' } })
            .then(async function() {

                const payload = {
                    requestData: {method: 'delete', url: self.baseUrl + '/' + board.id, data: null },
                    commit: false,
                }
                let response = await self.makeRequest(payload)
                if (!response) {
                    self.toast('error', self.title, self.get('loadingError') ? self.get('loadingError') : 'Oops ! Une erreur est survenue')
                } else {
                    self.loadData()
                    self.toast('success', self.title, 'Opération effectuée avec succès !')
                }
            }, function () { })
        },

        getBoard: function(id) {
            return this.boards.find(function(board) {
                return board.id === id
            })
        },

        toast: function(type, title, message) {
            this.$notify({ group: 'data', title: title, type: type, text: message });
        }
    },

    components: {
       Bouton
    }
}
</script>
<style scoped>

</style>
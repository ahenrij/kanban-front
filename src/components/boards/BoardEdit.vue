<template>
    <div uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <p class="uk-text-lead">{{ formTitle }} <span :uk-icon="'icon: ' + visibilityIcon + '; ratio: 1'"></span></p>
            <div>
                <form action="#!">

                    <div uk-grid>
                        <div class="uk-width-1-1@s">
                            <edit-text title="Titre" name="title" icon="tag" type="text" v-on:input="resetErrors()" 
                            :error="formData.title.error" v-model="formData.title.value" required></edit-text>

                            <text-area title="Description" name="title" type="text" v-on:input="resetErrors()" 
                            :error="formData.description.error" v-model="formData.description.value" :rows="3" :max="500"></text-area>
                        </div>
                    </div>

                    <br>
                    <div class="uk-margin-small-top" uk-grid>
                        <div class="uk-width-1-1@s">
                            <v-swatches v-model="formData.color.value" popover-x="right"></v-swatches>
                        </div>
                    </div>

                    <div class="uk-margin-top" uk-grid>
                        <div class="uk-width-1-1@s">
                            <label>
                                <input class="uk-checkbox" type="checkbox" v-model="formData.private.value"> 
                                &nbsp;
                                <span class="uk-text-small uk-margin-small-left uk-margin-small-right">Privé?</span>
                            </label>
                        </div>
                    </div>

                    <br>

                </form>
            </div>
            <p class="uk-text-right">
                <button class="uk-button uk-button-default uk-margin-small-right uk-modal-close" type="button">Annuler</button>
                <bouton :title="(board == null) ? 'Ajouter' : 'Modifier'" :loading="this.loading" @onClicked="saveBoard($event)" primary/>
            </p>
        </div>
    </div>
</template>

<script>
import Bouton from '@/components/utils/Bouton.vue'
import EditText from '@/components/utils/EditText.vue'
import TextArea from '@/components/utils/TextArea.vue'
import VSwatches from 'vue-swatches'
import { mapGetters, mapActions } from 'vuex'

import 'vue-swatches/dist/vue-swatches.css'

export default {
    
    props: {
        title: String,
        url: String,
        board: {
            type: Object,
            default: null
        }
    },

    data: function() {
        return {
            primaryColor: '#448AFF',
            formData: {
                title: { value: '', error: '' },
                description: { value: '', error: '' },
                color: { value: '#448AFF', error: '' },
                private: { value: false, error: '' }
            }
        }
    },

    computed: {
        ...mapGetters('data', [
            'loading', 'get'
        ]),

        visibilityIcon() {
            return this.formData.private.value ? 'lock' : 'world'
        },

        formTitle() {
            return (this.formData.title.value == '') ? (this.board ? '' : 'Nouveau') : this.formData.title.value
        }
    },

    watch: {
        // eslint-disable-next-line no-unused-vars
        board: function(newBoard, oldBoard) {
            this.setFormData(newBoard)
            this.resetErrors()
            if (!newBoard) {
                this.formData.private.value = false
                this.formData.color.value = this.primaryColor
            }
        }
    },

    methods: {

        ...mapActions('data', [
          'makeRequest'
        ]),

        saveBoard: function(event) {
            event.preventDefault()

            var data = this.getFormData()
            console.log(data)
        
            if (this.isValid(data)) {
                let id = (this.board) ? this.board.id : 0
                data.id = id
                this.postData(data, id)
            }
        },

        postData: async function (data, id = 0) {

            var payload = {
                requestData: { method: (id > 0) ? 'put' : 'post', url: this.url, data: data },
                commit: false,
            }

            console.log(payload)

            // eslint-disable-next-line no-unreachable
            let response = await this.makeRequest(payload)

            if (!response) {
                this.toast('error', this.title, this.get('loadingError') ? this.get('loadingError') : 'Oops ! Une erreur est survenue')
            } else {
                //this.resetErrors()
                this.$emit('reload')
                this.toast('success', this.title, 'Opération effectuée avec succès !')

                if (id <= 0) { //Clear form only on add
                    this.setFormData(null)
                    this.formData.private.value = false
                    this.formData.color.value = this.primaryColor
                }
            }    
        },

        isValid: function (data) {

            let valid = true

            if (data.title === '') {
                this.formData.title.error = 'Champ obligatoire'
                valid = false
            }

            return valid
        },

        resetErrors: function() {
            // eslint-disable-next-line no-unused-vars
            for (const [_, value] of Object.entries(this.formData)) {
                value.error = ''
            }
        },

        setFormData: function(data) {
            
            for (const [index, value] of Object.entries(this.formData)) {
                value.value = (data) ? data[index] : ''
            }
        },

        getFormData: function () {
            let data  = new Object()
            for (const [index, value] of Object.entries(this.formData)) {
                data[index] = value.value
            }

            return data
        },

        toast: function(type, title, message) {
            this.$notify({ group: 'data', title: title, type: type, text: message });
        }
    },
    components: { Bouton, EditText, TextArea, VSwatches}
}
</script>
<style scoped>
    * {
        font-family: 'Montserrat';
    }
</style>
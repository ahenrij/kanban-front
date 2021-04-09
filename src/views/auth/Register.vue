<template>
    <div class="main uk-margin-large-left uk-margin-large-right">

        <div>
            <!--Header-->
            <span class="uk-text-lead">Créez un compte</span><br>
            <span class="uk-text-light">Et commencez avec votre premier tableau kanban pour votre <br>projet ou vos tâches.</span>
            <notifications style="margin-right: 20px !important; margin-top: 150px  !important" group="auth" />
            <hr class="uk-width-3-3">

            <!--Form-->
            <form>
                
                <div v-if="step==1">
                    <div class="uk-width-3-3">
                        <edit-text :error="formData.lastName.error" v-model="formData.lastName.value" v-on:input="resetErrors()" title="Nom" icon="user" type="text" required/>
                    </div>
                    <div class="uk-width-3-3">
                        <edit-text :error="formData.firstName.error" v-model="formData.firstName.value" v-on:input="resetErrors()" title="Prénom(s)" icon="user" type="text" required/>
                    </div>
                    <div class="uk-width-3-3">
                        <edit-text :error="formData.email.error" v-model="formData.email.value" v-on:input="resetErrors()" title="Email" icon="mail" type="email" required/>
                    </div>
                </div>

                <div v-if="step==2">
                    <a class="uk-text-small link" v-on:click="goToStep(1)">
                        <span uk-icon="icon: arrow-left"></span>Retour</a>
                    <div class="uk-width-3-3 uk-margin-top">
                        <edit-text :error="formData.password.error" v-model="formData.password.value" v-on:input="resetErrors()" title="Mot de passe" icon="lock" type="password" required/>
                    </div>
                    <div class="uk-width-3-3">
                        <edit-text :error="formData.confirmation.error" v-model="formData.confirmation.value" v-on:input="resetErrors()" title="Confirmation" icon="lock" type="password" required/>
                    </div>
                </div>
                

                <div class="uk-width-3-3">
                    <small class="uk-text-light uk-text-small">
                        Vous êtes déjà inscrit ? <router-link to="/login">Connectez-vous</router-link><br>
                        </small>
                    </div>
                <div class="uk-width-3-3 uk-margin-small-top">
                    <bouton style="width: 100%" v-on:onClicked="handleSubmit($event)" :loading="this.authenticating" :title="btnContinueTitle" primary/>
                </div>
               
            </form>
        </div>
    </div>
</template>

<script>
import EditText from '@/components/utils/EditText.vue'
import Bouton from '@/components/utils/Bouton.vue'
import * as EmailValidator from 'email-validator'
import { mapGetters, mapActions } from 'vuex'

export default {
    data: function () {
        return {
            step: 1,
            title: 'Inscription',
            btnContinueTitle: 'Continuer',
            formData: {
                lastName: { value: '', error: '' },
                firstName: { value: '', error: '' },
                email: { value: '', error: '' },
                password: { value: '', error: '' },
                confirmation: { value: '', error: '' }
            }
        }
    },

    computed: {
        ...mapGetters('auth', [
            'authenticating',
            'authError',
            'authErrorCode'
        ])
    },

    methods: {

        ...mapActions('auth', [
            'register'
        ]),

        async handleSubmit(event) {
            event.preventDefault()

            let data = this.getFormData()
            if (!this.validateStep(this.step, data)) {
                return
            }
            if (this.step == 1) {
                this.goToStep(2)
            } else if (this.step == 2) {
                delete data.confirmation
                const isRegistered = await this.register(data)
                if(isRegistered) {
                    this.toast('success', this.title, 'Votre compte a été créé avec succès !')
                } else {
                    this.toast('error', this.title, 'Oops ! Une erreur est survenue')
                }
            }
        },
        
        goToStep(step) {
            switch (step) {
                case 1:
                    this.step=1
                    this.btnContinueTitle = 'Continuer'
                    break
                case 2:
                    this.step=2
                    this.btnContinueTitle = 'S\'inscrire'
                    break
            }
        },

        validateStep(step, data) {
            let valid = true
            switch (step) {
                case 1:

                    if (data.lastName === '') {
                        this.formData.lastName.error = 'Champ obligatoire'
                        valid = false
                    }

                    if (data.firstName === '') {
                        this.formData.firstName.error = 'Champ obligatoire'
                        valid = false
                    }

                    if (data.email === '') {
                        this.formData.email.error = 'Champ obligatoire'
                        valid = false
                    } else if (!this.validEmail(data.email)) {
                        this.formData.email.error = 'Email invalide'
                        valid = false
                    }
                    break
                case 2:
                    
                    if (data.password === '') {
                        this.formData.password.error = 'Champ obligatoire'
                        valid = false
                    }

                    if (data.confirmation === '') {
                        this.formData.confirmation.error = 'Champ obligatoire'
                        valid = false
                    }

                    if (data.password !== data.confirmation) {
                        this.formData.confirmation.error = 'Mot de passe non identique'
                        valid = false
                    }

                    break
                default:
                    valid = false
            }
            return valid
        },

        validEmail(email) {
            return EmailValidator.validate(email);
        },

        getFormData() {
            let data  = new Object()
            for (const [index, value] of Object.entries(this.formData)) {
                data[index] = value.value
            }

            return data
        },

        toast: function(type, title, message) {
            this.$notify({ group: 'auth', title: title, type: type, text: message });
        },

        resetErrors: function() {
            // eslint-disable-next-line no-unused-vars
            for (const [_, value] of Object.entries(this.formData)) {
                value.error = ''
            }
        },
    },
    components: { EditText, Bouton }
}
</script>

<style scoped>

    .main {
        text-align: left;
    }
</style>
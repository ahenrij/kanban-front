<template>
    <div class="main uk-margin-large-left uk-margin-large-right">

        <div>
            <!--Header-->
            <span class="uk-text-lead">Connectez-vous</span><br>
            <span class="uk-text-light">Pour accéder à votre tableau de bord de gestion <br>de trésorerie</span>
            <notifications style="margin-right: 20px !important; margin-top: 150px  !important" group="auth" />
            <hr class="uk-width-3-3">

            <!--Form-->
            <form>
                <div class="uk-width-3-3">
                <edit-text :error="email.error" title="Email" v-on:input="resetErrors()" v-model="email.value" icon="mail" type="email" required></edit-text>
                </div>
                <div class="uk-width-3-3">
                <edit-text :error="password.error" title="Mot de passe" v-on:input="resetErrors()" v-model="password.value" icon="lock" type="password" required></edit-text>
                </div>
                <div class="uk-width-3-3">
                <small class="uk-text-light uk-text-small">
                    Pas encore inscrit ? <router-link to="/register">Créez un compte</router-link>
                    </small>
                </div>
                <div class="uk-width-3-3 uk-margin-small-top">
                    <bouton style="width: 100%" title="Se connecter" v-on:onClicked="handleSubmit($event)" :loading="this.authenticating" primary></bouton>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import EditText from '@/components/utils/EditText.vue'
import Bouton from '@/components/utils/Bouton.vue'
import * as EmailValidator from 'email-validator'
import { mapGetters, mapActions } from "vuex";

export default {

    data: function () {
        return {
            email: { value: '', error: '' },
            password: { value: '', error: '' }
        }
    },

    computed: {
      ...mapGetters('auth', [
          'authenticating',
          'authenticationError',
          'authenticationErrorCode'
      ])
    },

    methods: {
        
        ...mapActions('auth', [
          'login'
        ]),

        handleSubmit: async function(event) {
            event.preventDefault()
            
            let credentials = new Object()
            credentials.email = this.email.value
            credentials.password = this.password.value

            if (this.isValid(credentials)) {

                let response = await this.login(credentials)

                if (!response) {
                    this.$notify({
                        group: 'auth',
                        title: 'Connexion',
                        type: 'error',
                        text: this.authenticationError
                    });
                } else {
                    console.log("connected !")
                }
            }
        },

        isValid: function (credentials) {

            let valid = true

            if (credentials.email === '') {
                this.email.error = 'Veuillez renseigner votre email'
                valid = false
            } else if (!this.validEmail(credentials.email)) {
                this.email.error = 'Email invalide'
                valid = false
            }

            if (credentials.password === '') {
                this.password.error = 'Veuillez renseigner votre mot de passe'
                valid = false
            }

            return valid
        },

        validEmail: function (email) {
            return EmailValidator.validate(email);
        },

        resetErrors: function() {
            this.email.error = ''
            this.password.error = ''
        }
    },
    components: { EditText, Bouton }
}
</script>

<style scoped>
    .main {
        text-align: left;
    }

    .notif {
        margin-top: 80px !important;
    }
</style>
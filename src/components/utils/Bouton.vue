<template>
    <button v-on:click="emitAction($event)" :class="[{ 'uk-button': isActive, 'uk-button-primary': primary, 'uk-button-default': !primary }]">
        
        <div v-if="loading" uk-spinner="ratio: .7" style="top: -15px !important"></div>
        <span v-else>
            {{ title }}
            <span :uk-icon="'icon: ' + icon + '; ratio: 0.8'" class="uk-margin-small-left"></span>
        </span>

    </button>
</template>

<script>
export default {
    props: {
        title: String,
        primary: Boolean,
        icon: String,
        loading: {
            type: Boolean,
            defaultsTo: true,
        }
    },
    data:  function() {
        return {
            isActive: true,
        };
    },
    methods: {
        emitAction: function(event) {
            this.$emit('onClicked', event);
        }
    }
}
</script>

<style scoped>
   
</style>
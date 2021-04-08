<template>
    <router-link :to="to" :class="[{ 'uk-button': isActive, 'uk-button-primary': primary, 'uk-button-default': !primary }]">
        {{ title }}
    </router-link>
</template>

<script>
export default {
    props: {
        title: String,
        primary: Boolean,
        to: String,
    },
    data:  function() {
        return {
            isActive: true,
        };
    }
}
</script>

<style scoped>
    
</style>
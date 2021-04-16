<template>
    <div class="uk-card uk-card-default uk-card-body" :style="{'--bg-color-hover': board.color }">

        <h4 class="uk-card-title uk-margin-small-bottom">{{ board.title }}</h4>

        <div class="subtitle">
            <span :uk-icon="'icon: ' + visibility_icon + '; ratio: .8'"></span>
            <span class="uk-text-small uk-margin-small-left">{{ visibility }}</span>
        </div>

        <br><br><br><br>
        
        <div class="subtitle">
            <a href="" uk-icon="icon: pencil; ratio:1.1" class="uk-float-right" style="cursor: pointer"></a>
            <a href="" uk-icon="icon: trash; ration:1.1" class="uk-float-right" style="cursor: pointer"></a>
        </div>

    </div>
</template>
<script>
export default {
    
    props: {
        board: Object
    },

    computed: {

        visibility() {
            return this.board.private ? 'privé' : 'public'
        },

        visibility_icon() {
            return this.board.private ? 'lock' : 'world'
        }
    }
}
</script>
<style scoped>

    .uk-card:hover > * {
        color: white !important;
    }

    .uk-card:hover {
        background-color: var(--bg-color-hover);
        transition: background-color .5s ease;
        cursor: pointer;
    }

    .uk-card {
        border-radius: 6px;
    }

    .uk-card-title {
        font-size: 1.3em;
    }
</style>
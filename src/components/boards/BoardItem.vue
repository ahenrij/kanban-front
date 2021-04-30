<template>
    <div @click="$emit('onClicked')" class="uk-card uk-card-default uk-card-body" :style="{'--bg-color-hover': board.color }">


        <h4 class="uk-card-title uk-margin-small-bottom" :title="board.title">{{ board.title.length > 17 ? board.title.substring(0, 13) + '...' : board.title  }}</h4>

        <div class="subtitle">
            <span :uk-icon="'icon: ' + visibility_icon + '; ratio: .8'"></span>
            <span class="uk-text-small uk-margin-small-left">{{ visibility }}</span>
        </div>

        <span uk-icon="icon: bookmark; ratio: 1.5" class="uk-position-top-right bookmark" :style="{'--color': board.color }"></span>

        <br><br><br><br><br><br>
        
        <div class="subtitle">
            <span uk-icon="icon: pencil; ratio:1.1" class="uk-float-right" @click="edit($event, board.id)"></span>
            <span href="#" uk-icon="icon: trash; ration:1.1" class="uk-float-right" @click="remove($event, board.id)"></span>
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
    },

    methods: {

        edit(event, id) {
            event.stopPropagation()
            this.$emit('edit', id)
        },

        remove(event, id) {
            event.stopPropagation()
            this.$emit('remove', id)
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
        padding: 26px;
    }

    .uk-card-title {
        font-size: 1.3em;
    }

    .bookmark {
        margin-right: 10px;
        margin-top: -1.8px;
        color: var(--color);
    }
</style>
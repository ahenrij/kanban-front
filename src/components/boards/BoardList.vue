<template>
    <div class="uk-margin-top">
        <h5>{{ title }}</h5>
        <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-6@l uk-grid-match" uk-grid>
            <div v-for="board in boards" :key="board.id">
                <board :key="board.id" :board="board" />
            </div>
        </div>
    </div>
</template>

<script>
import Board from '@/components/boards/Board.vue'

export default {
    props: {
        title: String,
        boards: Array
    },
    data() {
        return {}
    },
    components: {
        Board
    }
}
</script>
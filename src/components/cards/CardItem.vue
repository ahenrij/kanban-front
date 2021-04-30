<template>
    <div class="uk-card uk-card-default uk-card-body card">
        <span v-for="tag in card.tags" :key="tag.id" class="uk-label tag"
        :style="{ backgroundColor: tag.color }" :title="tag.name"></span>

        <p>{{ card.label }}</p>
        
        <span uk-icon="icon: list; ratio: .9" style="cursor: pointer" class="uk-margin-small-right"></span>
        <span class="uk-label">
            <span uk-icon="icon: clock; ratio: .5" style="margin-right: 2px"></span>
            {{ timestampToDate(card.deadline) }}
        </span>
        <span v-for="assignee in card.assignees" :key="assignee.id" class="uk-float-right uk-text-bold assignee"
            :title="assignee.firstName + ' ' + assignee.lastName">
            {{ getInitials(assignee.firstName + ' ' + assignee.lastName) }}
        </span>
    </div>
</template>
<script>
import { timestampToDate, getInitials } from "@/utils/helpers";

export default {
    props: {
        card: Object
    },

    methods: {
        timestampToDate: function(ts) {
            return timestampToDate(ts)
        },

        getInitials: function(name) {
            return getInitials(name)
        },
    }
}
</script>
<style scoped>
    .uk-label {
        border-radius: 3px;
        font-size: 10px;
        padding-top: 2px;
        padding-bottom: 1px;
    }

    .card {
        padding: 25px;
        border-radius: 5px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .tag {
        height: 4px;
        margin-right: 8px;
        width: 15px;
        cursor: pointer;
    }

    .assignee {
        font-size: 14px;
        display: inline-block;
        height: 20px;
        width: 20px;
        padding: 10px;

        background-color: #e0e0e0;
        border-radius: 50%;

        margin-top: -8px;
        margin-left: 3px;

        text-align: center;
        cursor: pointer;
    }
</style>
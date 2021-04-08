<template>
    <div class="uk-margin">
        <label v-if="title != ''" class="uk-text-small uk-text-light" :for="id">{{ title }}</label>
        <br v-if="title != ''">
        <div class="uk-inline input" :class="{ 'input-label': title!='' }" style="width: 100%">
            <span class="uk-form-icon" :uk-icon="'icon: ' + icon"></span>
            <input :id="id" :ref="id" class="uk-input" :class="{ 'uk-form-danger': (error !== '') }" :value="value" v-on:input="$emit('input', $event.target.value)" :name="name" :type="type" :required="required">
        </div>
        <small v-if="error !== ''" class="uk-text-danger">{{ error }}</small>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        title: { type: String, default: '' },
        name: String,
        icon: String,
        type: String,
        value: [String, Number, Boolean, Date],
        required: Boolean,
        error: { type: String, default: '' },
    },
    data:  function() {
        return {
            isActive: true,
        };
    },
    methods: {
    }
}
</script>

<style scoped>
    .input {
        font-size: .9em;
    }
    .input-label {
        margin-top:  5px;
    }
</style>
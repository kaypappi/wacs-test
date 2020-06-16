<template>
    <div>
        <b-dropdown  dropleft variant="link" toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
                <svg class="icon dropdown-toggle">
                    <use :xlink:href="'/assets/images/' + iconName"></use>
                </svg>
            </template>
            <template v-for="(option, index) in options">
                <div :key="index" :class="option.class">
                    <b-dropdown-item-button v-if="option.shouldRender" :key="index" @click="option.handler">
                    <img :src="'/assets/images/' + option.icon">{{option.name}}
                </b-dropdown-item-button>
                </div>
            </template>
        </b-dropdown>
    </div>
</template>
<script>
    // the options prop is an array of objects
    // each object contains name and handler property
    // and shouldRender property is a boolean to tell if to render a particular menu
    export default {
        props: {
            'iconName': {
                type: String,
                default: 'sprite.svg#vertical-ellipsis',
            },
            'options': {
                type: Array,
                required: true,
            },
        },
    }
</script>
<template>
    <button type="submit" :class="buttonClass">
        <img src="/assets/images/button-ring-loader.svg" alt="loader" v-show="isLoading" class="button-loader">
        <span v-show="!isLoading">{{name}}</span>
    </button>
</template>

<script>
    export default {
       props: {
           'buttonClass': {
               type: String,
               default: '',
           },
           'name': {
               type: String,
               default: 'Submit',
           },
           'isLoading': {
               type: Boolean,
               default: false,
           }
       },
    }
</script>

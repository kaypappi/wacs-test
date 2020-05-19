<template>
    <button :type="type" @click="onclick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
       props: {
           'onclick': {
               type: Function,
               default: () => {}
           },
           'type':{
               type:String,
               default:"button"
           }
       },

    }
</script>

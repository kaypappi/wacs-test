<template>
    <button @click="onclick">
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
       },
    }
</script>

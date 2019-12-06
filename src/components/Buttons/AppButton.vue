<template>
    <router-link
      class="btn btn-primary"
      :to="to">
        Sign In
    </router-link>
</template>

<script>
    export default {
        name: "AppButton",
        props :{
            primary :{
              required: false,
                type: Boolean,
                default : true
            },
            to: {
                required: false,
                type: Object,
                default (){
                    return {
                        name: 'home'
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
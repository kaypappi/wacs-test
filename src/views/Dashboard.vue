<template>
    <div>
        Dashboard. {{ user.email }}
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Dashboard",
        computed:{
            ...mapGetters({
                user : 'auth/user'
            })
        }
    }
</script>

<style scoped>

</style>
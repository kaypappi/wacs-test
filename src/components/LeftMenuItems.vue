<template>
    <div class="left-menu-items" @click="redirectToHome">
        <img :src="iconPath" :alt="altText">
        <span>{{name}}</span>
    </div>
</template>

<script>
    export default {
        props: {
           'name': String,
           'iconPath': String,
           'to': String,
           'altText': String,
        },
        data() {
            return {
                // img: "/assets/images/"+this.iconPath,
            }
        },
        methods: {
         redirectToHome () {
            this.$router.push(
                {
                path: this.to,
                }
            )
         },
        }
    }
</script>

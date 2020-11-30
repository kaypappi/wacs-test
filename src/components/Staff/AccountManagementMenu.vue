<template>
    <ul>
        <li @click="goTo('/user/account/help')" :class="{'active-loan-menu': currentRoute === '/user/account/help'}">Help</li>
        <li @click="goTo('/user/account/about')" :class="{'active-loan-menu': currentRoute === '/user/account/about'}">Abount</li>
        
    </ul>
</template>

<script>
    export default {
        methods: {
            goTo(location) {
                this.$router.push(
                    {
                        path: location,
                    }
                )
            },
        },
        computed: {
            currentRoute() {
                return this.$route.path;
            },
        }
    }
</script>

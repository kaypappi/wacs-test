<template>
    <ul>
        <li @click="goTo('ippis')" :class="{'active-loan-menu': currentRoute === '/admin/ippis'}">Ippis</li>
        <li @click="goTo('creditors')" :class="{'active-loan-menu': currentRoute === '/admin/creditors'}">Creditors</li>
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

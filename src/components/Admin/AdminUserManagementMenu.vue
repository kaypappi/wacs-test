<template>
    <ul>
        <li @click="goTo('ippis')" :class="{'active-loan-menu': currentRoute === '/admin/ippis'}">IPPIS</li>
        <li @click="goTo('creditors')" :class="{'active-loan-menu': currentRoute === '/admin/creditors'}">Creditors</li>
        <li @click="goTo('company')" :class="{'active-loan-menu': currentRoute === '/admin/company'}">Companies</li>
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

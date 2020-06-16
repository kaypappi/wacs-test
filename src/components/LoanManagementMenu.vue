<template>
    <ul>
        <li @click="goTo('loan-request')" :class="{'active-loan-menu': currentRoute === '/loan-request'}">Loan Request</li>
        <li @click="goTo('loan-offers')" :class="{'active-loan-menu': currentRoute === '/loan-offers'}">Loan Offers</li>
        <li @click="goTo('report')" :class="{'active-loan-menu': currentRoute === '/report'}">Reports</li>
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

<template>
    <ul>
        <li @click="goTo('/creditor/loan-request')" :class="{'active-loan-menu': currentRoute === '/creditor/loan-request'}">Loan Request</li>
        <li @click="goTo('/creditor/loan-offers')" :class="{'active-loan-menu': currentRoute === '/creditor/loan-offers'}">Loan Offers</li>
        <li @click="goTo('/creditor/report')" :class="{'active-loan-menu': currentRoute === '/creditor/report'}">Reports</li>
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

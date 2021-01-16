<template>
    <ul>
        <li @click="goTo('/creditor/report')" :class="{'active-loan-menu': currentRoute === '/creditor/report'}">Repayments</li>
        <li @click="goTo('/creditor/loans')" :class="{'active-loan-menu': currentRoute === '/creditor/loans'}">Loans</li>
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

<template>
     <div class="main">
        <div class="left">
            <img src="/assets/images/WACS.png" class="logo" alt="WACS logo">
            <LeftMenuItems />
        </div>
        <div class="right">
            <Header
              :details="$route.meta"
              :entityName="companyName"
              :userName="fullName"
            />
            <div class="main-body">
                <LoanManagementMenu v-if="currentNameSpace === 'loan'"/>
                <div class="main-body-content">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../Header';
    import LeftMenuItems from '../LeftMenuItems';
    import LoanManagementMenu from '../LoanManagementMenu';
    export default {
        components: {
            Header,
            LeftMenuItems,
            LoanManagementMenu,
        },
        computed: {
            fullName() {
                if(this.$store.getters['auth/authenticated']) {
                    return this.$store.state.auth.user.data.full_name;
                }
                return '';
            },
            companyName() {
                if(this.$store.getters['auth/authenticated']) {
                    return this.$store.state.auth.user.data.profile.company.name;
                }
                return '';
            },
            currentNameSpace() {
                return this.$route.meta.nameSpace;
            },
        },
    }
</script>

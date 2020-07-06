<template>
     <div class="main">
        <div class="left">
            <img @click="$router.push({name:'ippisLoanRequest'})" src="/assets/images/WACS.png" class="logo" alt="WACS logo">
            <LeftMenuItems />
        </div>
        <div class="right">
            <Header
              :details="$route.meta"
              :entityName="companyName"
              :userName="fullName"
              logoutRoute='ippisLogin'
              notificationRoute='ippisNotifications'
            />
            <div class="main-body">
                <!-- <LoanManagementMenu v-if="!$route.meta.parents && currentNameSpace === 'loan'"/> -->
                <div class="main-body-content">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../Header';
    import LeftMenuItems from '../Ipiss/IppisLeftMenuItems';
    //import LoanManagementMenu from '../LoanManagementMenu';
    export default {
        components: {
            Header,
            LeftMenuItems,
            //LoanManagementMenu,
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
                    return this.$store.state.auth.user.data.roles[0].name;
                }
                return '';
            },
            currentNameSpace() {
                return this.$route.meta.nameSpace;
            },
        },
    }
</script>

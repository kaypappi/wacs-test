<template>
     <div class="main">
        <div class="left">
            <img @click="$router.push({name:'adminDashboard'})" src="/assets/images/WACS.png" class="logo" alt="WACS logo">
            <LeftMenuItems />
        </div>
        <div class="right">
            <Header
              :details="$route.meta"
              :entityName="companyName"
              :userName="fullName"
              logoutRoute='Adminlogin'
              notificationRoute='AdminNotifications'
            />
            <div class="main-body">
                <LoanManagementMenu v-if="!$route.meta.parents && currentNameSpace === 'loan'"/>
                <AdminUserManagementMenu v-if="!$route.meta.parents && currentNameSpace === 'users'"/>
                <div class="main-body-content">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../Header';
    import LeftMenuItems from '../Admin/AdminLeftMenuItems';
    import LoanManagementMenu from '../Admin/AdminLoanManagementMenu';
    import AdminUserManagementMenu from '../Admin/AdminUserManagementMenu'
    export default {
        components: {
            Header,
            LeftMenuItems,
            LoanManagementMenu,
            AdminUserManagementMenu
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

<template>
     <div class="main">
        <div class="left">
            <img src="/assets/images/WACS.png" class="logo" alt="WACS logo">
            <LeftMenuItems />
        </div>
        <div class="right">
            <Header
              :title="$route.name"
              :entityName="companyName"
              :userName="fullName"
            />
            <div class="main-body">
                <div class="main-body-content">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../Header';
    import LeftMenuItems from '../LeftMenuItems';
    export default {
        components: {
            Header,
            LeftMenuItems,
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
            }
        },
    }
</script>

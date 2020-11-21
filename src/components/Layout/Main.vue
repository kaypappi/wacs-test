<template>
  <div class="main">
    <div class="left">
      <div class="menu-logo-wrapper">
        <img src="/assets/images/WACS.png" alt="logo" />
        <p>
          WORKERS AGGREGATED
          CREDIT SCHEME
        </p>
      </div>
      <LeftMenuItems />
    </div>
    <div class="right">
      <Header
        :details="$route.meta"
        :entityName="companyName"
        :userName="fullName"
        logoutRoute="login"
        notificationRoute="notifications"
      />
      <div class="main-body">
        <LoanManagementMenu v-if="!$route.meta.parents && currentNameSpace === 'loan'" />
        <div class="main-body-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header";
import LeftMenuItems from "../LeftMenuItems";
import LoanManagementMenu from "../LoanManagementMenu";
export default {
  components: {
    Header,
    LeftMenuItems,
    LoanManagementMenu
  },
  computed: {
    fullName() {
      if (this.$store.getters["Auth/authenticated"]) {
        return this.$store.state.Auth.user.data.full_name;
      }
      return "";
    },
    companyName() {
      if (this.$store.getters["Auth/authenticated"]) {
        return this.$store.state.Auth.user.data.profile.company.name;
      }
      return "";
    },
    currentNameSpace() {
      return this.$route.meta.nameSpace;
    }
  }
};
</script>


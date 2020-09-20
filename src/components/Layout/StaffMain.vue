<template>
  <div class="main">
    <div class="left">
      <img
        @click="$router.push({name:'home'})"
        src="/assets/images/WACS.png"
        class="logo"
        alt="WACS logo"
      />
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
export default {};
</script>

<style>
</style>
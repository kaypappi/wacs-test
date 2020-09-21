<template>
  <div class="staff-left-menu">
    <div v-for="(menu, index) in menus" :key="index" class="left-menu-items" @click="goTo(menu.to)">
      <!-- <img :src="menu.iconPath" :alt="menu.altText" /> -->
      <span>{{menu.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "Home", to: "/user" },
        { name: "Profile", to: "/user/profile" },
        { name: "Notifications", to: "/user/notifications" }
      ]
    };
  },
  methods: {
    goTo(location) {
      this.$router.push({ path: location });
    }
  }
};
</script>

<style scoped>
.left-menu-items {
  padding: 10px 30px;
  color: #697686;
}
.staff-left-menu {
    margin-top: 20px;
}
</style>
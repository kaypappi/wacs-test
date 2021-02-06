<template>
  <div class="staff-left-menu">
    <div v-for="(menu, index) in menus" :key="index" class="left-menu-items" @click="goTo(menu.to)">
     <span class="icon"><b-icon :icon="menu.icon"></b-icon></span>
      <span>{{menu.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "Home", to: "/user" ,icon:"house-door"},
        { name: "Profile", to: "/user/profile" ,icon:"person-circle"},
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
  cursor: pointer;
}
.staff-left-menu {
    margin-top: 20px;
}

.icon{
  margin-right: 20px;
}
</style>
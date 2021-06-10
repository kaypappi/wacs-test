<template>
  <div class="left-menu">
    <div
      v-for="(menu, index) in menus"
      :key="index"
      class="left-menu-items"
      :class="{'active-left-menu': currentNameSpace === menu.nameSpace}"
      @click="goTo(menu.to)"
    >
      <img :src="menu.iconPath" :alt="menu.altText" />
      <span>{{menu.name}}</span>
    </div>
  </div>
</template>

<script>
import { defineAbilities } from "@/services/roles";

export default {
  props: {
    name: String,
    iconPath: String,
    to: String,
    altText: String
  },
  data() {
    return {
      menuItems: [
        {
          name: "Dashboard",
          iconPath: "/assets/images/Money.svg",
          altText: "money",
          to: "/creditor/dashboard",
          permission: ["manage", "loan"],
          nameSpace: "dashboard"
        },
        {
          name: "Loan Management",
          iconPath: "/assets/images/Money.svg",
          altText: "money",
          to: "/creditor/loan-request",
          permission: ["manage", "loan"],
          nameSpace: "loan"
        },
        {
          name: "User Management",
          iconPath: "/assets/images/User.svg",
          altText: "money",
          to: "/creditor/user-setup",
          permission: ["create", "user"],
          nameSpace: "users"
        },
        {
          name: "Report",
          iconPath: "/assets/images/Chart-bar.svg",
          altText: "Chart",
          to: "/creditor/report",
          permission: ["create", "user"],
          nameSpace: "report"
        },
        {
          name: "Upload Deduction",
          iconPath: "/assets/images/Chart-bar.svg",
          altText: "Chart",
          to: "/creditor/deduction",
          permission: ["create", "user"],
          nameSpace: "deduction"
        },
        {
          name: "Upload Details",
          iconPath: "/assets/images/Chart-bar.svg",
          altText: "Chart",
          to: "/creditor/upload-details",
          permission: ["create", "user"],
          nameSpace: "deduction details"
        },
      ]
    };
  },
  methods: {
    goTo(location) {
      this.$router.push({ path: location });
    }
  },
  computed: {
    menus() {
      return this.menuItems.filter(item =>
        this.$can(item.permission[0], item.permission[1])
      );
    },
    currentNameSpace() {
      return this.$route.meta.nameSpace;
    }
  },
  mounted() {
    defineAbilities();
  }
};
</script>

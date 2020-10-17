<template>
  <div id="app" class="staffmain">
    <Push
      :isOpen="!collasped"
      :burgerIcon="collasped"
      :crossIcon="collasped"
      disableEsc
      :disableOutsideClick="!collasped"
      noOverlay
    >
      <img src="/assets/images/WACS.png" class="logo" alt="WACS logo" />
      <div class="divider"></div>
      <div
        v-for="(menu, index) in menus"
        :key="index"
        :class="{'left-menu-items':true,'active-menu': currentNameSpace === menu.nameSpace}"
        @click="goTo(menu.to)"
      >
        <span class="icon">
          <b-icon :icon="menu.icon"></b-icon>
        </span>
        <span>{{menu.name}}</span>
      </div>
      <div @click="logout" class="logout ml-auto">
        <span>Logout</span>
        <span class="ml-2">
          <b-icon icon="box-arrow-right"></b-icon>
        </span>
      </div>
    </Push>

    <div id="page-wrap" class="right">
      <Header :details="$route.meta" />
      <div class="main-body">
        <div class="main-body-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Staff/Header";
import { Push } from "vue-burger-menu";
export default {
  components: {
    Header,
    Push
  },
  data() {
    return {
      menuOpen: true,
      menus: [
        { name: "Home", to: "/user", icon: "house-door", nameSpace: "home" },
        {
          name: "Profile",
          to: "/user/profile",
          icon: "person-circle",
          nameSpace: "profile"
        }
      ],
      collasped: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  methods: {
    goTo(location) {
      this.$router.push({ path: location });
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.collasped = window.innerWidth < 1000 ? true : false;
    },
    logout() {
      this.$store.dispatch("Auth/logout").then(() => {
        this.$router
          .push({
            name: "StaffLogin"
          })
          .catch(() => {});
      });
    }
  },
  computed: {
    currentNameSpace() {
      return this.$route.meta.nameSpace;
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped>
.staffmain {
  display: flex;
  height: 100vh;
  background: white;
}

.staffmain >>> .active-menu{
  color: #27be58;
}

.right {
  width: calc(100vw - 300px);
  padding: 0 30px;
}

img {
  width: 70px;
  height: 70px;
  margin: 30px auto;
  display: flex;
}

.staff-left-menu {
  margin-top: 20px;
}

.icon {
  margin-right: 20px;
}

.staffmain >>> .bm-burger-button {
  position: fixed;
  width: 20px;
  height: 20px;
  left: 20px;
  top: 20px;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #373a47;
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.staffmain >>> .bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: white; /* Black*/
  border-right: 1.5px solid #eaeaea;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 0; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.staffmain >>> .bm-item-list {
  color:#697d69;
  margin-left: 0;
  font-size: 20px;
  position: relative;
  height: 100%;
  overflow-y: hidden;
}

.staffmain >>> .bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0;
}

.staffmain >>> .bm-item-list > * > span {
  margin-left: 0px;
  color: #697d69;
  font-size: 18px;
  font-weight: 400;
}
.staffmain >>> .bm-item-list > .active-menu > span {
  color: #27be58;
}
.staffmain >>> .left-menu-items {
  padding: 10px 30px;
  color: #697686;
  cursor: pointer;
}
.staffmain >>> .divider {
  height: 1.5px;
  width: 90%;
  margin: 0 auto 20px auto;
  background: #eaeaea;
}
.staffmain >>> .logout {
  position: absolute;
  bottom: 20px;
  color: #697686;
  cursor: pointer;
  padding: 0 30px;
}

@media screen and (max-width: 1000px) {
  .right {
    width: 100vw;
  }
  .staffmain {
    overflow-x: hidden;
  }
}
</style>
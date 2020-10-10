<template>
  <div class="main-auth-wrapper">
    <div class="top-menu">
      <div class="top-menu-right">
        <img @click="$router.push('/')" src="/assets/images/WACS.png" alt="logo" />
        <p>
          WORKERS AGGREGATED
          CREDIT SCHEME
        </p>
      </div>
      <span v-if="authType==='login'" class="ml-auto info-text mr-4">Are you a new user?</span>
      <span v-if="authType==='signup'" class="ml-auto info-text mr-4">If you already have an account</span>
      <button @click="goto('signup')" v-if="authType==='login'" class="redirect-btn">Create Account</button>
      <button @click="goto('login')" v-if="authType==='signup'" class="redirect-btn">Login</button>
    </div>
    <div class="content">
      <div class="left-section">
        <img src="/assets/images/WACS-Gif.gif" alt class="img-right" />
      </div>
      <div class="right-section">
        <div class="right-content">
          <Login v-if="authType==='login'" />
          <Signup v-if="authType==='signup'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import Signup from "./SignUp";
export default {
  components: {
    Login,
    Signup
  },
  data() {
    return {
      authType: ""
    };
  },
  methods: {
    goto(path) {
      this.$router.push(`/user/${path}`);
    }
  },
  watch: {
    "$route.path": {
      handler: function(path) {
        const newpath = path.split("/");
        this.authType = newpath[2];
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
.main-auth-wrapper {
  width: 100vw;
  height: 100vh;
  background: white;
}

.main-auth-wrapper .content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
  padding-top: 90px;
  height: 100%;
}
.redirect-btn {
  color: #27be58;
  background-color: white;
  border: 2px solid;
  padding: 5px 20px;
}
.left-section {
  display: flex;
  padding: 30px 0;
}

.img-right {
  min-width: 70%;
}
.right-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-content {
  max-width: 500px;
}

.info-text {
  color: #697686;
  font-size: 14px;
}

.main-auth-wrapper >>> input::-webkit-outer-spin-button,
.main-auth-wrapper >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.main-auth-wrapper >>> input[type=number] {
  -moz-appearance: textfield;
}
</style>
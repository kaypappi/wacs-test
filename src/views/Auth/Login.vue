<template>
  <div class="container">
    <div class="form-wrapper">
      <img src="/assets/images/WACS.png" class="logo" alt="WACS logo" />
      <div class="login-area">
        <p>LOGIN</p>
        <div v-if="loginError" class="error-div">{{loginError}}</div>
        <form @submit.prevent="submit">
          <TextInput
            label="Username"
            id="username"
            name="user_name"
            inputClass="login-form-input"
            labelClass="login-form-label"
            :error="validation.user_name"
            placeholder="Enter Email"
            v-model="form.user_name"
            :keyupEvent="keyupEvent"
          />

          <TextInput
            label="Password"
            id="password"
            name="password"
            type="password"
            inputClass="login-form-input"
            labelClass="login-form-label"
            :error="validation.password"
            placeholder="Enter password"
            classes="form-control"
            v-model="form.password"
            :keyupEvent="keyupEvent"
          />
          <SubmitButton name="Enter" :isLoading="isLoading" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "../../components/Inputs/TextInput";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    TextInput,
    SubmitButton
  },
  data() {
    return {
      form: {
        user_name: "",
        password: "",
        device: navigator.platform
      }
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "Auth/authenticated",
      user: "Auth/user",
      isLoading: "Auth/isLoading",
      validation: "getValidationError",
      loginError: "Auth/loginError"
    })
  },
  methods: {
    ...mapActions({
      signIn: "Auth/signIn",
      clearOneError: "clearOneValidationError"
    }),
    submit() {
      this.signIn({credentials:this.form, userType:'creditor'})
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        })
        .catch(() => {
        });
    },
    keyupEvent(name) {
      if (this.validation[name]) {
        this.clearOneError(name);
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url("/assets/images/login-background.png");
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
}

.form-wrapper {
  width: 408px;
  height: 100%;
  margin: 0 auto;
  padding: 86px 0 86px 0;
}

.form-wrapper .logo {
  height: 82px;
  width: 78px;
  margin: 0 165px 41px 165px;
}

.form-wrapper .login-area {
  min-height: 370px;
  padding: 35px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 20px 0 rgba(97, 97, 97, 0.5);
}

.form-wrapper .login-area > p {
  margin: 0 138px 12px 138px;
  height: 24px;
  width: 62px;
  color: #333333;
  font-size: 20px;
  line-height: 24px;
}

.form-wrapper .login-area input::-webkit-input-placeholder {
  height: 16px;
  width: 106px;
  color: #9d9d9d;
  font-size: 14.4px;
  font-weight: 300;
  line-height: 16px;
}

.form-wrapper .login-area .password-container span {
  height: 15px;
  width: 40px;
  color: #009831;
  font-family: "Work Sans";
  font-size: 12.4px;
  line-height: 15px;
  position: relative;
  top: -33px;
  left: 282px;
}

.form-wrapper .login-area button {
  height: 50px;
  width: 338px;
  margin: 31px 0 0 0;
  background-color: #27be58;
  border: none;
  color: #ffffff;
  font-family: "Work Sans";
  font-size: 20.6px;
  line-height: 24px;
}
</style>
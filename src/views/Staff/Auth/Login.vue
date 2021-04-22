<template>
  <div class="login-wrapper">
    <div class="top-text h3">Sign In</div>
    <div v-if="loginError" class="error-div">{{loginError}}</div>
    <form @submit.prevent="submit">
      <TextInput
        type="number"
        :max="7"
        label="Ippis Number"
        id="username"
        name="user_name"
        inputClass="input-field"
        placeholder="Enter Ippis Number"
        v-model="form.ippis_number"
        :error="validation.ippis_number"
        :keyupEvent="keyupEvent"
      />

      <TextInput
        type="password"
        label="Password"
        id="password"
        name="password"
        inputClass="input-field"
        :error="validation.password"
        placeholder="Enter Password"
        v-model="form.password"
        :keyupEvent="keyupEvent"
      />
      <SubmitButton :isLoading="isLoading" name="Login" buttonClass="submit-btn" />
      <p @click="goTo" class="forgot-password ">Forgot Password</p>
    </form>
  </div>
</template>

<script>
import TextInput from "../../../components/Inputs/TextInput";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TextInput,
    SubmitButton
  },
  data() {
    return {
      form: {
        ippis_number: "",
        password: ""
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
      this.signIn({ credentials: this.form, userType: "user" })
        .then(() => {
          this.$router.replace({
            name: "staffDashboard"
          });
        })
        .catch(() => {});
    },
    goTo() {
      this.$router.push({ name: "forgotPassword" });
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
.login-wrapper >>> .long-text-input {
  width: 100%;
  margin-bottom: 30px;
}

.login-wrapper >>> .input-field {
  width: 100%;
  background-color: #f4f4f4;
  padding: 10px;
  border: none;
}

.submit-btn {
  border: none;
  background: #27be58;
  color: white;
  width: 100%;
  padding: 10px;
  height: 50px;
  margin-top: 20px;
}

.forgot-password {
  text-align: center;
  color: #27be58;
  font-weight: 500;
  margin: 10px 0;
  cursor: pointer;
}
.top-text {
  margin-bottom: 50px;
  color: #8598a6;
}
</style>
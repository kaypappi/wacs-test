<template>
  <div class="login-wrapper">
    <div class="top-text h3">Create Your WACS Account</div>
    <div v-if="loginError" class="error-div">{{loginError}}</div>
    <form @submit.prevent="submit">
      <TextInput
        type="number"
        label="What is your Ippis number"
        id="ippis_number"
        name="ippis_number"
        inputClass="input-field"
        placeholder="Enter Ippis Number"
        v-model="form.ippis_number"
        :error="validation.ippis_number"
        :keyupEvent="keyupEvent"
        :required="false"
      />
      <TextInput
        type="number"
        label="What is your BVN"
        id="bvn"
        name="bvn"
        inputClass="input-field"
        placeholder="Enter your BVN"
        v-model="form.bvn"
        :error="validation.bvn"
        :keyupEvent="keyupEvent"
        :required="false"
      />
      <TextInput
        type="email"
        label="What is your email ID"
        id="email"
        name="email"
        inputClass="input-field"
        placeholder="Enter your email"
        v-model="form.email"
        :error="validation.email"
        :keyupEvent="keyupEvent"
        :required="false"
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
        :required="false"
      />
      <SubmitButton :isLoading="isLoading" name="Next" buttonClass="submit-btn" />
    </form>
  </div>
</template>

<script>
import TextInput from "../../../../components/Inputs/TextInput";
import SubmitButton from "../../../../components/Buttons/SubmitButton";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    next: Function
  },
  components: {
    TextInput,
    SubmitButton
  },
  data() {
    return {
      form: {
        user_name: "",
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
      this.next();
      /* this.signIn({ credentials: this.form, userType: "user" })
        .then(() => {
          this.$router.replace({
            name: "staffDashboard"
          });
        })
        .catch(() => {}); */
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
  margin-top: 20px;
}

.forgot-password {
  text-align: center;
  color: #27be58;
  font-weight: 500;
  margin: 10px 0;
}
.top-text {
  margin-bottom: 50px;
  color: #8598a6;
}
</style>
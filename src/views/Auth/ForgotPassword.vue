<template>
  <div class="main-auth-wrapper">
    <Toast
      :show="toast.show"
      :title="toast.title"
      :message="toast.message"
      :success="toast.success"
      v-if="toast.show"
    />
    <div class="top-menu">
      <div class="top-menu-right">
        <img src="/assets/images/WACS.png" alt="logo" />
        <p>
          WORKERS AGGREGATED
          CREDIT SCHEME
        </p>
      </div>
      <!-- <span v-if="authType==='login'" class="ml-auto info-text mr-4">Are you a new user?</span>
      <span v-if="authType==='signup'" class="ml-auto info-text mr-4">If you already have an account</span>
      <button @click="goto('signup')" v-if="authType==='login'" class="redirect-btn">Create Account</button>
      <button @click="goto('login')" v-if="authType==='signup'" class="redirect-btn">Login</button>-->
    </div>
    <div class="content">
      <div class="left-section">
        <img src="/assets/images/WACS-Gif.gif" alt class="img-right" />
      </div>
      <div class="right-section">
        <div class="right-content">
          <div v-if="authType==='forgotPassword'" class="sendEmail">
            <div class="top-text h3">Enter Your Email Below</div>
            <form @submit.prevent="sendEmail">
              <TextInput
                type="email"
                label="Email"
                id="email"
                name="email"
                inputClass="input-field"
                placeholder="Enter Email"
                v-model="emailForm.email"
                :keyupEvent="keyupEvent"
              />
              <SubmitButton name="Submit" buttonClass="submit-btn" />
            </form>
          </div>
          <div v-if="authType==='chnagePassword'" class="sendEmail">
            <div class="top-text h3">Reseet Your Password Below</div>
            <form @submit.prevent="resetPassword">
              <TextInput
                type="email"
                label="Email"
                id="email"
                name="email"
                inputClass="input-field"
                placeholder="Enter Email"
                v-model="resetPasswordForm.email"
                :keyupEvent="keyupEvent"
              />
              <TextInput
                type="password"
                label="Password"
                id="password"
                name="password"
                inputClass="input-field"
                placeholder="Enter Password"
                v-model="resetPasswordForm.password"
                :keyupEvent="keyupEvent"
              />
              <TextInput
                type="password"
                label="Password"
                id="password"
                name="password"
                inputClass="input-field"
                placeholder="Enter Password"
                v-model="resetPasswordForm.confirmPassword"
                :keyupEvent="keyupEvent"
              />
              <SubmitButton name="Next" buttonClass="submit-btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../../components/Buttons/SubmitButton";
import TextInput from "../../components/Inputs/TextInput";
import Toast from "../../components/Toast";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    SubmitButton,
    TextInput,
    Toast
  },
  data() {
    return {
      authType: "",
      token: null,
      emailForm: {
        email: ""
      },
      resetPasswordForm: {
        email: "",
        token: "",
        password: "",
        confirmPassword: ""
      },
      toast: {
        show: false,
        title: "",
        message: "",
        success: true
      }
    };
  },
  methods: {
    ...mapActions({
      sendResetPasswordEmail: "Auth/sendResetPasswordEmail",
      sendresetPassword: "Auth/resetPassword"
    }),
    async sendEmail() {
      const response = await this.sendResetPasswordEmail(this.emailForm);
      this.showToast("Info", response.data.message, true);
    },
    resetPassword() {
      this.sendresetPassword(this.resetPasswordForm).then(response => {
        this.showToast("Success", response.data.message, true);
      });
    },
    showToast(title, message, success) {
      this.toast = { show: true, title, message, success };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
    keyupEvent(name) {
      if (this.validation[name]) {
        this.clearOneError(name);
      }
    }
  },
  computed: {
    ...mapGetters({
      sendingPasswordResetEmail: "Auth/sendingPasswordResetEmail",
       validation: "getValidationError",
    })
  },
  watch: {
    "$route.params": {
      handler: function(params) {
        if (params.token && params.email) {
          this.authType = "changePassword";
          this.resetPasswordForm.token = params.token;
          this.resetPasswordForm.email = params.email;
          return;
        }
        return (this.authType = "forgotPassword");
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

.main-auth-wrapper >>> .long-text-input {
  width: 100%;
  margin-bottom: 30px;
}

.main-auth-wrapper >>> .input-field {
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
.top-text {
  margin-bottom: 50px;
  color: #8598a6;
}
</style>
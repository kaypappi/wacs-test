<template>
  <div class="verify-wrapper">
    <Toast
      :show="toast.show"
      :title="toast.title"
      :message="toast.message"
      :success="toast.success"
      v-if="toast.show"
    />
    <template v-if="!validatingCode">
      <div class="top-text h3">Verify Your Phone Number</div>
      <p class="info-text">Please enter the OTP (One Time Password) sent to</p>
      <p class="phone-number">{{userShortData.mobile_number}}</p>
      <div class="otp-code">
        <div style="display: flex; flex-direction: row;">
          <OtpInput
            ref="otpInput"
            input-classes="otp-input"
            separator
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            placeholder="0000"
            @on-complete="handleOnComplete"
          />
        </div>
      </div>
      <p class="resend-otp">
        Don’t receive the OTP?
        <span @click="resetToken" class="green-text">Resend OTP</span>
      </p>
    </template>
    <template v-else>
      <div class="top-text h3">Just a moment</div>
      <p class="scanning">Scanning your details</p>
      <div class="animated-gradient"></div>

      <p class="footnote">This will only take a few seconds</p>
    </template>
  </div>
</template>

<script>
//import TextInput from "../../../../components/Inputs/TextInput";
import OtpInput from "@bachdgvn/vue-otp-input";
import Toast from "../../../../components/Toast";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    next: Function
  },
  components: {
    //TextInput,
    OtpInput,
    Toast
  },
  data() {
    return {
      form: {
        mobile_code: ""
      },
      toast: {
        show: false,
        title: "",
        message: "",
        success: true
      },
      is_verifying: false
    };
  },
  methods: {
    ...mapActions({
      validateCode: "UserAuth/ValidateCode",
      resendToken: "UserAuth/ResendToken"
    }),
    handleOnComplete(value) {
      this.form.mobile_code = value;
      this.form.ippis_number = this.userShortData.ippis_number;
      this.validateCode(this.form).then(() => {
        this.next();
      }).catch(()=>{
          this.showToast("Error",this.validation.mobile_code[0],false)
      })
    },
    handleOnChange(value) {
      this.form.mobile_code = value;
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },
    showToast(title, message, success) {
      this.toast = { show: true, title, message, success };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
    resetToken() {
      const form = { ippis_number: this.userShortData.ippis_number };
      this.resendToken(form)
        .then(() => {
          this.showToast(
            "Success",
            "A new token has been sent to your mobile number",
            true
          );
        })
        .catch(e => {
          this.showToast("Error", e, false);
        });
    }
  },
  computed: {
    ...mapGetters({
      userShortData: "UserAuth/userShortData",
      userFullData: "UserAuth/userFullData",
      validatingCode: "UserAuth/validatingCode",
      validation: "getValidationError",
    })
  }
};
</script>

<style scoped>
.verify-wrapper >>> .otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 30px;
  color: #cccccc;
  border: none;
  border-bottom: #cccccc 2px solid;
  text-align: center;
}
.verify-wrapper >>> .otp-input::-webkit-inner-spin-button,
.verify-wrapper >>> .otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.verify-wrapper >>> .otp-input:focus {
  outline: none;
}

p.info-text {
  color: #96adb9;
  margin-bottom: 5px;
}

.phone-number {
  color: #7c8d9c;
  font-size: 18px;
  margin-bottom: 30px;
}

.resend-otp {
  color: #a6a6a6;
  margin-top: 30px;
}

span.green-text {
  color: #27be58;
  cursor: pointer;
}
.top-text {
  color: #8598a6;
}

.animated-gradient {
  border-radius: 50px;
  background: repeating-linear-gradient(
    to right,
    #009831 0%,
    #fbbd5e 50%,
    #009831 100%
  );
  max-width: 320px;
  height: 20px;
  background-size: 200% auto;
  background-position: 0 100%;
  animation: gradient 3s infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.scanning {
  color: #9eb6c1;
  font-size: 18px;
}

.footnote {
  color: #a5bec9;
  font-size: 14px;
  margin-top: 20px;
}
</style>
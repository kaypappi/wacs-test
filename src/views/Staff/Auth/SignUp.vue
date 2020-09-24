<template>
  <div class="signup-section">
    <CreateAccount :next="nextStep" v-if="steps===1" />
    <VerifyCode :next="nextStep" v-if="steps===2" />
    <CompleteCreation v-if="steps===3" />
  </div>
</template>

<script>
import CreateAccount from "./SignupWizard/CreateAccount";
import VerifyCode from "./SignupWizard/VerifyCode";
import CompleteCreation from "./SignupWizard/CompleteCreation";
export default {
  components: {
    CreateAccount,
    VerifyCode,
    CompleteCreation
  },
  data() {
    return {
      steps: 1,
      userData:null
    };
  },
  methods: {
    nextStep() {
      this.steps = this.steps + 1;
    },
  }
};
</script>

<style>
</style>
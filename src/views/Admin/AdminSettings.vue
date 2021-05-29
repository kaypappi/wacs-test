<template>
  <div class="settings-wrapper px-4 py-3">
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="gettingSettings"
      class="page-loader"
    />
    <template v-else>
      <b-form @submit.prevent="submitEligibility" class="d-flex align-items-end">
        <TextInput
          type="text"
          label="Eligibility Criteria"
          id="eligibility-criteria"
          name="eligibility-criteria"
          inputClass="form-modal-inputs"
          labelClass="form-modal-label"
          v-model="eligibility.value"
        />

        <SubmitButton
          :style="{maxWidth:'100px'}"
          buttonClass="form-modal-button ml-5 "
          name="Save"
          :isLoading="submittingEligibility"
        />
      </b-form>
      <b-form @submit.prevent="submitToken" class="d-flex align-items-end">
        <TextInput
          type="text"
          label="Wacs Token"
          id="wacs-token"
          name="wacs-token"
          inputClass="form-modal-inputs"
          labelClass="form-modal-label"
          v-model="wacsToken.value"
        />

        <SubmitButton
          :style="{maxWidth:'100px'}"
          buttonClass="form-modal-button ml-5 "
          name="Save"
          :isLoading="submittingToken"
        />
      </b-form>
    </template>
  </div>
</template>

<script>
import TextInput from "../../components/Inputs/TextInput";
import SubmitButton from "../../components/Buttons/SubmitButton";
export default {
  components: {
    TextInput,
    SubmitButton
  },
  data() {
    return {
      eligibility: {
        value: "",
        name: "eligibility"
      },
      wacsToken: {
        name: "wacs-bridge-token",
        value: ""
      },
      gettingSettings: false,
      submittingEligibility:false,
      submittingToken:false
    };
  },
  methods: {
    async getSettings() {
      this.gettingSettings = true;
      const response = await this.$store.dispatch("AdminSettings/getSettings");
      this.gettingSettings = false;
      this.eligibility.value = response[1].value;
      this.wacsToken.value = response[0].value;
      return response;
    },
   async submitEligibility(){
       this.submittingEligibility=true
       const response= await this.$store.dispatch("AdminSettings/updateSetting",this.eligibility)
       this.submittingEligibility=false
       return response
    },
    async submitToken(){
       this.submittingToken=true
       const response= await this.$store.dispatch("AdminSettings/updateSetting",this.wacsToken)
       this.submittingToken=false
       return response
    }
  },
  computed: {
    settings() {
      return this.$store.state.AdminSettings.settings;
    }
  },
  mounted() {
    this.getSettings();
  }
};
</script>

<style>
</style>
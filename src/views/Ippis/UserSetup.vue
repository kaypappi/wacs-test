<template>
  <div>
    <div class="page-filters">
      <!-- <div class="requests-no"><span v-if="loanOffers.meta">{{loanOffers.meta.total}}</span> Loan Offers</div> -->
      <SearchFilterInput
        placeholder="Search by code,title"
        :value="getSearchTerm()"
        :onSearch="enterSearch"
        @input="handleSearch($event)"
      />

      <div class="cta-div">
        <Button v-b-modal.add-user-form-modal class="cta-button">
          <img src="/assets/images/Plus.svg" alt="Plus sign" />
          Create 3rd Party
        </Button>
      </div>
    </div>
    <CustomModal size="sm" id="add-user-form-modal">
      <div v-if="postSuccess">
        <p class="modal-success-message" >
          You have successfully added
          <b>{{addUser.full_name}}</b> as an admin
        </p>
        <button class="form-modal-button" @click="closeModal">Close</button>
      </div>
      <template v-else>
        <h5 class="form-modal-title">New User</h5>
        <div class="form-modal-title-border"></div>
        <form @submit.prevent="onSubmit">
          <TextInput
            label="Full Name"
            id="name"
            name="full_name"
            :error="error.full_name"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.full_name"
          />
          <TextInput
            label="Username"
            id="username"
            name="user_name"
            :error="error.user_name"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.user_name"
          />
          <TextInput
            type="email"
            label="Email"
            id="email"
            name="email"
            :error="error.email"
            inputClass="form-modal-inputs"
            labelClass="form-modal-label"
            v-model="addUser.email"
          />
          <SubmitButton buttonClass="form-modal-button" :name="`Save`" :isLoading="creatingMiniIppis" />
        </form>
      </template>
    </CustomModal>
  </div>
</template>

<script>
import SearchFilterInput from "../../components/Inputs/SearchFilterInput";
import CustomModal from "../../components/Modals/CustomModal";
import TextInput from "../../components/Inputs/TextInput";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SearchFilterInput,
    CustomModal,
    TextInput,
    SubmitButton
  },
  data() {
    return {
      addUser: {},
      isPosting: false,
      postSuccess:false
    };
  },
  methods: {
    ...mapActions({
      createMiniIppis: "IppisUserMangement/createMiniIppis"
    }),
    getSearchTerm() {},
    handleSearch() {},
    enterSearch() {},
    closeModal(){
      this.postSuccess=false
      this.addUser={}
      this.$bvModal.hide('add-user-form-modal')
    },
    async onSubmit() {
      const response = await this.createMiniIppis(this.addUser);
      this.postSuccess=true
      return response
    }
  },
  computed: {
    ...mapGetters({
      creatingMiniIppis: "IppisUserMangement/creatingMiniIppis"
    }),

    error() {
      return this.$store.state.validation;
    }
  }
};
</script>

<style>
</style>
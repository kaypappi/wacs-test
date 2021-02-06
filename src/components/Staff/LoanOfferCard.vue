<template>
  <div class="card-wrapper">
    <Toast
      :show="Toast.show"
      :title="Toast.title"
      :message="Toast.message"
      :success="Toast.success"
    />
    <div class="card-holder">
    
    <div class="card-left">
      <img :src="loanOffer.company.logo" alt class="company-logo" />
    </div>
    <div class="card-right">
      <p class="offer-title">{{loanOffer.title}}</p>
      <p class="offer-description">{{loanOffer.description}}</p>
      <p class="properties">
        <span class="label">Amount Range:</span>
        <span class="value">{{loanOffer.amount_from}} - {{loanOffer.amount_to}}</span>
      </p>
      <p class="properties">
        <span class="label">Moratorium Period:</span>
        <span
          class="value"
        >{{`${loanOffer.moratorium_period}months | Interest: ${loanOffer.interest_rate}%`}}</span>
      </p>
      <p class="properties d-flex">
        <span class="label">Payback Period:</span>
        <span class="value">{{` ${loanOffer.payback_period}months`}}</span>
        <span @click="handleApply" class="ml-auto apply">
          Apply
          <b-icon icon="arrow-right"></b-icon>
        </span>
      </p>
    </div>
    <CustomModal :id="`${loanOffer.title}confirmOffer`">
      <TaggedInput 
      label="Amount" 
      fieldInfo="Enter loan amount you want"
      placeholder="Enter amount"
      id="amount" 
      name="amount" 
      labelClass="form-modal-label" 
      length="long"
      type="text"
      :required="true"
      :tagLeft="true"
      :tagRight="false"
      leftImage="naira.svg"
      v-model="amount"
      />
      <TextInput 
      label="Moratorium Period" 
      id="moratorium-period" 
      name="moratorium-period" 
      labelClass="form-modal-label" 
      length="long"
      type="number"
      inputClass="inputClasses"
      :required="true"
      :value="loanOffer.moratorium_period"
      :disabled="true"
      />
      <TextInput 
      label="Interest Rate" 
      id="interest-rate" 
      name="interest-rate" 
      labelClass="form-modal-label" 
      length="long"
      type="number"
      inputClass="inputClasses"
      :required="true"
      :value="loanOffer.interest_rate"
      :disabled="true"
      />
      <TextInput 
      label="Payback Period" 
      id="payback-period" 
      name="payback-period" 
      labelClass="form-modal-label" 
      length="long"
      type="number"
      inputClass="inputClasses"
      :required="true"
      :value="loanOffer.payback_period"
      :disabled="true"
      />
      <div class="alert-section">Are You Sure You Want To Apply?</div>
      <div class="buttons">
        <button @click="declineApply" class="form-modal-button red">No</button>
        <button @click="submit" class="form-modal-button">Yes</button>
      </div>
    </CustomModal>
  </div>
  </div>
</template>

<script>
import CustomModal from "../../components/Modals/CustomModal";
import TextInput from "../../components/Inputs/TextInput";
import TaggedInput from "../../components/Inputs/TaggedInput";
import Toast from "../../components/Toast";
import { mapActions } from "vuex";
export default {
  props: {
    loanOffer: Object
  },
  components: {
    CustomModal,
    TextInput,
    TaggedInput,
    Toast
  },
  data() {
    return {
      amount: "",
      Toast:{
        show:false,
        title:"",
        message:"",
        success:true
      }
    };
  },
  methods: {
    ...mapActions({
      makeLoanRequest: "UserLoanOffers/makeLoanRequest"
    }),
    prefillAmount() {
      if (this.$route.query.amount) {
        this.amount = this.$route.query.amount;
      }
    },
    handleApply() {
      this.$bvModal.show(`${this.loanOffer.title}confirmOffer`);
    },
    declineApply() {
      this.$bvModal.hide(`${this.loanOffer.title}confirmOffer`);
    },
    showToast(title, message, success) {
      this.Toast = { show: true, title, message, success };
      setTimeout(() => {
        this.Toast.show = false;
      }, 5000)
    },
    submit() {
      this.makeLoanRequest({
        amount: this.amount,
        id: this.loanOffer.id
      }).then(() => {
        this.showToast("Success","Loan request was successful",true)
        this.$router.push({name:"StaffLoanRequestSuccess"})
      }).catch(e=>{
        this.showToast("Error",e.response.data.message,false)
      })
    }
  },
  mounted() {
    this.prefillAmount();
  }
};
</script>

<style scoped>
.card-holder {
  display: grid;
  grid-template-columns: 1fr 3fr;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
}

.card-left img {
  width: 100%;
}

.card-holder p {
  margin-bottom: 5px;
}

p.offer-title {
  color: #656a72;
  font-size: 20px;
}
.card-right {
  overflow: hidden;
}
.offer-description {
  font-size: 16px;
  color: #959aa2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.label {
  color: #656a72;
}
.value {
  color: #959aa2;
}
.apply {
  color: #009831;
  cursor: pointer;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.form-modal-button {
  width: 150px;
}
.red {
  background: red;
}
.alert-section {
  text-align: center;
  margin-top: 20px;
  font-weight: 500;
}
</style>
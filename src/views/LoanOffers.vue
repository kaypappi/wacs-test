<template>
  <div class='loan-offers-wrapper'>
    <div class="page-filters">
      <div class="requests-no"><span v-if="loanOffers.meta">{{loanOffers.meta.total}}</span> Loan Offers</div>

      <LoanOffersFilter :filterOffers="filterLoanOffers"></LoanOffersFilter>

      <div class="cta-div">
        <Button v-b-modal.add-form-modal class="cta-button">
          <img src="assets/images/Plus.svg" alt="Plus sign" />
          Create New Offer
        </Button>
      </div>
    </div>
    <CustomModal :onHide="onHide" id="add-form-modal">
      <h5 class="form-modal-title">Create Offer</h5>
      <div class="form-modal-title-border"></div>
      <form @submit.prevent="onSubmit">
        <!-- <DragDropFileInput
          :onfile="fileChange"
          label="Upload Banner"
          fileTypes="PNG, JPG up to 5MB"
        />-->
        <div class="cot">
            
            <div class="cot-code">
                <TextInput :required="true" type="number" @input="handleText($event,'code')" placeholder="Enter Code"  inputClass="inputClasses" length="short" label="Code"></TextInput>
            </div>
            <div class="double-input-range-text"></div>
            <div class="cot-title">
                <TextInput :required="true" @input="handleText($event,'title')" placeholder="Enter Title"  inputClass="inputClasses" length="short" label="Title"></TextInput>
            </div>
        </div>
        <div class="description">
          <TextArea row="2" :required="true" @changes="handleText($event,'description')" label='Description' inputClass="inputClasses" placeholder="Enter Description"/>
        </div>
        <TaggedInput
          label="Amount"
          id="amount"
          name="amount"
          labelClass="form-modal-label"
          placeholder="e.g 200,000"
          type="number"
          :tagLeft="true"
          :required="true"
          :tagRight="false"
          leftImage="naira.svg"
          v-model.number="addOffer.amount_from"
        />
        <div class="double-input-range-text">To</div>
        <TaggedInput
          :tagLeft="true"
          :tagRight="false"
          :required="true"
          type="number"
          :min="this.addOffer.amount_from"
          placeholder="e.g 500,000"
          leftImage="naira.svg"
          v-model.number="addOffer.amount_to"
        />
        <div class="short-dropdown-box">
          <label for="payback-period" class="form-modal-label">Payback Period</label>
          <select
            name="payback-period"
            id="payback-period"
            class="form-modal-inputs form-short-input"
            required
            v-model="addOffer.payback_period"
          >
            <option value="0" hidden>Select</option>
            <option v-for="n in 12" :value="n" :key="n">{{n}} {{n == 1 ? 'Month' : 'Months'}}</option>
          </select>
        </div>
        <div class="double-input-range-text"></div>
        <TaggedInput
          label="Interest Rate"
          id="interest"
          name="interest"
          placeholder="e.g 4"
          labelClass="form-modal-label margin-top-30"
          :tagLeft="false"
          :tagRight="true"
          :required="true"
          rightImage="percent.svg"
          v-model.number="addOffer.interest_rate"
        />
        <label
          for="moratorium"
          class="form-modal-label margin-top-30"
        >Moratorium Period (first repayment)</label>
        <span class="form-field-info">(on interest and principal)</span>
        <select
          name="moratorium"
          id="moratorium"
          class="form-modal-inputs"
          required
          v-model="addOffer.moratorium_principal"
        >
          <option value="0" hidden>Select</option>
          <option value="1">1 Month</option>
          <option value="2">2 Months</option>
          <option value="3">3 Months</option>
        </select>
        <SubmitButton buttonClass="form-modal-button" name="Submit" :isLoading="creatingOffer" />
      </form>
    </CustomModal>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingOffers"
      class="page-loader"
    />
    <template v-else>
      <LoanOffersTable :items="loanOffers.data" />
    </template>
    <!-- <Table :tableHeaders="['Date', 'Code', 'Title', 'Amount', 'Interest', 'Duration', 'Status', '']" v-else>
            <LoanOffersTableRow
              v-for="loanOffer in loanOffers"
              :key="loanOffer.id"
              :id="loanOffer.id"
              :date="loanOffer.date"
              :code="loanOffer.code"
              :title="loanOffer.title"
              :amount="loanOffer.amount"
              :interest="loanOffer.interestRate"
              :duration="loanOffer.duration"
              :status="loanOffer.status"
              :onEdit="editUser"
              :onResetPassword="confirmResetPassword"
              :onToggleStatus="toggleUserStatus"
              :onChangeRole="changeUserRole"
            />
    </Table>-->
  </div>
</template>

<script>
import axios from "axios";
import CustomModal from "../components/Modals/CustomModal";
//import Table from '../components/Table/Table';
import LoanOffersTable from "../components/Table/LoanOffersTable";
//  import LoanOffersTableRow from '../components/Table/LoanOffersTableRow';
//import DragDropFileInput from "../components/Inputs/DragDropFileInput";
import TaggedInput from "../components/Inputs/TaggedInput";
import TextInput from "../components/Inputs/TextInput";
import TextArea from "../components/Inputs/TextArea"
import SubmitButton from "../components/Buttons/SubmitButton";
import Button from "../components/Buttons/Botton";
import LoanOffersFilter from "../components/Dropdown/LoanOffersFilter";
export default {
  components: {
    CustomModal,
    LoanOffersFilter,
    TextInput,
    TextArea,
    /* Table,
            LoanOffersTableRow, */
    LoanOffersTable,
    //DragDropFileInput,
    TaggedInput,
    SubmitButton,
    Button
  },
  data() {
    return {
      errors:{},
      searchTerm: "",
      creatingOffer: false,
      fetchingOffers: false,
      loanOffers: {},
      addOffer: {
        moratorium_principal: 0,
        payback_period: 0
      },
      formValues: null
    };
  },
  methods: {
    onSubmit() {
      var formValues = new FormData();
      this.creatingOffer = true;
      formValues.append("code_name", this.addOffer.code);
      formValues.append("title", this.addOffer.title);
      formValues.append(
        "description",
        this.addOffer.description
      );
      formValues.append("interest_rate", this.addOffer.interest_rate);
      formValues.append("amount_from", this.addOffer.amount_from);
      formValues.append("amount_to", this.addOffer.amount_to);
      formValues.append("payback_period", this.addOffer.payback_period);
      formValues.append("interest_rate_from", this.addOffer.interest_rate_from);
      formValues.append(
        "moratorium_period",
        this.addOffer.moratorium_principal
      );
      axios
        .post(
          "https://wacs2.herokuapp.com/api/v1/creditor/offer/create",
          formValues,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(() => {
          this.creatingOffer = false;
          console.log("success");
        })
        .catch(err => {
          console.log("err", err.response.data);
          this.creatingOffer = false;
        });
    },
    handleText(event,type){
         this.addOffer[type]=event
    },
    fileChange(file) {
      const formData = new FormData();
      formData.append("image_banner", file);
      this.formValues = formData;
    },
    onHide() {
      this.addOffer = {};
    },
    fetchLoanOffers() {
      this.fetchingOffers = true;
      axios
        .get("https://wacs2.herokuapp.com/api/v1/creditor/offer/view")
        .then(res => {
          console.log(res.data);
          this.loanOffers = res.data;
          this.fetchingOffers = false;
        })
        .catch(err => {
          console.log(err);
          this.fetchingOffers = false;
        });
    },
    filterLoanOffers(data){
      this.loanOffers=data
    },
    editUser() {
      alert("editting");
    },
    changeUserRole() {
      alert("changing role");
    },
    confirmResetPassword() {
      alert("resetting");
    },
    toggleUserStatus() {
      alert("changing status");
    }
  },
  mounted() {
    this.fetchLoanOffers();
  }
};
</script>

<style >
.page-filters {
  align-items: center;
  padding: 0 30px;
  background-color: white;
  color: #a1a1a1;
}

.inputClasses {
    width: inherit;
    background: #f8f8f8;
    border: 1px solid #CCCCCC;
    padding: 10px;
}

.description{
  margin-top: 15px;
}

.cot{
    display: flex;
    justify-content: space-between;
    padding: 0;
}

.filter-by {
  margin-left: 40px;
}
.cta-div {
  padding: 3px 0px 3px 3px;
  border-left: 0px;
}
</style>
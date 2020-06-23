<template>
  <div class='loan-offers-wrapper'>
    <Toast 
            :show="toast.show"
            :title="toast.title"
            :successMessage="toast.message"
            :failureMessage="toast.message"
            :success="toast.success"
        />
    <div class="page-filters">
      <!-- <div class="requests-no"><span v-if="loanOffers.meta">{{loanOffers.meta.total}}</span> Loan Offers</div> -->
      <SearchFilterInput 
                placeholder="Search by code,title"
                :value="getSearchTerm()"
          :onSearch="enterSearch"
          @input="handleSearch($event)"
      />
      <LoanOffersFilter :isLoading="isFetching"></LoanOffersFilter>

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
                <TextInput :required="true" type="text" @input="handleText($event,'code')" placeholder="Enter Code"  inputClass="inputClasses" length="short" label="Code"></TextInput>
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
          type="text"
          :tagLeft="true"
          :required="true"
          :tagRight="false"
          leftImage="naira.svg"
          v-model="addOffer.amount_from"
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
      v-if="isFetching"
      class="page-loader"
    />
    <template v-else>
      <template v-if="searchFound===false">
        <NoData>
          <template v-slot:title>
            <h4>Not Found</h4>
          </template>
          <template v-slot:subtitle>
            <p>The data you are searching for could not be found</p>
          </template>
        </NoData>
      </template>
      <template v-else-if="loanOffers.data">
        <LoanOffersTable :items="offers" :updateItems="updateLoanOffers" :deleteRow="deleteLoanOffersRow" />
      </template>
      <template v-else>
        <NoData>
          <template v-slot:title>
            <h4>No Loan Offers</h4>
          </template>
          <template v-slot:subtitle>
            <p>There are no loan offers yet. Create one above.</p>
          </template>
        </NoData>
      </template>
      
      
    </template>
    <Pagination
          v-if="!searchTerm && loanOffers.meta && searchFound"
          :total="loanOffers.meta.total"
          :currentPage="loanOffers.meta.current_page"
          :lastPage="loanOffers.meta.last_page"
          :from="loanOffers.meta.from"
          :to="loanOffers.meta.to"
        />
  </div>
</template>

<script>
import CustomModal from "../components/Modals/CustomModal";
import LoanOffersTable from "../components/Table/LoanOffersTable";
import TaggedInput from "../components/Inputs/TaggedInput";
import TextInput from "../components/Inputs/TextInput";
import TextArea from "../components/Inputs/TextArea"
import SubmitButton from "../components/Buttons/SubmitButton";
import Button from "../components/Buttons/Botton";
import LoanOffersFilter from "../components/Dropdown/LoanOffersFilter";
import Toast from '../components/Toast'
import NoData from "../components/NoData"
import SearchFilterInput from "../components/Inputs/SearchFilterInput"
import Pagination from "../components/Pagination/Pagination"
export default {
  components: {
    CustomModal,
    LoanOffersFilter,
    TextInput,
    TextArea,
    LoanOffersTable,
    TaggedInput,
    SubmitButton,
    Button,
    Toast,
    SearchFilterInput,
    NoData,
    Pagination
  },
  data() {
    return {
      errors:{},
      searchTerm: "",
      creatingOffer: false,
      fetchingOffers: false,
      addOffer: {
        moratorium_principal: 0,
        payback_period: 0
      },
      formValues: null
    };
  },
  methods: {
    closeModal(){
      this.$bvModal.hide("add-form-modal");
    },
    onSubmit() {
      const data=this.getSubmitData()
      this.$store.dispatch("LoanOffers/createLoanOffer",{data,closeModal:this.closeModal})
    },
    getSubmitData(){
      const data={
        code_name:this.addOffer.code,
        title:this.addOffer.title,
        description:this.addOffer.description,
        interest_rate:this.addOffer.interest_rate,
        amount_from:parseInt(this.stripString(this.addOffer.amount_from)),
        amount_to:parseInt(this.stripString(this.addOffer.amount_to)),
        payback_period:this.addOffer.payback_period,
        interest_rate_from:this.addOffer.interest_rate_from,
        moratorium_period:this.addOffer.moratorium_principal
      }
      return data
    },
    handleText(event,type){
         this.addOffer[type]=event
    },
    onHide() {
      this.addOffer = {};
    },
    serialize(obj, prefix) {
      var str = [],
        p;
      for (p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
          str.push(
            v !== null && typeof v === "object"
              ? this.serialize(v, k)
              : k + "=" + v
          );
        }
      }
      return str.join("&");
    },
    handleSearch(event){
     return this.$store.dispatch("LoanOffers/updateSearchTerm",event)
    },
    fetchLoanOffers(query) {
      this.$store.dispatch("LoanOffers/fetchLoanOffers",this.serialize(query))
    },
    updateLoanOffers(newRow){
      this.$store.dispatch("LoanOffers/updateLoanOffers",newRow)
    },
    deleteLoanOffersRow(row){
      this.$store.dispatch("LoanOffers/deleteLoanOfferRow",row)
    },
    enterSearch(){
      if(this.getSearchTerm()){
        this.$router.push({name:'loanOffers',query:{search:this.getSearchTerm()}})
      }
      else{
        this.$store.dispatch("LoanOffers/updateSearchFound",true)
      }
    },
    searchLoanOffer(query){
      if(this.getSearchTerm()){
        return this.$store.dispatch("LoanOffers/searchOffers",query)
      }
      else{
        this.$store.dispatch("LoanOffers/updateSearchFound",true)
      }
    },
    getSearchTerm(){
      return this.$store.state.LoanOffers.searchTerm
    },
    formatNumberField(num,position) {
      num=this.stripString(num)
      this.addOffer[position]= Number(num).toLocaleString() 
    },
    stripString(data){
      return data.toString().replace(/,/g,"")
    }
  },
  computed:{
    offers(){
      let loanOffers=this.$store.state.LoanOffers.loanOffers.data
      if(this.getSearchTerm() && loanOffers) {
                    loanOffers = loanOffers.filter((row) => {
                        return Object.keys(row).some((key) => {
                            return String(row[key]).toLowerCase().indexOf(this.getSearchTerm().toLowerCase()) > -1
                        })
                    })
                }
        return loanOffers
    },
    loanOffers(){
      return this.$store.state.LoanOffers.loanOffers
    },
    searchFound(){
      return this.$store.state.LoanOffers.searchFound
    },
    isFetching(){
      return this.$store.state.LoanOffers.fetchingOffers
    },
    
    toast(){
      return this.$store.state.LoanOffers.toast
    },
    fValue: {
      // getter
      get: function(position) {
        return this.addOffer[position];
      },
      // setter
      set: function(newValue,position) {
        newValue=newValue.replace(",","")
        this.addOffer[position]=newValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        /* if (newValue.length > 3) {
          newValue = newValue.replace(",", "");
          this.value =
            newValue.substr(0, newValue.length - 2) +
            "." +
            newValue.substr(newValue.length - 2);

          // add thousend separator formatting here
        } else {
          this.value = newValue;
        } */
      }
    }
  },
  mounted() {
    this.fetchLoanOffers(this.$router.history.current.query);
  },
  watch: {
    "$route.query": {
      handler(query) {
        if(query.search){
         this.searchLoanOffer(query)
        }
        else{
          this.fetchLoanOffers(query)
        }
      },
      deep: true
    }
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
    background-color: #f8f8f8 !important;
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
  margin-left: 20px;
}
.cta-div {
  padding: 3px 0px 3px 3px;
  border-left: 0px;
}
.no-offers{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.no-offers img{
  margin-bottom: 20px;
}
</style>
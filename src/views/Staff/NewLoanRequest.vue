<template>
  <div class="new-loan-wrapper">
    <div class="form-wrapper">
      <form @submit="submit">
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
      v-model="form.amount"
      />
      <TextInput 
      label="Payback Period" 
      fieldInfo="Enter how many monthy installments you will make"
      placeholder="E.g 12 months"
      id="payback-period" 
      name="payback-period" 
      labelClass="form-modal-label" 
      length="long"
      type="number"
      inputClass="inputClasses"
      :required="false"
      v-model="form.payback"
      />
       <TaggedInput
          label="Interest Rate"
          id="interest"
          length="long"
          name="interest"
          fieldInfo="Enter Interest Rate you want"
          placeholder="e.g 4"
          labelClass="form-modal-label margin-top-30"
          :tagLeft="false"
          :tagRight="true"
          :required="false"
          rightImage="percent.svg"
          v-model="form.interest"
        />

      <label for="moratorium" class="form-modal-label margin-top-30">Moratorium Period</label>
      <span class="form-field-info">Select when you wish to start repayment</span>
      <select v-model="form.monotarium" name="moratorium" id="moratorium" class="form-modal-inputs">
          <option :value="0" hidden>Select Month</option>
          <option :value="1">1 Month</option>
          <option :value="2">2 Months</option>
          <option :value="3">3 Months</option>
      </select>
      <button class="request">Find Offers</button>
      </form>
    </div>
  </div>
</template>

<script>
import TaggedInput from "../../components/Inputs/TaggedInput";
import TextInput from  "../../components/Inputs/TextInput"
export default {
  components: {
    TaggedInput,
    TextInput,
  },
  data(){
      return{
          form:{
              amount:"",
              payback:"",
              monotarium:""
          }
      }
  },
  methods:{
      submit(){
          this.$router.push({name:'StaffLoanOffers',query:this.form})
      }
  },
};
</script>

<style scoped>
.form-wrapper {
  max-width: 450px;
  margin: 0 auto;
}

.long-text-input {
    width: 100%;
}
.form-wrapper >>> .inputClasses{
    margin-top: -14px;
}
button.request {
  width: 100%;
  border: none;
  background: #27be58;
  color: white;
  padding: 10px;
  font-weight: 500;
  margin-top: 20px;
}
</style>
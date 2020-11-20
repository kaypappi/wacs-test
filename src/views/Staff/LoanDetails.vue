<template>
  <div class="loandetails-wrapper">
    <confirmModal :propObject="propObject"/>
    <template v-for="(item, key, index) in loanData">
      <div :key="`loanData-${index}`" class="info-tile d-flex">
        <span class="info-title mr-auto">{{formatLabel(key)}}</span>
        <span class="info-content ml-auto">{{item}}</span>
      </div>
    </template>
    <div class="top-text h4">Breakdown</div>
    <template v-for="(item, key, index) in BreakDown">
      <div :key="`breakDown-${index}`" class="info-tile d-flex">
        <span class="info-title mr-auto">{{formatLabel(key)}}</span>
        <span class="info-content ml-auto">{{item}}</span>
      </div>
    </template>

    <div class="buttons">
        <button  class="form-modal-button red">Reject</button>
        <button  class="form-modal-button">Accept</button>
      </div>
  </div>
</template>

<script>
import confirmModal from "../../components/Modals/ConfirmModal"
export default {
    components:{
        confirmModal
    },
  data() {
    return {
      loanData: {
        Loan_Status: "Approved",
        Date_Requested: "23rd Febuary 2020"
      },
      BreakDown: {
        Requested_Amount: "N300,000",
        Payback_Period: "5 Months",
        First_Payment_Date: "2 months after",
        Interest: "2%",
        Monthly_Deduction: "N50,000"
      },
      propObject:{
          promptMessage:"Are you sure you want to reject this loan?",
          onSuccess:false
      }
    };
  },
  methods: {
    formatLabel(sentence) {
      const newSentence = sentence
        .replace(/_/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      return newSentence;
    }
  }
};
</script>

<style scoped>
.loandetails-wrapper{
    max-width: 600px;
    margin: 50px auto 0 auto;
}
.info-tile {
  padding: 10px 0;
  border-bottom: #ededed 1px solid;
}
.top-text {
  color: #656A72;
  margin-top: 37px;
}
.info-title {
  color: #656A72;
  font-size: 14px;
}

.info-content {
  color: #656A72;
  font-size: 14px;
  font-weight: 500;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.buttons button{
    max-width: 280px;
}

.red {
  background: none;
  border: red 1px solid;
  color: red;
}
</style>
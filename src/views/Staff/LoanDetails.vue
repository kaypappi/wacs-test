<template>
  <div class="loandetails-wrapper">
    <confirmModal :propObject="propObject" />
    <template v-if="loanDetails!==null">
      <template v-for="(item, key, index) in loanDataFormatted.loanData">
        <div :key="`loanData-${index}`" class="info-tile d-flex">
          <span class="info-title mr-auto">{{formatLabel(key)}}</span>
          <span :class="`info-content ml-auto ${item}`">{{item}}</span>
        </div>
      </template>
      <div class="top-text h4">Breakdown</div>
      <template v-for="(item, key, index) in loanDataFormatted.BreakDown">
        <div :key="`breakDown-${index}`" class="info-tile d-flex">
          <span class="info-title mr-auto">{{formatLabel(key)}}</span>
          <span class="info-content ml-auto">{{item}}</span>
        </div>
      </template>

      <div v-if="loanDetails.status==='Pending'" class="buttons">
        <button class="form-modal-button red">Reject</button>
        <button class="form-modal-button">Accept</button>
      </div>
    </template>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingLoanDetails"
      class="page-loader"
    />
  </div>
</template>

<script>
import confirmModal from "../../components/Modals/ConfirmModal";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  components: {
    confirmModal
  },
  data() {
    return {
      propObject: {
        promptMessage: "Are you sure you want to reject this loan?",
        onSuccess: false
      }
    };
  },
  methods: {
    ...mapActions({
      fetchLoanDetails: "UserLoanOffers/fetchLoanDetails"
    }),
    formatLabel(sentence) {
      const newSentence = sentence
        .replace(/_/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      return newSentence;
    }
  },
  computed: {
    ...mapGetters({
      fetchingLoanDetails: "UserLoanOffers/fetchingLoanDetails",
      loanDetails: "UserLoanOffers/loanDetails"
    }),
    loanDataFormatted() {
      if (this.loanDetails === null) {
        return null;
      }

      const data = {
        loanData: {
          Loan_Status: this.loanDetails.status,
          Date_Requested: moment(this.loanDetails.date).format("Do MMM YYYY")
        },
        BreakDown: {
          Requested_Amount: this.loanDetails.amount,
          Payback_Period: `${this.loanDetails.offer.payback_period}months`,
          First_Payment_Date: `${this.loanDetails.offer.moratorium_period} months later`,
          Interest: `${this.loanDetails.offer.interest_rate}%`
        }
      };
      return data;
    }
  },
  mounted() {
    this.fetchLoanDetails(this.$route.params.id);
  }
};
</script>

<style scoped>
.loandetails-wrapper {
  max-width: 600px;
  margin: 50px auto 0 auto;
}
.info-tile {
  padding: 10px 0;
  border-bottom: #ededed 1px solid;
}
.top-text {
  color: #656a72;
  margin-top: 37px;
}
.info-title {
  color: #656a72;
  font-size: 14px;
}

.info-content {
  color: #656a72;
  font-size: 14px;
  font-weight: 500;
}

.info-content.Pending {
  color: #e47a00;
  background: rgba(228, 122, 0, 0.15);
  padding: 2px 10px;
  border-radius: 2px;
}
.info-content.Declined {
  color: #f50606;
  background: rgba(245, 6, 6, 0.15);
  padding: 2px 10px;
  border-radius: 2px;
}
.info-content.Running {
  color: #0e77e6;
  background: #0e77e626;
  padding: 2px 10px;
  border-radius: 2px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.buttons button {
  max-width: 280px;
}

.red {
  background: none;
  border: red 1px solid;
  color: red;
}
</style>
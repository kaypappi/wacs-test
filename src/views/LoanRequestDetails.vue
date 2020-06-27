<template>
  <div class="full-user-details">
    <Toast
      :show="toast.show"
      :title="toast.title"
      :successMessage="toast.message"
      failureMessage="Invalid token"
      :success="toast.success"
    />
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isFetching && !splitDetails.offerId"
      class="page-loader"
    />
    <template v-else>
      <div class="details-top">
        <h3>{{splitDetails.customerName}}</h3>
        <template v-if="loanDetails.status==='Pending'">
          <Button class="cta-button decline-btn margin-left-auto" @click="declineRequest">
            <img src="/assets/images/cancel.svg" alt="Plus sign" />
            Decline
          </Button>
          <Button class="cta-button margin-left-30" @click="makeOffer">
            <img src="/assets/images/Double-check.svg" alt="Plus sign" />
            Make Offer
          </Button>
        </template>
      </div>
      <table class="table personal-info-table no-border-table">
        <NoBorderTableRow :data="splitDetails.firstRowBio" />
        <NoBorderTableRow :data="splitDetails.secondRowBio" />
        <NoBorderTableRow :data="splitDetails.thirdRowBio" />
      </table>

      <h5>Loan Details</h5>
      <table class="table personal-info-table no-border-table">
        <NoBorderTableRow :data=" splitDetails.loanDetailsRowOne" />
      </table>

      <img
        src="/assets/images/page-ring-loader.svg"
        alt="loader"
        v-if="isFetchingLoanHistory"
        class="page-loader"
      />
      <template v-if="!isFetchingLoanHistory && (loanHistory.data? loanHistory.data.length>0: true)">
        <h5>Loan History</h5>
        <table class="table personal-info-table border-table">
          <tr class="t-head">
            <td>Date</td>
            <td>Loan Offer Collected</td>
            <td>Credit Administrator</td>
            <td>Loan Amount</td>
            <td>Amount Paid</td>
          </tr>
          <template v-for="history in loanHistory.data">
            <tr class="t-field" :key="history.date">
              <td>{{history.date}}</td>
              <td>{{history.loan_offer_collected}}</td>
              <td>{{history.credit_administrator}}</td>
              <td>{{history.loan_amount}}</td>
              <td>{{history.total_paid}}</td>
            </tr>
          </template>
        </table>
      </template>
    </template>
  </div>
</template>

<script>
import NoBorderTableRow from "../components/Table/NoBorderTableRow";
import Toast from "../components/Toast";
export default {
  components: {
    NoBorderTableRow,
    Toast
  },
  data() {
    return {
      customerName: "",
      offerId: "",
      fetchingRequests: true,
      firstRowBio: [],
      secondRowBio: [],
      thirdRowBio: [],
      loanDetailsRow: [],
      requestId: "",
      toast: {
        show: false,
        title: "",
        message: "",
        success: false
      }
    };
  },
  methods: {
    async fetchLoanDetails() {
      this.requestId = this.$route.params.requestId;
      return await this.$store.dispatch(
        "LoanRequest/fetchLoanRequestsDetials",
        this.requestId
      );

      //return this.splitDetails(this.loanDetails());
    },
    fetchLoanHistory() {
      this.requestId = this.$route.params.requestId;
      this.$store.dispatch(
        "LoanRequest/fetchLoanHistory",
        this.loanDetails.user.id
      );
    },
    showToast(title, message, success) {
      this.toast = { show: true, title, message, success };
      setTimeout(() => {
        this.toast.show = false;
      }, 2000);
    },
    declineRequest() {
      this.$store.dispatch(
        "LoanRequest/declineLoanRequest",
        this.loanDetails.id
      );
    },
    makeOffer() {
      this.$router.push({
        name: "makeOffer",
        params: {
          offerId: this.loanDetails.offer.id,
          loan_request_id: this.loanDetails.id,
          loanDetails: { ...this.loanDetails }
        }
      });
    }
  },
  computed: {
    isFetching() {
      return this.$store.state.LoanRequest.isFetchingLoanDetails;
    },
    splitDetails() {
      return this.$store.state.LoanRequest.splitDetails;
    },
    loanDetails() {
      return this.$store.state.LoanRequest.loanDetails;
    },
    isFetchingLoanHistory() {
      return this.$store.state.LoanRequest.isFetchingLoanHistory;
    },
    loanHistory() {
      console.log(this.$store.state.LoanRequest.loanHistory);
      return this.$store.state.LoanRequest.loanHistory;
    }
  },
  mounted() {
    this.fetchLoanDetails().then(() => {
      this.fetchLoanHistory();
    });
  }
};
</script>

<style>
</style>
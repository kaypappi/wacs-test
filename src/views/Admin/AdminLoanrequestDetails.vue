<template>
  <div class="full-user-details">
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isFetching && !splitDetails.offerId"
      class="page-loader"
    />
    <template v-else>
      <div  class="details-top">
        <h3>{{splitDetails.customerName}}</h3> 
      </div>
      <table class="table personal-info-table no-border-table">
        <NoBorderTableRow :data="splitDetails.firstRowBio" />
        <NoBorderTableRow :data="splitDetails.secondRowBio" />
        <NoBorderTableRow :data="splitDetails.thirdRowBio" />
      </table>

      <div class="loan-details-header">
        <h5>Loan Details</h5>
        <p v-if="loanDetails.repayment_details!==null" class="view-schedule" @click="$router.push({name:'adminrepaymentsSchedule',params:{id:loanDetails.repayment_details.id}})">View Repayment Schedule</p>
      </div>
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
              <td>{{formatNumber(history.loan_amount)}}</td>
              <td>{{formatNumber(history.total_paid)}}</td>
            </tr>
          </template>
        </table>
      </template>
    </template>
  </div>
</template>

<script>
import NoBorderTableRow from "../../components/Table/NoBorderTableRow";
export default {
  components: {
    NoBorderTableRow,
  },
  data() {
    return {
      customerName: "",
      offerId: "",
      fetchingRequests: true,
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
        "AdminLoanRequest/fetchAdminLoanRequestsDetials",
        this.requestId
      );
    },
    fetchLoanHistory() {
      this.requestId = this.$route.params.requestId;
      this.$store.dispatch(
        "AdminLoanRequest/fetchAdminLoanHistory",
        this.loanDetails.user.id
      );
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    
  },
  computed: {
    
    isFetching() {
      return this.$store.state.AdminLoanRequest.isFetchingLoanDetails;
    },
    splitDetails() {
      return this.$store.state.AdminLoanRequest.splitDetails;
    },
    loanDetails() {
      return this.$store.state.AdminLoanRequest.loanDetails;
    },
    isFetchingLoanHistory() {
      return this.$store.state.AdminLoanRequest.isFetchingLoanHistory;
    },
    loanHistory() {
      return this.$store.state.AdminLoanRequest.loanHistory;
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
.loan-details-header{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.loan-details-header p{
  color: #009831;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 14px;
}
</style>
<template>
  <div class="full-user-details">
    <Toast
      :show="getToast.show"
      :title="getToast.title"
      :successMessage="getToast.message"
      :failureMessage="getToast.message"
      :success="getToast.success"
    />
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isFetching && !splitDetails.offerId"
      class="page-loader"
    />
    <template v-else>
      <div  class="details-top">
        <h3>{{splitDetails.customerName}}</h3>
        <template v-if="loanDetails.ippis_status==='Pending'">
            <Button class="cta-button decline-btn margin-left-auto" @click="declineRequest">
          <img src="/assets/images/cancel.svg" alt="Plus sign" />
          Decline
        </Button>
        <!-- <Button class="cta-button margin-left-30" @click="approveOffer">
          <img src="/assets/images/Double-check.svg" alt="Plus sign" />
          Approve
        </Button> -->
        </template>
      </div>
      <table class="table personal-info-table no-border-table">
        <NoBorderTableRow :data="splitDetails.firstRowBio" />
        <NoBorderTableRow :data="splitDetails.secondRowBio" />
        <NoBorderTableRow :data="splitDetails.thirdRowBio" />
      </table>

      <div class="loan-details-header">
        <h5>Loan Details</h5>
        <p class="view-schedule" @click="$router.push({name:'ippisLoanReport',params:{id:loanDetails.loan_repayment_details.id}})">View Repayment Schedule</p>
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
            <!-- <td>Amount Paid</td> -->
          </tr>
          <template v-for="history in loanHistory.data">
            <tr class="t-field" :key="history.date">
              <td>{{history.date}}</td>
              <td>{{history.offer.title}}</td>
              <td>{{history.offer.company.name}}</td>
              <td>{{formatNumber(history.amount)}}</td>
              <!-- <td>{{formatNumber(history.total_paid)}}</td> -->
            </tr>
          </template>
        </table>
      </template>
    </template>
  </div>
</template>

<script>
import NoBorderTableRow from "../../components/Table/NoBorderTableRow";
import Toast from "../../components/Toast";
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
        "IppisLoanRequest/fetchIppisLoanRequestsDetials",
        this.requestId
      );
    },
    fetchLoanHistory() {
      this.requestId = this.$route.params.requestId;
      this.$store.dispatch(
        "IppisLoanRequest/fetchIppisLoanHistory",
        this.loanDetails.user.id
      );
    },
    declineRequest() {
      this.$store.dispatch("IppisLoanRequest/ippisDeclineRequest",this.requestId).then(()=>{
          setTimeout(()=>{this.$router.push({name:"ippisLoanRequest"})},3000)
        })
    },
    approveOffer(){
        const id=this.requestId
        this.$store.dispatch("IppisLoanRequest/ippisApproveRequest",id).then(()=>{
          setTimeout(()=>{this.$router.push({name:"ippisLoanRequest"})},3000)
        })
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    
  },
  computed: {
    
    isFetching() {
      return this.$store.state.IppisLoanRequest.isFetchingLoanDetails;
    },
    splitDetails() {
      return this.$store.state.IppisLoanRequest.splitDetails;
    },
    loanDetails() {
      return this.$store.state.IppisLoanRequest.loanDetails;
    },
    getToast(){
        return this.$store.state.IppisLoanRequest.toast
    },
    isFetchingLoanHistory() {
      return this.$store.state.IppisLoanRequest.isFetchingLoanHistory;
    },
    loanHistory() {
      return this.$store.state.IppisLoanRequest.loanHistory;
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
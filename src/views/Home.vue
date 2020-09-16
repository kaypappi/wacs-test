<template>
  <div class="home-wrapper">
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isFetchingSummary"
      class="page-loader"
    />
    <div v-else class="statscard-section">
      <StatsCard title="Total Requests" textColor="green" :value="requestsSummary.total" />
      <StatsCard title="Pending Requests" textColor="orange" :value="requestsSummary.pending" />
      <StatsCard title="Running Requests" textColor="green" :value="requestsSummary.running" />
      <StatsCard title="Bank Approved Requests" textColor="green" :value="requestsSummary.bank_approved" />
      <StatsCard title="Awaiting IPPIS Requests" textColor="green" :value="requestsSummary.awaiting_ippis" />
      <StatsCard title="Rejected Requests" textColor="red" :value="requestsSummary.rejected" />
    </div>

    <div class="recent-requests">
      <div class="recent-requests-top">
        <p>Recent Loan Requests</p>
        <p @click="$router.push({name:'loanRequest'})" class="view-all">View All</p>
      </div>
      <div class="recent-request-table">
        <img
          src="/assets/images/page-ring-loader.svg"
          alt="loader"
          v-if="isFetchingRequests"
          class="page-loader"
        />
        <template v-else>
          <Table
            v-if="loanRequests"
            :tableHeaders="['Date', 'Name', 'IPPIS Number', 'Monthly Salary', 'Loan Request', 'Status']"
          >
            <template>
              <LoanRequestTableRow
                v-for="loanRequest in loanRequests.data"
                :userData="loanRequest"
                :key="loanRequest.id"
                :id="loanRequest.id"
                :date="loanRequest.date"
                :name="loanRequest.user.full_name"
                :ippissNo="loanRequest.user.user_name"
                :salary="formatNumber(loanRequest.user.profile.monthly_salary)"
                :loanRequest="formatNumber(loanRequest.amount)"
                :status="loanRequest.status"
              />
            </template>
          </Table>
          <template v-else>
            <NoData>
              <template v-slot:title>
                <h4>No Loan Requests</h4>
              </template>
              <template v-slot:subtitle>
                <p>There are no loan requests currently available.</p>
              </template>
            </NoData>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StatsCard from "../components/StatsCard";
import Table from "../components/Table/Table";
import LoanRequestTableRow from "../components/Table/LoanRequestTableRow";

export default {
  name: "home",
  components: {
    StatsCard,
    Table,
    LoanRequestTableRow
  },
  methods: {
    fetchLoanRequests(query) {
      query = this.serialize(query);
      this.$store.dispatch("CreditorLoanRequest/fetchLoanRequests", query);
    },
    fetchRequestsSummary() {
      this.$store.dispatch("CreditorLoanRequest/requestsSummary");
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
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    loanRequests() {
      return this.$store.state.CreditorLoanRequest.loanRequests;
    },
    requestsSummary() {
      return this.$store.state.CreditorLoanRequest.requestsSummary;
    },
    isFetchingRequests() {
      return this.$store.state.CreditorLoanRequest.isFetchingLoanRequests;
    },
    isFetchingSummary() {
      return this.$store.state.CreditorLoanRequest.fetchingSummary;
    }
  },
  mounted() {
    this.fetchRequestsSummary()
      this.fetchLoanRequests(this.$router.history.current.query);
  }
};
</script>

<style scoped>
.statscard-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-bottom: 40px;
}
.home-wrapper {
  padding: 20px;
}

.home-wrapper .recent-requests {
  box-shadow: -6px 4px 7px -1px rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border: 1px solid #e8e7e794;
  border-radius: 5px;
}

.home-wrapper .recent-requests-top {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
}

.recent-requests-top .view-all {
  color: #27be58;
  cursor: pointer;
}
</style>

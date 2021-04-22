<template>
  <div class="dashboard-wrapper">
    <div class="btn-holder">
      <button @click="$router.push({name:'newLoanRequest'})" class="request">
      <b-icon icon="plus"></b-icon>Request Loan Offer
    </button>
    </div>
    <div class="summary-card">
      <p class="title">Eligibility Credit Amount</p>
      <div class="h1">
        <span class="h5">₦</span>
        <span>{{user.data.eligibility}}</span>
      </div>
    </div>
    <div class="btn-holder"></div>
    <div class="content">
      <LoanHistory v-if="user.data.loan" :loanHistory="user.data.loan" />
      <NoData v-else>
        <template v-slot:message>Your loan records will appear here</template>
        <template v-slot:button>
          <button class="request">Request Loan Offer</button>
        </template>
      </NoData>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoanHistory from "../../components/Staff/LoanHistory";
import NoData from "../../components/Staff/NoData";
export default {
  components: {
    LoanHistory,
    NoData
  },
  computed: {
    ...mapGetters({
      user: "Auth/user"
    })
  }
};
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 80vh;
}

.summary-card {
  background: /* url("/assets/images/Circles.svg") -10% -100px no-repeat,
    url("/assets/images/Circles.svg") 30% 100px no-repeat,
    url("/assets/images/Circles.svg") 75% 100px no-repeat,
    url("/assets/images/Circles.svg") 52% 100px no-repeat,
    url("/assets/images/Circles.svg") 110% -100px no-repeat, */ #176229;
  background-size: 200px;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  border-radius: 8px;
  box-shadow: 0 0 12px 0 rgba(188, 188, 188, 0.5);
}

.title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 21px;
}
.content {
  display: flex;
  flex-direction: column;
}
.btn-holder {
  width: 300px;
  margin: 0 auto;
  position: sticky;
  top: calc(100vh - 70px);
}
button.request {
  width: inherit;
  border: none;
  background: #27be58;
  color: white;
  padding: 10px;
  font-weight: 500;
  
}
</style>
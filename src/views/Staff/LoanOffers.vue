<template>
  <div class="loan-offers-wrapper">
    <div class="top d-flex mb-4">
      <div class="filter ml-auto">
        <b-icon class="icon" icon="sliders"></b-icon>Filter By :
      </div>
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingLoanOffers"
      class="page-loader"
    />
    <div v-if="loanOffers" class="loan-offers-body">
      <template v-for="(loanOffer,index) in loanOffers.data">
        <LoanOfferCard :key="index" :loanOffer="loanOffer" />
      </template>
      <NoData :onclick="newRequest" v-if="!fetchingLoanOffers && loanOffers.data.length<1">
        <template v-slot:message>No Loan Offers Found!</template>
        <template v-slot:button>
         Request New Loan Offer
        </template>
      </NoData>
    </div>
  </div>
</template>

<script>
import LoanOfferCard from "../../components/Staff/LoanOfferCard";
import NoData from  "../../components/Staff/NoData"
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    LoanOfferCard,
    NoData
  },
  methods: {
    ...mapActions({
      fetchLoanOffers: "UserLoanOffers/fetchLoanOffers"
    }),
    newRequest(){
        this.$router.push({name:"newLoanRequest"})
    }
  },
  computed: {
    ...mapGetters({
      loanOffers: "UserLoanOffers/loanOffers",
      fetchingLoanOffers: "UserLoanOffers/fetchingLoanOffers"
    })

  },
  watch: {
    "$route.query": {
      handler(query) {
        this.fetchLoanOffers(query);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
.filter {
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 5px 50px 5px 10px;
}
</style>
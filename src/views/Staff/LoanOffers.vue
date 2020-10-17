<template>
  <div class="loan-offers-wrapper">
    <div class="top d-flex mb-4">
      <div class="filter ml-auto">
        <b-icon class="icon" icon="sliders"></b-icon>Filter By :
      </div>
    </div>
    <div v-if="loanOffers" class="loan-offers-body">
      <template v-for="(loanOffer,index) in loanOffers.data">
        <LoanOfferCard :key="index" :loanOffer="loanOffer" />
      </template>
    </div>
  </div>
</template>

<script>
import LoanOfferCard from "../../components/Staff/LoanOfferCard";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    LoanOfferCard
  },
  methods: {
    ...mapActions({
      fetchLoanOffers: "UserLoanOffers/fetchLoanOffers"
    })
  },
  computed: {
    ...mapGetters({
      loanOffers: "UserLoanOffers/loanOffers",
      fetchingLoanOffers: "UserLoanOffers/fetchingLoanOffers"
    })

    /* loanOffers(){
        console.log(this.$store.state.UserLoanOffers.loanOffers)
        return this.$store.state.UserLoanOffers.loanOffers
    } */
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
.filter{
    border: 1px solid #DBDBDB;
    border-radius: 5px;
    padding: 5px 50px 5px 10px;
}
</style>
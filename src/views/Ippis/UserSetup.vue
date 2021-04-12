<template>
  <div>
    <div class="page-filters">
      <!-- <div class="requests-no"><span v-if="loanOffers.meta">{{loanOffers.meta.total}}</span> Loan Offers</div> -->
      <SearchFilterInput
        placeholder="Search by code,title"
        :value="getSearchTerm()"
        :onSearch="enterSearch"
        @input="handleSearch($event)"
      />

      <div class="cta-div">
        <Button v-b-modal.add-form-modal class="cta-button">
          <img src="/assets/images/Plus.svg" alt="Plus sign" />
          Create New Offer
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilterInput from "../../components/Inputs/SearchFilterInput"
export default {
  components:{
    SearchFilterInput
  },
  methods:{
    getSearchTerm(){

    },
    handleSearch(){

    },
    enterSearch(){
      
    }
  }
};
</script>

<style>
</style>
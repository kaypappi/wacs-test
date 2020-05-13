<template>
  <div>
    <div class="page-filters requests-header">
      <!-- <SearchFilterInput 
                placeholder="Search by name, role, status"
                v-model="searchTerm"
                :onSearch="()=>{}"
      />-->
      <div class="requests-no">50 Loan Requests</div>
      
        <FilterDropdown></FilterDropdown>
      
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingRequests"
      class="page-loader"
    />
    <Table
      :tableHeaders="['Date', 'Name', 'Ippiss No.', 'Mont. Salary', 'Loan Request', 'Available Loan', 'Status']"
      v-else
    >
      <LoanRequestTableRow
        v-for="loanRequest in loanRequests"
        :key="loanRequest.id"
        :id="loanRequest.id"
        :date="loanRequest.Date"
        :name="loanRequest.Name"
        :ippissNo="7777777777"
        :salary="loanRequest.Mon_Salary"
        :loanRequest="loanRequest.Loan_Req"
        :availableLoan="loanRequest.Avail_loan"
        :status="loanRequest.Status"
      />
    </Table>
  </div>
</template>

<script>
import axios from "axios";
//import SearchFilterInput from '../components/Inputs/SearchFilterInput';
import Table from "../components/Table/Table";
import LoanRequestTableRow from "../components/Table/LoanRequestTableRow";
import FilterDropdown from "../components/Dropdown/FilterDropdown";

export default {
  components: {
    //SearchFilterInput,
    Table,
    LoanRequestTableRow,
    FilterDropdown
  },
  data() {
    return {
      searchTerm: "",
      loanRequests: [],
      fetchingRequests: true
    };
  },
  methods: {
    fetchLoanRequests() {
      this.fetchingRequests = true;
      axios
        .get(
          "https://wacs2.herokuapp.com/api/v1/creditor/Request/view",
          {
            headers: {
              "x-api-key":
                "PMAK-5e68f691b9867b002aa8f289-dc8516605218b3d250fe4da3a28142662c"
            }
          }
        )
        .then(res => {
          console.log(res.data)
          this.fetchingRequests = false;
          this.loanRequests = res.data;
        });
      // .catch(err => {
      //     console.log('err', err);
      // });
    }
  },
  mounted() {
    this.fetchLoanRequests();
  }
};
</script>

<style >
.requests-header {
  padding: 10px 2%;
  background-color: white !important;
  align-items: center;
  color: #a1a1a1;
}

.filter-by {
  margin-left: auto;
  padding: 7px 5px;
  background-color: #f8f8f8;
  position: relative;
}
</style>
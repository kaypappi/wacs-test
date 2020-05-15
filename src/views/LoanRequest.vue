<template>
  <div>
    <div class="page-filters requests-header">
      <div class="requests-no">50 Loan Requests</div>
      <SearchFilterInput
        placeholder="Search by name, ippiss No"
        v-model="searchTerm"
        :onSearch="()=>{}"
      />
      <!-- <div class="day-options">
        <template v-for="(option,index) in dayOptions">
          <span
            :class="[option===activeOption? 'isActive' : '']"
            :key="index"
            @click="activeOption=option"
          >{{option}}</span>
        </template>
      </div>-->
      <FilterDropdown></FilterDropdown>
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingRequests"
      class="page-loader"
    />
    <Table
      :tableHeaders="['Date', 'Name', 'Ippiss No.', 'Mont. Salary', 'Loan Request', 'Status']"
      v-else
    >
      <LoanRequestTableRow
        v-for="loanRequest in requests"
        :key="loanRequest.id"
        :id="loanRequest.id"
        :date="loanRequest.date"
        :name="loanRequest.user_info.full_name"
        :ippissNo="loanRequest.user_info.ippiss_number"
        :salary="loanRequest.user_info.monthly_salary"
        :loanRequest="loanRequest.amount"
        :status="loanRequest.status"
      />
    </Table>
  </div>
</template>

<script>
import axios from "axios";
import SearchFilterInput from "../components/Inputs/SearchFilterInput";
import Table from "../components/Table/Table";
import LoanRequestTableRow from "../components/Table/LoanRequestTableRow";
import FilterDropdown from "../components/Dropdown/FilterDropdown";

export default {
  components: {
    SearchFilterInput,
    Table,
    LoanRequestTableRow,
    FilterDropdown
  },
  data() {
    return {
      searchTerm: "",
      loanRequests: [],
      fetchingRequests: true,
      dayOptions: ["Today", "Last 7days", "30 days", "1 year"],
      activeOption: "Today"
    };
  },
  methods: {
    fetchLoanRequests() {
      this.fetchingRequests = true;
      axios
        .get("https://wacs2.herokuapp.com/api/v1/creditor/Request/view", {
          headers: {
            "x-api-key":
              "PMAK-5e68f691b9867b002aa8f289-dc8516605218b3d250fe4da3a28142662c"
          }
        })
        .then(res => {
          console.log(res.data);
          this.fetchingRequests = false;
          this.loanRequests = res.data;
        });
      // .catch(err => {
      //     console.log('err', err);
      // });
    }
  },
  computed: {
    requests() {
      let requests = this.loanRequests.data;
      if (this.searchTerm && requests) {
        requests = requests.filter(row => {
          return Object.keys(row).some(key => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(this.searchTerm.toLowerCase()) > -1
            );
          });
        });
      }
      return requests;
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

.isActive {
  border: 1px solid #cccccc;
  background-color: #f8f8f8;
  color: #27be58;
}
.day-options {
  display: flex;
  color: #424242;
  font-weight: 500;
  justify-content: space-between;
}

.day-options span {
  padding: 4px 10px;
  cursor: pointer;
}
</style>
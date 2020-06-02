<template>
  <div>
    <div class="page-filters requests-header">
      <div class="day-options">
        <template v-for="(option,index) in dayOptions">
          <span
            :class="[option===activeOption? 'isActive' : '']"
            :key="index"
            @click="filterQuickDates(option)"
          >{{option}}</span>
        </template>
      </div>

      <LoanRequestFilter :isLoading="fetchingRequests"  />
      <div class="right-search">
        <SearchFilterInput
          placeholder="Search by name, ippiss No"
          v-model="searchTerm"
          :onSearch="enterSearch"
        />
      </div>
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingRequests"
      class="page-loader"
    />
    <template v-else>
      <template v-if="searchFound===false">
        <NoData>
          <template v-slot:title>
            <h4>Not Found</h4>
          </template>
          <template v-slot:subtitle>
            <p>The data you are searching for could not be found</p>
          </template>
        </NoData>
      </template>
      <Table
        v-else-if="loanRequests.data"
        :tableHeaders="['Date', 'Name', 'Ippiss No.', 'Mont. Salary', 'Loan Request', 'Status']"
      >
        <template>
          <LoanRequestTableRow
            v-for="loanRequest in requests"
            :userData="loanRequest"
            :key="loanRequest.id"
            :id="loanRequest.id"
            :date="loanRequest.date"
            :name="loanRequest.user.full_name"
            :ippissNo="loanRequest.user.ippis_number"
            :salary="loanRequest.user.monthly_salary"
            :loanRequest="loanRequest.amount"
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
    <Pagination
          v-if="!searchTerm && loanRequests.meta && searchFound"
          :total="loanRequests.meta.total"
          :currentPage="loanRequests.meta.current_page"
          :lastPage="loanRequests.meta.last_page"
          :from="loanRequests.meta.from"
          :to="loanRequests.meta.to"
        />
  </div>
</template>

<script>
import axios from "axios";
import SearchFilterInput from "../components/Inputs/SearchFilterInput";
import Table from "../components/Table/Table";
import LoanRequestTableRow from "../components/Table/LoanRequestTableRow";
import LoanRequestFilter from "../components/Dropdown/LoanRequestFilter";
import { baseUrl } from "../router/api_routes";
import moment from "moment";
import NoData from "../components/NoData";
import Pagination from "../components/Pagination/Pagination"

export default {
  components: {
    SearchFilterInput,
    Table,
    LoanRequestTableRow,
    LoanRequestFilter,
    NoData,
    Pagination
  },
  data() {
    return {
      searchTerm: "",
      searchFound: true,
      loanRequests: [],
      fetchingRequests: true,
      dayOptions: ["Today", "Last 7days", "30 days"],
      activeOption: ""
    };
  },
  methods: {
    fetchLoanRequests(query) {
      this.fetchingRequests = true;
      const URL = baseUrl + "creditor/request/view?" + this.serialize(query);
      axios.get(URL).then(response => {

        this.fetchingRequests = false;
        if (response.data.data.length === 0) {
            this.searchFound = false;
          } else {
            this.loanRequests = { ...response.data };
            this.searchFound = true;
          }
      });
    },
    filterLoanRequests(data) {
      this.loanRequests = { ...data };
      this.activeOption = "";
    },
    filterQuickDates(type) {
      this.activeOption === type
        ? (this.activeOption = "")
        : (this.activeOption = type);

      if (this.activeOption) {
        let startDate = moment().format("YYYY-MM-DD"),
          endDate = "";
        if (type === "Today") {
          endDate = startDate;
        } else if (type === "Last 7days") {
          endDate = moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD");
        } else {
          endDate = moment()
            .subtract(1, "month")
            .format("YYYY-MM-DD");
        }

        const date = `${endDate}.${startDate}`;
        this.$router.push({ name: "loanRequest", query: { date } });
      } else {
        this.$router.push({ name: "loanRequest", query: {} });
      }
    },
    enterSearch(){
      if(this.searchTerm){
        this.$router.push({ name: 'loanRequest', query: {search:this.searchTerm} })
      }
      else{
        this.searchFound=true
      }
    },
    searchRequests(query) {
      if (this.searchTerm) {
        const URL = baseUrl + `creditor/request/search/${query.search}`;
        this.fetchingRequests = true;
        axios.get(URL).then(response => {
          this.fetchingRequests = false;
          if (response.data.data.length === 0) {
            this.searchFound = false;
            this.fetchingRequests = false;
          } else {
            this.loanRequests = { ...response.data };
            this.searchTerm = "";
            this.searchFound = true;
            this.fetchingRequests = false;
          }
        });
      } else {
        this.searchFound = true;
      }
    },
    toggleSearchFound(state) {
      this.searchFound = state;
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
    },
  },
  mounted() {
    this.fetchLoanRequests(this.$router.history.current.query);
  },
  watch: {
    "$route.query": {
      handler(query) {
        if(query.search){
          return this.searchRequests(query)
        }
        else{
          this.fetchLoanRequests(query)
        }
      },
      deep: true
    }
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
  font-size: 14px;
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
  font-size: 14px;
  justify-content: space-between;
}

.day-options span {
  padding: 4px 10px;
  cursor: pointer;
}

.right-search {
  margin-left: auto;
  display: flex;
}
</style>
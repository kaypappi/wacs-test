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

      <LoanRequestFilter :isLoading="isFetching" />
      <div class="right-search">
        <SearchFilterInput
          placeholder="Search by name, IPPIS No"
          :value="getSearchTerm()"
          :onSearch="enterSearch"
          @input="handleSearch($event)"
        />
      </div>
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isFetching"
      class="page-loader"
    />
    <template v-else>
      <template v-if="!searchFound">
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
        v-else-if="loanRequests"
        :tableHeaders="['Date', 'Name', 'IPPIS Number', 'Monthly Salary', 'Loan Request', 'Status']"
      >
        <template>
          <LoanRequestTableRow
            v-for="loanRequest in requests"
            :userData="loanRequest"
            :key="loanRequest.id"
            :id="loanRequest.id"
            :date="loanRequest.date"
            :name="loanRequest.user.full_name"
            :ippissNo="loanRequest.user.user_name"
            :salary="$options.filters.number(loanRequest.user.profile.monthly_salary,'0,0')"
            :loanRequest="$options.filters.number(loanRequest.amount,'0,0')"
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
      <Pagination
        v-if="loanRequests.meta && searchFound"
        :total="loanRequests.meta.total"
        :currentPage="loanRequests.meta.current_page"
        :lastPage="loanRequests.meta.last_page"
        :from="loanRequests.meta.from"
        :to="loanRequests.meta.to"
      />
    </template>
  </div>
</template>

<script>
//import axios from "axios";
import SearchFilterInput from "../../components/Inputs/SearchFilterInput";
import Table from "../../components/Table/Table";
import LoanRequestTableRow from "../../components/Table/LoanRequestTableRow";
import LoanRequestFilter from "../../components/Dropdown/LoanRequestFilter";
// import { baseUrl } from "../router/api_routes";
import moment from "moment";
import NoData from "../../components/NoData";
import Pagination from "../../components/Pagination/Pagination";

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
      fetchingRequests: false,
      dayOptions: ["Today", "Last 7days", "30 days"],
      activeOption: ""
    };
  },
  methods: {
    fetchLoanRequests(query) {
      this.$store.dispatch("CreditorLoanRequest/fetchLoanRequests", query);
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
    enterSearch() {
      if (this.getSearchTerm()) {
        this.$router.push({
          name: "loanRequest",
          query: { search: this.getSearchTerm() }
        });
      } else {
        this.$store.dispatch("CreditorLoanRequest/updateSearchFound", true);
      }
    },

    searchRequests(query) {
      if (this.getSearchTerm()) {
        return this.$store.dispatch("CreditorLoanRequest/searchRequest", query);
      } else {
        this.$store.dispatch("CreditorLoanRequest/updateSearchFound", true);
      }
    },
    toggleSearchFound(state) {
      this.searchFound = state;
    },
    getSearchTerm() {
      return this.$store.state.CreditorLoanRequest.searchTerm;
    },
    handleSearch(event) {
      return this.$store.dispatch(
        "CreditorLoanRequest/updateSearchTerm",
        event
      );
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    requests() {
      let requests = this.$store.state.CreditorLoanRequest.loanRequests.data;
      if (this.getSearchTerm() && requests) {
        requests = requests.filter(row => {
          return Object.keys(row).some(key => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(this.getSearchTerm().toLowerCase()) > -1
            );
          });
        });
      }
      return requests;
    },

    searchFound() {
      return this.$store.state.CreditorLoanRequest.searchFound;
    },
    loanRequests() {
      return this.$store.state.CreditorLoanRequest.loanRequests;
    },
    isFetching() {
      return this.$store.state.CreditorLoanRequest.isFetchingLoanRequests;
    }
  },
  mounted() {
    this.fetchLoanRequests(this.$router.history.current.query);
  },
  watch: {
    "$route.query": {
      handler(query) {
        if (query.search) {
          return this.searchRequests(query);
        } else {
          this.fetchLoanRequests(query);
        }
      },
      deep: true,
      immediate:true
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
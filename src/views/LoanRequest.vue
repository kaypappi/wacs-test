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
import SearchFilterInput from "../components/Inputs/SearchFilterInput";
import Table from "../components/Table/Table";
import LoanRequestTableRow from "../components/Table/LoanRequestTableRow";
import LoanRequestFilter from "../components/Dropdown/LoanRequestFilter";
// import { baseUrl } from "../router/api_routes";
import moment from "moment";
import NoData from "../components/NoData";
import Pagination from "../components/Pagination/Pagination";

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
      query = this.serialize(query);
      this.$store.dispatch("LoanRequest/fetchLoanRequests", query);
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
        this.$store.dispatch("LoanRequest/updateSearchFound", true);
      }
    },

    searchRequests(query) {
      if (this.getSearchTerm()) {
        return this.$store.dispatch("LoanRequest/searchRequest", query);
      } else {
        this.$store.dispatch("LoanRequest/updateSearchFound", true);
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
    getSearchTerm() {
      return this.$store.state.LoanRequest.searchTerm;
    },
    handleSearch(event) {
      return this.$store.dispatch("LoanRequest/updateSearchTerm", event);
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    requests() {
      let requests = this.$store.state.LoanRequest.loanRequests.data;
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
      return this.$store.state.LoanRequest.searchFound;
    },
    loanRequests() {
      return this.$store.state.LoanRequest.loanRequests;
    },
    isFetching() {
      return this.$store.state.LoanRequest.isFetchingLoanRequests;
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
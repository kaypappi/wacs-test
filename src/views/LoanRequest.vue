<template>
  <div>
    <div class="page-filters requests-header">
      <!-- <div class="requests-no">50 Loan Requests</div> -->

      <div class="day-options">
        <template v-for="(option,index) in dayOptions">
          <span
            :class="[option===activeOption? 'isActive' : '']"
            :key="index"
            @click="filterQuickDates(option)"
          >{{option}}</span>
        </template>
      </div>

      <LoanRequestFilter :toggleFound="toggleSearchFound" :filterRequests="filterLoanRequests" />
      <div class="right-search">
        <SearchFilterInput
          placeholder="Search by name, ippiss No"
          v-model="searchTerm"
          :onSearch="searchRequests"
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
            :key="loanRequest.id"
            :id="loanRequest.id"
            :date="loanRequest.date"
            :name="loanRequest.user_info.full_name"
            :ippissNo="loanRequest.user_info.ippis_number"
            :salary="loanRequest.user_info.monthly_salary"
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

export default {
  components: {
    SearchFilterInput,
    Table,
    LoanRequestTableRow,
    LoanRequestFilter,
    NoData
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
    fetchLoanRequests() {
      this.fetchingRequests = true;
      const URL=baseUrl+"creditor/request/view"
      axios
        .get(URL)
        .then(res => {
          console.log(res.data)
          this.fetchingRequests = false;
          this.searchFound = true;
          this.loanRequests = res.data;
        });
      // .catch(err => {
      //     console.log('err', err);
      // });
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

        const date = `date=${endDate}.${startDate}`;
        const URL = baseUrl + `creditor/request/view?` + date;
        this.fetchingRequests = true;
        axios.get(URL).then(response => {
          this.fetchingRequests = false;
          if (response.data.data.length === 0) {
            this.searchFound = false;
          } else {
            this.loanRequests = { ...response.data };
            this.searchFound = true;
          }
        });
      } else {
        this.fetchLoanRequests();
      }

      //console.log(startDate, endDate);
    },
    searchRequests() {
      if (this.searchTerm) {
        const URL = baseUrl + `creditor/request/search/${this.searchTerm}`;
        this.fetchingRequests = true;
        axios.get(URL).then(response => {
          this.fetchingRequests = false;
          if (response.data.data.length === 0) {
            this.searchFound = false;
          } else {
            this.loanRequests = { ...response.data };
            this.searchTerm = "";
            this.searchFound = true;
          }
        });
      } else {
        this.searchFound = true;
      }
    },
    toggleSearchFound(state) {
      this.searchFound = state;
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
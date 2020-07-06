<template>
  <div class="loan-request-wrapper">
    <div class="page-filters">
      <SearchFilterInput
        placeholder="Search by MDA, IPPIS No."
        :value="getSearchTerm()"
        :onSearch="enterSearch"
        @input="handleSearch($event)"
      />
      <div class="start-date">
        <DateField
          @changed="handleText($event,'from')"
          id="start-datePicker"
          placeholders="Start date"
          :value="filters.from"
        />
        <span class="date-separator">-</span>
        <DateField
          @changed="handleText($event,'to')"
          id="end-datePicker"
          placeholders="End date"
          :value="filters.to"
        />
      </div>

      <div class="filter-buttons">
        <div @click="applyFilter">
          <SubmitButton name="Apply Filter"  />
        </div>
        <div class="clear">
          <Botton :onclick="clearFilters" type="button">Clear</Botton>
        </div>
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
        :tableHeaders="['Date', 'Name', 'IPPIS Number','MDA', 'Monthly Salary', 'Loan Request','Bank', 'Status']"
      >
        <template>
          <LoanRequestTable
            v-for="loanRequest in requests"
            :userData="loanRequest"
            :key="loanRequest.id"
            :id="loanRequest.id"
            :date="loanRequest.date"
            :name="loanRequest.user.full_name"
            :ippissNo="loanRequest.user.user_name"
            :mda="loanRequest.user.profile.mda"
            :creditAdmin="loanRequest.offer.company.name"
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
    </template>
    <Pagination
      v-if=" loanRequests.meta && searchFound"
      :total="loanRequests.meta.total"
      :currentPage="loanRequests.meta.current_page"
      :lastPage="loanRequests.meta.last_page"
      :from="loanRequests.meta.from"
      :to="loanRequests.meta.to"
    />
  </div>
</template>

<script>
import DateField from "../../components/Inputs/DateField";
import SearchFilterInput from "../../components/Inputs/SearchFilterInput";
import Botton from "../../components/Buttons/Botton";
import SubmitButton from "../../components/Buttons/SubmitButton";
import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import NoData from "../../components/NoData";
import LoanRequestTable from "../../components/Admin/AdminLoanRequestTable";
export default {
  components: {
    DateField,
    SearchFilterInput,
    Botton,
    SubmitButton,
    Table,
    NoData,
    Pagination,
    LoanRequestTable
  },
  data() {
    return {
      filters: {
        from: "",
        to: ""
      }
    };
  },
  methods: {
    getSearchTerm() {
      return this.$store.state.AdminLoanRequest.searchTerm;
    },
    enterSearch() {
      if (this.getSearchTerm()) {
        this.$router.push({
          name: "adminLoanRequest",
          query: { search: this.getSearchTerm() }
        });
      } else {
        this.$store.dispatch("AdminLoanRequest/updateSearchFound", true);
      }
    },
    handleText(event, position) {
      this.filters[position] = event;
    },
    applyFilter() {
      const data = {};
      if (this.filters.from && this.filters.to) {
        data.date = `${this.filters.from}.${this.filters.to}`;
        this.$router.push({ name: "adminLoanRequest", query: { ...data } });
      }
    },
    clearFilters() {
      this.filters = {
        from: "",
        to: ""
      };
    },

    searchRequests(query) {
      if (this.getSearchTerm()) {
        return this.$store.dispatch(
          "AdminLoanRequest/AdminSearchLoanRequest",
          query
        );
      } else {
        this.$store.dispatch("AdminLoanRequest/updateSearchFound", true);
      }
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
    handleSearch(event) {
      return this.$store.dispatch("AdminLoanRequest/updateSearchTerm", event);
    },
    fetchLoanRequests(query) {
      query = this.serialize(query);
      this.$store.dispatch("AdminLoanRequest/fetchAdminLoanRequests", query);
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    requests() {
      let requests = this.$store.state.AdminLoanRequest.loanRequests.data;
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
      return this.$store.state.AdminLoanRequest.searchFound;
    },
    loanRequests() {
      return this.$store.state.AdminLoanRequest.loanRequests;
    },
    isFetching() {
      return this.$store.state.AdminLoanRequest.isFetchingLoanRequests;
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

<style>
.filter-buttons {
  display: flex;
  margin: 0 30px;
}
.filter-buttons button {
  height: 35px;
  width: 133px;
  background-color: #27be58;
  font-size: 16px;
  border: none;
  color: #ffffff;
  font-family: "Work Sans";
}

.filter-buttons .clear button {
  background-color: white;
  box-sizing: border-box;
  color: #27be58;
}

.date-separator {
  margin: 0 15px;
}

.loan-request-wrapper .page-filters .start-date {
    margin: 0 0 0 30px;
    display: flex;
    align-items: center;
}
</style>
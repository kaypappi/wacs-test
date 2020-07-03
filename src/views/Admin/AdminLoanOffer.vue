<template>
  <div class="loan-offers-wrapper">
    <!-- <Toast
      :show="toast.show"
      :title="toast.title"
      :successMessage="toast.message"
      :failureMessage="toast.message"
      :success="toast.success"
    /> -->
    <div class="page-filters">
      <!-- <div class="requests-no"><span v-if="loanOffers.meta">{{loanOffers.meta.total}}</span> Loan Offers</div> -->
      <SearchFilterInput
        placeholder="Search by code,title"
        :value="getSearchTerm()"
        :onSearch="enterSearch"
        @input="handleSearch($event)"
      />
      <LoanOffersFilter :isLoading="isFetching"></LoanOffersFilter>
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isFetching"
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
        v-else-if="loanOffers"
        :tableHeaders="['Date', 'Code', 'Title','Amount','Bank', 'Interest','Duration','Status']"
      >
        <template>
          <AdminLoanOffersTable
            v-for="loanOffer in offers"
            :userData="loanOffers"
            :key="loanOffer.id"
            :id="loanOffer.id"
            :date="loanOffer.date"
            :code="loanOffer.code_name"
            :title="loanOffer.title"
            :amount_from="formatNumber(loanOffer.amount_from)"
            :amount_to="formatNumber(loanOffer.amount_to)"
            :status="loanOffer.status"
            :interest="loanOffer.interest_rate"
            :duration="loanOffer.payback_period"
            :bank="loanOffer.company.name"
          />
        </template>
      </Table>
      <template v-else>
        <NoData>
          <template v-slot:title>
            <h4>No Loan Offers</h4>
          </template>
          <template v-slot:subtitle>
            <p>There are no loan offers yet. Create one above.</p>
          </template>
        </NoData>
      </template>
    </template>
    <Pagination
      v-if="!searchTerm && loanOffers.meta && searchFound"
      :total="loanOffers.meta.total"
      :currentPage="loanOffers.meta.current_page"
      :lastPage="loanOffers.meta.last_page"
      :from="loanOffers.meta.from"
      :to="loanOffers.meta.to"
    />
  </div>
</template>

<script>
import LoanOffersFilter from "../../components/Dropdown/AdminLoanOffersFilter";
//import Toast from "../../components/Toast";
import NoData from "../../components/NoData";
import SearchFilterInput from "../../components/Inputs/SearchFilterInput";
import Pagination from "../../components/Pagination/Pagination";
import AdminLoanOffersTable from "../../components/Admin/AdminLoanOffersTable";
import Table from "../../components/Table/Table";
export default {
  components: {
    LoanOffersFilter,
    //Toast,
    SearchFilterInput,
    NoData,
    Pagination,
    AdminLoanOffersTable,
    Table
  },
  data() {
    return {
      errors: {},
      searchTerm: "",
      creatingOffer: false,
      fetchingOffers: false,
      addOffer: {
        moratorium_principal: 0,
        payback_period: 0
      },
      formValues: null
    };
  },
  methods: {
    handleText(event, type) {
      this.addOffer[type] = event;
    },
    onHide() {
      this.addOffer = {};
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
      return this.$store.dispatch("AdminLoanOffer/updateSearchTerm", event);
    },
    fetchLoanOffers(query) {
      this.$store.dispatch("AdminLoanOffer/fetchLoanOffers", this.serialize(query));
    },
    enterSearch() {
      if (this.getSearchTerm()) {
        this.$router.push({
          name: "loanOffers",
          query: { search: this.getSearchTerm() }
        });
      } else {
        this.$store.dispatch("AdminLoanOffer/updateSearchFound", true);
      }
    },
    searchLoanOffer(query) {
      if (this.getSearchTerm()) {
        return this.$store.dispatch("AdminLoanOffer/searchOffers", query);
      } else {
        this.$store.dispatch("AdminLoanOffer/updateSearchFound", true);
      }
    },
    getSearchTerm() {
      return this.$store.state.AdminLoanOffer.searchTerm;
    },
    formatNumberField(num, position) {
      num = this.stripString(num);
      this.addOffer[position] = Number(num).toLocaleString();
    },
    stripString(data) {
      return data.toString().replace(/,/g, "");
    }
  },
  computed: {
    offers() {
      let loanOffers = this.$store.state.AdminLoanOffer.loanOffers.data;
      if (this.getSearchTerm() && loanOffers) {
        loanOffers = loanOffers.filter(row => {
          return Object.keys(row).some(key => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(this.getSearchTerm().toLowerCase()) > -1
            );
          });
        });
      }
      return loanOffers;
    },
    loanOffers() {
      return this.$store.state.AdminLoanOffer.loanOffers;
    },
    searchFound() {
      return this.$store.state.AdminLoanOffer.searchFound;
    },
    isFetching() {
      return this.$store.state.AdminLoanOffer.fetchingOffers;
    },

    /* toast() {
      return this.$store.state.AdminLoanOffer.toast;
    }, */
    fValue: {
      // getter
      get: function(position) {
        return this.addOffer[position];
      },
      // setter
      set: function(newValue, position) {
        newValue = newValue.replace(",", "");
        this.addOffer[position] = newValue
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
    }
  },
  mounted() {
    this.fetchLoanOffers(this.$router.history.current.query);
  },
  watch: {
    "$route.query": {
      handler(query) {
        if (query.search) {
          this.searchLoanOffer(query);
        } else {
          this.fetchLoanOffers(query);
        }
      },
      deep: true
    }
  }
};
</script>

<style >
.page-filters {
  align-items: center;
  padding: 0 30px;
  background-color: white;
  color: #a1a1a1;
}

.inputClasses {
  width: inherit;
  background: #f8f8f8;
  background-color: #f8f8f8 !important;
  border: 1px solid #cccccc;
  padding: 10px;
}

.description {
  margin-top: 15px;
}

.cot {
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.filter-by {
  margin-left: 20px;
}
.cta-div {
  padding: 3px 0px 3px 3px;
  border-left: 0px;
}
.no-offers {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.no-offers img {
  margin-bottom: 20px;
}
</style>
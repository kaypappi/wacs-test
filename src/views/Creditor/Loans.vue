<template>
  <div class="repayments-wrapper">
    <div class="page-filters">
      <!-- <div class="start-date">
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
      </div>-->
    </div>
    <template v-if="!fetchingLoansReport">
      <div class="schedule-wrapper">
        <LoansReportTable v-if="allLoansReport" :repayments="allLoansReport.data" />
      </div>
      <Pagination
        v-if="allLoansReport"
        :total="allLoansReport.data.meta.total"
        :currentPage="allLoansReport.data.meta.current_page"
        :lastPage="allLoansReport.data.meta.last_page"
        :from="allLoansReport.data.meta.from"
        :to="allLoansReport.data.meta.to"
      />
    </template>
    <img src="/assets/images/page-ring-loader.svg" alt="loader" v-else class="page-loader" />
  </div>
</template>

<script>
//import DateField from "../../components/Inputs/DateField";
//import RepaymentScheduleTable from "../../components/Table/RepaymentScheduleTable";
import Pagination from "../../components/Pagination/Pagination";
import LoansReportTable from "../../components/Table/LoansReportTable";
export default {
  components: {
    //DateField,
    LoansReportTable,
    Pagination
  },
  data() {
    return {
      repayments: {},
      filters: {
        from: "",
        to: ""
      }
    };
  },
  methods: {
    async fetchLoansReport(query) {
      const response = await this.$store.dispatch(
        "CreditorLoanRequest/getAllLoansReport",
        query
      );
      return response;
    },
    handleText(event, position) {
      this.filters[position] = event;
      const data = {};
      if (this.filters.from && this.filters.to) {
        data.date = `${this.filters.from}.${this.filters.to}`;
        this.$router.push({ name: "repayments", query: { ...data } });
      } else {
        this.$router.push({ name: "repayments", query: {} });
      }
    }
  },

  computed: {
    allLoansReport() {
      return this.$store.state.CreditorLoanRequest.allLoansReport;
    },
    fetchingLoansReport() {
      return this.$store.state.CreditorLoanRequest.fetchingLoansReport;
    }
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.fetchLoansReport(query);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style >
.repayments-wrapper .page-filters {
  padding: 3px 30px;
}
.page-filters .start-date {
  margin-right: 30px;
  display: flex;
  align-items: center;
}
.date-separator {
  margin: 0 30px;
}
</style>
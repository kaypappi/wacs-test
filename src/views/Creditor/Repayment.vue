<template>
  <div class="repayments-wrapper">
    <div class="page-filters">
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
    </div>
    <template v-if="!fetchingRepayment">
      <div class="schedule-wrapper">
        <RepaymentScheduleTable v-if="allRepayments" :repayments="allRepayments.data" />
      </div>
      <Pagination
        v-if="allRepayments"
        :total="allRepayments.meta.total"
        :currentPage="allRepayments.meta.current_page"
        :lastPage="allRepayments.meta.last_page"
        :from="allRepayments.meta.from"
        :to="allRepayments.meta.to"
      />
    </template>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-else
      class="page-loader"
    />
  </div>
</template>

<script>
import DateField from "../../components/Inputs/DateField";
import RepaymentScheduleTable from "../../components/Table/RepaymentScheduleTable";
import Pagination from "../../components/Pagination/Pagination";
export default {
  components: {
    DateField,
    RepaymentScheduleTable,
    Pagination
  },
  data() {
    return {
      fetchingRepayments: false,
      repayments: {},
      filters: {
        from: "",
        to: ""
      }
    };
  },
  methods: {
    async fetchRepayments(query) {
      this.fetchingRepayments = true;
      const response = await this.$store.dispatch("CreditorLoanRequest/getAllRepayments", query);
      this.fetchingRepayments = false;
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
  mounted() {
    this.fetchRepayments(this.$router.history.current.query);
  },
  computed: {
    allRepayments() {
      return this.$store.state.CreditorLoanRequest.allRepayments;
    },
    fetchingRepayment(){
      return this.$store.state.CreditorLoanRequest.fetchingRepayments
    }
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.fetchRepayments(query);
      },
      deep: true
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
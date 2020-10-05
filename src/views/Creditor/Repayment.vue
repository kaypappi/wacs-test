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
    <template v-if="!fetchingRepayments">
      <div class="schedule-wrapper">
        <RepaymentScheduleTable :repayments="repayments.data" />
      </div>
      <Pagination
        v-if="repayments.meta"
        :total="repayments.meta.total"
        :currentPage="repayments.meta.current_page"
        :lastPage="repayments.meta.last_page"
        :from="repayments.meta.from"
        :to="repayments.meta.to"
      />
    </template>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingRepayments"
      class="page-loader"
    />
  </div>
</template>

<script>
import DateField from "../../components/Inputs/DateField";
import RepaymentScheduleTable from "../../components/Table/RepaymentScheduleTable";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
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
    fetchRepayments(query) {
      this.fetchingRepayments = true;
      axios.get(`creditor/repayments/reports`,{params:query}).then(response => {
        this.repayments = { ...response.data };
        this.fetchingRepayments = false;
      });
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
    }
  },
  mounted() {
    this.fetchRepayments(this.$router.history.current.query);
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
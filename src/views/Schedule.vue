<template>
  <div class="schedule-wrapper">
    <div class="page-filters">
      <div class="schedule-title">{{scheduleTitle}}</div>
      <div class="export-section">
        <span>Export as</span>
        <img src="/assets/images/pdf.svg" alt="pdf" />
        <img src="/assets/images/xls.svg" alt="pdf" />
      </div>
    </div>
    <div class="schedule-table-wrapper">
        <SingleScheduleTable v-if="schedule && !fetchingSchedule && schedule.data.length>0" :schedule="schedule.data[0].breakdown"/>
        <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="fetchingSchedule" class="page-loader">
    </div>
  </div>
</template>

<script>
import SingleScheduleTable from "../components/Table/SingleScheduleTable";
import { baseUrl } from "../router/api_routes";
import Axios from "axios";
export default {
  components: {
    SingleScheduleTable
  },
  data() {
    return {
      schedule: "",
      fetchingSchedule: false,
      scheduleId: "",
      scheduleTitle: ""
    };
  },
  methods: {
    getSchedule(query) {
      this.fetchingSchedule = true;
      const URL =
        baseUrl +
        `creditor/repayments/reports/${this.scheduleId}?${this.serialize(
          query
        )}`;
      Axios.get(URL).then(response => {
        this.schedule = { ...response.data };
        this.scheduleTitle = `Repayment Schedule Breakdown - ${this.schedule.data[0].schedule_number} - NGN ${this.schedule.data[0].amount}`;
        this.fetchingSchedule=false
      });
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
    this.scheduleId = this.$route.params.id;
    this.getSchedule(this.$router.history.current.query);
  }
};
</script>

<style>
.schedule-wrapper .page-filters {
  padding: 10px 30px;
  color: #424242;
  font-weight: 600;
}

.export-section {
  margin-left: auto;
  width: 200px;
  display: grid;
  font-size: 14px;
  font-weight: 400;
  grid-template-columns: 1fr 50px 50px;
  align-items: center;
  justify-items: end;
}
</style>
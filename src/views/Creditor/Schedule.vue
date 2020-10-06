<template>
  <div class="schedule-wrapper">
    <div class="page-filters">
      <div class="schedule-title">{{scheduleTitle}}</div>
      <div  v-if="schedule" class="export-section">
        <span>Export as</span>
        <img @click="downloadPdf" src="/assets/images/pdf.svg" alt="pdf" />
        <download-excel
          class="btn btn-default"
          :data="schedule.data.breakdown"
          :fields="json_fields"
          worksheet="My Worksheet"
          :name="scheduleTitle+'.xls'"
        >
          <img src="/assets/images/xls.svg" alt="pdf" />
        </download-excel>
      </div>
    </div>
    <div class="schedule-table-wrapper">
      <SingleScheduleTable
        v-if=" !fetchingSchedule && schedule"
        :schedule="schedule.data.breakdown"
      />
      <img
        src="/assets/images/page-ring-loader.svg"
        alt="loader"
        v-if="fetchingSchedule"
        class="page-loader"
      />
    </div>
  </div>
</template>

<script>
import SingleScheduleTable from "../../components/Table/SingleScheduleTable";
import JsonExcel from "vue-json-excel";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
  components: {
    SingleScheduleTable,
    downloadExcel: JsonExcel
  },
  data() {
    return {
      schedule: "",
      fetchingSchedule: false,
      scheduleId: "",
      scheduleTitle: "",
      json_fields: {
        No: "no",
        Year: "year",
        Month: "month",
        Amount: "amount"
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  methods: {
    getSchedule(query) {
      this.fetchingSchedule = true;
      this.$store.dispatch("CreditorLoanRequest/getSchedule",{query,scheduleId:this.scheduleId}).then(response => {
        this.schedule = { ...response.data };
        this.scheduleTitle = `Repayment Schedule Breakdown - ${
          this.schedule.data.name
        } - ${this.schedule.data.ippis_number} - NGN ${this.formatNumber(
          this.schedule.data.amount
        )}`;
        this.fetchingSchedule = false;
      });
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    downloadPdf() {
      let scheduleArray = [];
      this.schedule.data.breakdown.map(item => {
        scheduleArray.push(Object.values(item));
      });
      var dd = {
        content: [
          {
            text: `${this.scheduleTitle}`,
            margin: [0, 0, 0, 20]
          },
          {
            style: "tableExample",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [["No", "Year", "Month", "Amount"], ...scheduleArray]
            }
          }
        ]
      };
      pdfMake.createPdf(dd).download(`${this.scheduleTitle}`);
    },
  },
computed:{
  scheduleData(){
    return this.$store.state.CreditorLoanRequest.schedule
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
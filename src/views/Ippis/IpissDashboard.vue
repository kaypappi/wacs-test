<template>
  <div class="home-wrapper">
    <div class="top-control mb-3 d-flex justify-content-between flex-wrap">
      <!-- <div class="cv-switch">
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="btn-radios-2"
            v-model="cvSelected"
            :options="cvOptions"
            :aria-describedby="ariaDescribedby"
            name="radio-btn-outline"
            buttons
          ></b-form-radio-group>
        </b-form-group>
      </div>-->
      <DateInput v-model="dateRange" class="ml-auto" />
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="fetchingSummary"
      class="page-loader"
    />
    <div v-else class="statscard-section">
      <StatsCard icon="pie-chart" title="Total no of MDAs" :value="dashboardCount.mdas" />
      <StatsCard icon="people" title="Employees" :value="dashboardCount.employees" />
      <StatsCard icon="safe" title="Banks " :value="dashboardCount.creditors" />
    </div>

    <div class="middle-row">
      <div class="counts-per-loan-offer total-loans py-4 px-4 mb-4">
        <div class="details-top mb-3 d-flex justify-content-between align-items-center flex-wrap">
          <p class="section-title h6 mb-0">Toatal loans processed</p>
          <div class="d-flex align-items-center flex-wrap">
            <SelectField
              inputClass="small-select"
              v-model="selectedTotalLoansProcessed"
              name="Loans processed"
              :options="SelectOptions"
            />
          </div>
        </div>
        <ccv-simple-bar-chart :data="totalLoansDetails.data" :options="totalLoansDetails.options"></ccv-simple-bar-chart>
      </div>
      <div class="loan-request-chart total-loans px-4 py-4 mb-4">
        <p class="h6">Gender Ratio</p>
        <ccv-donut-chart :data="loanRequestsDetails.data" :options="loanRequestsDetails.options"></ccv-donut-chart>
      </div>
    </div>

    <div class="split-grid">
      <div class="counts-per-loan-offer total-loans py-4 px-4 mb-4">
        <div class="details-top mb-3 d-flex justify-content-between align-items-center flex-wrap">
          <p class="section-title h6 mb-0">Total Monthly Repayments</p>
          <div class="d-flex align-items-center flex-wrap">
            <SelectField
              inputClass="small-select"
              v-model="selectedTotalRepayments"
              name="Loans processed"
              :options="SelectOptions"
            />
          </div>
        </div>
        <ccv-simple-bar-chart
          :data="totalMonthlyRepayment.data"
          :options="totalMonthlyRepayment.options"
        ></ccv-simple-bar-chart>
      </div>
      <div class="loan-request-chart total-loans px-4 py-4 mb-4">
        <div class="details-top mb-3 d-flex justify-content-between align-items-center flex-wrap">
          <p class="section-title h6 mb-0">Approved Loan Count</p>
          <div class="d-flex align-items-center flex-wrap">
            <SelectField
              inputClass="small-select"
              v-model="selectedApprovedLoanCount"
              name="Loans processed"
              :options="SelectOptions"
            />
          </div>
        </div>
        <ccv-simple-bar-chart :data="approvedLoanCount.data" :options="approvedLoanCount.options"></ccv-simple-bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StatsCard from "../../components/StatsCard";
import SelectField from "../../components/Inputs/SelectField";
import DateInput from "../../components/Inputs/DateInput";
import moment from "moment";

export default {
  components: {
    StatsCard,
    SelectField,
    DateInput
  },
  data() {
    return {
      fetchingSummary: true,
      gettingTotalLoansProcessed: false,
      gettingGenderRatio: false,
      gettingApprovedLoanCount: false,
      gettingTotalRepayments:false,
      dateRange: {
        start: moment()
          .subtract(1, "month")
          .format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      },
      selected: "placeholder",
      selectedTotalLoansProcessed: "bank",
      selectedTotalRepayments: "bank",
      selectedApprovedLoanCount: "bank",
      cvSelected: "A",
      cvOptions: [
        { text: "Count", value: "A" },
        { text: "Value", value: "B" }
      ],
      SelectOptions: ["bank", "mda"]
    };
  },

  methods: {
    fetchLoanRequests(query) {
      query = this.serialize(query);
      this.$store.dispatch("CreditorLoanRequest/fetchLoanRequests", query);
    },
    async fetchRequestsSummary() {
      this.fetchingSummary = true;
      const response = await this.$store.dispatch(
        "IppisAnalytics/getDashboardCounts"
      );
      this.fetchingSummary = false;
      return response;
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
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    async getTotalLoansProcessed(data) {
      this.gettingTotalLoansProcessed = true;
      const response = await this.$store.dispatch(
        "IppisAnalytics/getTotalLoansProcessed",
        data
      );
      this.gettingTotalLoansProcessed = false;
      return response;
    },

    async getGenderRatio(date) {
      this.gettingGenderRatio = true;
      const response = await this.$store.dispatch(
        "IppisAnalytics/getGenderRatio",
        date
      );
      this.gettingGenderRatio = false;
      return response;
    },

    async getTotalRepayments(data) {
      this.gettingTotalRepayments = true;
      const response = await this.$store.dispatch(
        "IppisAnalytics/getTotalRepayments",
        data
      );
      this.gettingTotalRepayments = false;
      return response;
    },
    async getApprovedLoanCount(data) {
      this.gettingApprovedLoanCount = true;
      const response = await this.$store.dispatch(
        "IppisAnalytics/getApprovedLoanCount",
        data
      );
      this.gettingApprovedLoanCount = false;
      return response;
    }
  },
  computed: {
    loanRequests() {
      return this.$store.state.CreditorLoanRequest.loanRequests;
    },
    dashboardCount() {
      return this.$store.state.IppisAnalytics.dashboardCount;
    },
    isFetchingRequests() {
      return this.$store.state.CreditorLoanRequest.isFetchingLoanRequests;
    },
    isFetchingSummary() {
      return this.$store.state.CreditorLoanRequest.fetchingSummary;
    },
    totalLoansDetails() {
      let data = [];
      const options = {
        data: {
          loading: this.gettingTotalLoansProcessed || !this.totalLoansProcessed
        },
        axes: {
          left: {
            mapsTo: "value"
          },
          bottom: {
            mapsTo: "group",
            scaleType: "labels"
          }
        },
        height: "400px",
        color: {
          scale: {
          }
        },
        legend: {
          enabled: false
        },
        bars: {
          width: 30
        },
        grid: {
          x: {
            enabled: false
          }
        },
        tooltip: {
          customHTML(tip) {
            return `<span class='tooltip-class px-3'>${tip[0].group}  ${tip[0].value}</span>`;
          }
        }
      };

      if (this.totalLoansProcessed) {
        const colors = {};
        data = this.totalLoansProcessed.map(item => {
          if (this.selectedTotalLoansProcessed === "bank") {
            colors[item.bank] = "#23699F";
            return { group: item.bank, value: item.sum };
          } else {
            colors[item.mda] = "#23699F";
            return { group: item.mda, value: item.sum };
          }
        });

        options.color = {
          scale: colors
        };
      }

      return { data, options };
    },
    totalMonthlyRepayment() {
      let data = [];

      const options = {
        data: {
          loading: this.gettingTotalRepayments || !this.totalRepayments
        },
        axes: {
          left: {
            mapsTo: "value"
          },
          bottom: {
            mapsTo: "group",
            scaleType: "labels"
          }
        },
        height: "400px",
        color: {
          scale: {
            
          }
        },
        legend: {
          enabled: false
        },
        bars: {
          width: 30
        },
        grid: {
          x: {
            enabled: false
          }
        },
        tooltip: {
          customHTML(tip) {
            return `<span class='tooltip-class px-3'>${tip[0].group}  ${tip[0].value}</span>`;
          }
        }
      };

      if (this.totalRepayments) {
        const colors = {};
        data = this.totalRepayments.map(item => {
          if (this.selectedTotalRepayments === "bank") {
            colors[item.bank] = "#56B7AE";
            return { group: item.bank, value: item.sum };
          } else {
            colors[item.mda] = "#56B7AE";
            return { group: item.mda, value: item.sum };
          }
        });

        options.color = {
          scale: colors
        };
      }

      return { data, options };
    },
    approvedLoanCount() {
      let data = [];
      const options = {
        data: {
          loading: this.gettingApprovedLoanCount || !this.approvedLoanCounts
        },
        axes: {
          left: {
            mapsTo: "value"
          },
          bottom: {
            mapsTo: "group",
            scaleType: "labels"
          }
        },
        height: "400px",
        color: {
          scale: {}
        },
        legend: {
          enabled: false
        },
        bars: {
          width: 30
        },
        grid: {
          x: {
            enabled: false
          }
        },
        tooltip: {
          customHTML(tip) {
            return `<span class='tooltip-class px-3'>${tip[0].group}  ${tip[0].value}</span>`;
          }
        }
      };

      if (this.approvedLoanCounts) {
        const colors = {};
        data = this.approvedLoanCounts.map(item => {
          if (this.selectedApprovedLoanCount === "bank") {
            colors[item["bank_name"]] = "#5D91B9";
            return { group: item["bank_name"], value: item.sum };
          } else {
            colors[item.mda] = "#5D91B9";
            return { group: item.mda, value: item.sum };
          }
        });

        options.color = {
          scale: colors
        };
      }

      return { data, options };
    },
    loanRequestsDetails() {
      let data = [];
      const options = {
        data: {
          loading: this.gettingGenderRatio || !this.genderRatio
        },
        resizable: true,
        legend: {
          alignment: "center"
        },
        donut: {
          alignment: "center",
          center: {
            label: "",
            numberFormatter() {
              return "";
            }
          }
        },
        color: {
          scale: {
            Male: "#3CB279",
            Female: "#EFAE73"
          }
        },
        tooltip: {
          customHTML(tip) {
            return `<span class='tooltip-class px-3'>${tip[0].value}  ${tip[0].label}</span>`;
          }
        },
        height: "400px"
      };

      if (this.genderRatio) {
        data = [
          {
            group: "Male",
            value: this.genderRatio["male_percentage"]
          },
          {
            group: "Female",
            value: this.genderRatio["female_percentage"]
          }
        ];
      }

      return { data, options };
    },
    totalLoansProcessed() {
      return this.$store.state.IppisAnalytics.totalLoansProcessed;
    },
    genderRatio() {
      return this.$store.state.IppisAnalytics.genderRatio;
    },
    totalRepayments() {
      return this.$store.state.IppisAnalytics.totalRepayments;
    },
    approvedLoanCounts() {
      return this.$store.state.IppisAnalytics.approvedLoanCount;
    }
  },

  watch: {
    dateRange: {
      handler(dateRange) {
        if (dateRange.end) {
          const data = {
            start: this.dateRange.start,
            end: this.dateRange.end,
            search: this.selectedTotalLoansProcessed
          };
          const repaymentsData = {
            ...data,
            search: this.selectedTotalRepayments
          };
          const approvedLoanCountData = {
            ...data,
            search: this.selectedApprovedLoanCount,
            status: "approved"
          };
          this.getTotalLoansProcessed(data);
          this.getGenderRatio(this.dateRange);
          this.getTotalRepayments(repaymentsData);
          this.getApprovedLoanCount(approvedLoanCountData);
        }
      },
      immediate: true,
      deep: true
    },
    selectedTotalLoansProcessed: {
      handler(selectedTotalLoansProcessed) {
        const data = {
          start: this.dateRange.start,
          end: this.dateRange.end,
          search: selectedTotalLoansProcessed
        };
        this.getTotalLoansProcessed(data);
      }
    },
    selectedTotalRepayments:{
      handler(selectedTotalRepayments){
        const data = {
          start: this.dateRange.start,
          end: this.dateRange.end,
          search: selectedTotalRepayments,
        };
        this.getTotalRepayments(data)
      }
    },
    selectedApprovedLoanCount:{
      handler(selectedApprovedLoanCount){
        const data = {
          start: this.dateRange.start,
          end: this.dateRange.end,
          search: selectedApprovedLoanCount,
          status:"approved"
        };
        this.getApprovedLoanCount(data)
      }
    }
  },
  mounted() {
    this.fetchRequestsSummary();
    //this.fetchLoanRequests(this.$router.history.current.query);
  }
};
</script>

<style scoped>
.statscard-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
  margin-bottom: 40px;
}
.home-wrapper {
  padding: 20px;
}

.home-wrapper .recent-requests {
  border-radius: 5px;
}

.home-wrapper .recent-requests-top {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
}

.recent-requests-top .view-all {
  color: #27be58;
  cursor: pointer;
}

.total-loans {
  border: 1px solid #dee4df;
  border-radius: 6px;
}

.home-wrapper >>> .tooltip-class {
  border-radius: 4px;
  background-color: #2d2e2e;
  box-shadow: 0 2px 4px 0 rgba(188, 188, 188, 0.5);
  color: white;
  padding: 10px 20px;
}

.small-select {
  max-width: 200px;
}

.subtitle {
  color: #b4b4b4;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
}

.cv-switch {
  border: 1px solid #d8ded9;
  border-radius: 4px;
  height: fit-content;
  padding: 2px;
}

.cv-switch .form-group {
  margin-bottom: 0;
}

.cv-switch >>> label.btn {
  background-color: transparent;
  border: none;
  color: #424242;
  font-size: 13px;
}

.cv-switch >>> label.btn.active {
  background-color: #c7e9cf;
  color: #095f1d;
  font-family: "Work Sans";
  font-size: 13px;
}

.middle-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
}
.split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
@media screen and (max-width: 768px) {
  .middle-row {
    grid-template-columns: 1fr;
  }
  .split-grid {
    grid-template-columns: 1fr;
  }
}
</style>

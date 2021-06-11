<template>
  <div class="home-wrapper">
    <div class="top-control mb-3 d-flex justify-content-between flex-wrap">
      <div class="cv-switch">
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
      </div>
      <DateInput v-model="dateRange" />
    </div>
    <img
      src="/assets/images/page-ring-loader.svg"
      alt="loader"
      v-if="isFetchingSummary"
      class="page-loader"
    />
    <div v-else class="statscard-section">
      <StatsCard
        icon="pie-chart"
        title="Total Requests"
        :value="cvSelected==='A'? requestsSummary.total:requestsSummary.total_sum"
      />
      <StatsCard
        icon="clock"
        title="Pending"
        :value="cvSelected==='A'? requestsSummary.pending:requestsSummary.pending_sum"
      />
      <StatsCard
        icon="loading-process"
        title="Running "
        :value="cvSelected==='A'? requestsSummary.running:requestsSummary.running_sum"
      />
      <StatsCard
        icon="safe"
        title="Bank Approved"
        :value="cvSelected==='A'? requestsSummary.bank_approved:requestsSummary.bank_approved_sum"
      />
      <StatsCard
        icon="alarm"
        title="Awaiting IPPIS"
        :value="cvSelected==='A'? requestsSummary.awaiting_ippis:requestsSummary.awaiting_ippis_sum"
      />
      <StatsCard
        icon="x-circle"
        title="Rejected "
        :value="cvSelected==='A'? requestsSummary.rejected:requestsSummary.rejected_sum"
      />
    </div>

    <div class="total-loans py-4 px-4 mb-4" id="chart-1">
      <ccv-simple-bar-chart :data="totalLoansDetails.data" :options="totalLoansDetails.options"></ccv-simple-bar-chart>
    </div>

    <div class="middle-row">
      <div class="counts-per-loan-offer total-loans py-4 px-4 mb-4">
        <div class="details-top mb-3 d-flex justify-content-between align-items-center flex-wrap">
          <p class="section-title h6 mb-0">Total Loan Issued</p>
          <div class="d-flex align-items-center flex-wrap">
            <label class="mb-0 mr-md-2 h6" for="Loan Offers">Loan Offers</label>
            <SelectField
              inputClass="small-select"
              v-model="selectedLoanOffer"
              name="Loan Offers"
              :options="loanOffersOptions"
            />
          </div>
        </div>
        <ccv-simple-bar-chart
          :data="countsPerLoanDetails.data"
          :options="countsPerLoanDetails.options"
        ></ccv-simple-bar-chart>
      </div>
      <div class="loan-request-chart total-loans px-4 py-4 mb-4">
        <p class="h6">Loan Request</p>
        <p class="subtitle">Conversion Indicator</p>
        <ccv-donut-chart :data="loanRequestsDetails.data" :options="loanRequestsDetails.options"></ccv-donut-chart>
      </div>
    </div>

    <div class="total-loans py-4 px-4 mb-4" id="chart-1">
      <div class="details-top mb-3 d-flex justify-content-between align-items-center flex-wrap">
        <p class="section-title h6 mb-0">Total Monthly Deductions</p>
        <div class="d-flex align-items-center flex-wrap">
          <label class="mb-0 mr-md-2 h6 fw-normal" for="Loan Offers">MDA</label>
          <SelectField inputClass="small-select" v-model="mda" name="MDA" :options="registerdMdas" />
        </div>
      </div>
      <ccv-simple-bar-chart :data="outstandingPerMda.data" :options="outstandingPerMda.options"></ccv-simple-bar-chart>
    </div>

    <div class="recent-requests">
      <div class="recent-requests-top">
        <p>Most Recent</p>
        <p @click="$router.push({name:'loanRequest'})" class="view-all">View All</p>
      </div>
      <div class="recent-request-table">
        <img
          src="/assets/images/page-ring-loader.svg"
          alt="loader"
          v-if="isFetchingRequests"
          class="page-loader"
        />
        <template v-else>
          <Table
            v-if="loanRequests.data"
            :tableHeaders="['Date', 'Name', 'IPPIS Number', 'Monthly Salary', 'Loan Request', 'Status']"
          >
            <template>
              <LoanRequestTableRow
                v-for="loanRequest in loanRequests.data"
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StatsCard from "../../components/StatsCard";
import Table from "../../components/Table/Table";
import LoanRequestTableRow from "../../components/Table/LoanRequestTableRow";
import SelectField from "../../components/Inputs/SelectField";
import DateInput from "../../components/Inputs/DateInput";
import moment from "moment";

export default {
  name: "home",
  components: {
    StatsCard,
    Table,
    LoanRequestTableRow,
    SelectField,
    DateInput
  },
  data() {
    return {
      selected: "placeholder",
      selectedLoanOffer: "",
      mda: "",
      cvSelected: "A",
      cvOptions: [
        { text: "Count", value: "A" },
        { text: "Value", value: "B" }
      ],
      SelectOptions: [
        {
          value: "placeholder",
          text: "Select Loan offers",
          disabled: true
        },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" }
      ],
      dateRange: {
        start: moment()
          .subtract(1, "month")
          .format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      },
      gettingLoanProcessedAndRequestPercent: false,
      gettingRepaymentsByMdas: false,
      gettingCountsPerLoanOffer: false
    };
  },

  methods: {
    fetchLoanRequests(query) {
      query = this.serialize(query);
      this.$store.dispatch("CreditorLoanRequest/fetchLoanRequests", query);
    },
    fetchRequestsSummary(date) {
      this.$store.dispatch("CreditorLoanRequest/requestsSummary", date);
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

    async getLoanProcessedAndRequestPercent(date) {
      this.gettingLoanProcessedAndRequestPercent = true;
      const response = await this.$store.dispatch(
        "CreditorAnalytics/getLoanProcessedAndRequestPercent",
        date
      );
      this.gettingLoanProcessedAndRequestPercent = false;
      return response;
    },

    async getRegisteredMdas(date) {
      const response = await this.$store.dispatch(
        "CreditorAnalytics/getRegisteredMdas",
        date
      );
      this.mda = response[0];
      return response;
    },
    async getRepaymentsByMdas(mda) {
      const data = {
        mda,
        year: moment().format("YYYY")
      };
      this.gettingRepaymentsByMdas = true;
      const response = await this.$store.dispatch(
        "CreditorAnalytics/repaymentByMda",
        data
      );
      this.gettingRepaymentsByMdas = false;
      return response;
    },
    async fetchLoanOffers(query) {
      const response = await this.$store.dispatch(
        "CreditorLoanOffer/fetchLoanOffers",
        query
      );
      this.selectedLoanOffer = response.data[0].id;
    },

    async getCountsPerLoanOffer(offerId, date) {
      const data = {
        offerId,
        year: moment().format("YYYY"),
        date
      };
      this.gettingCountsPerLoanOffer = true;
      const response = await this.$store.dispatch(
        "CreditorAnalytics/countsByLoanOffer",
        data
      );
      this.gettingCountsPerLoanOffer = false;
      return response;
    },
    getDaysBetweenDates(startDate, endDate) {
      (startDate = moment(startDate)), (endDate = moment(endDate).format());
      const interim = startDate.clone();
      let timeValues = [];

      while (endDate > interim) {
        timeValues.push({ group: interim.format("MMM"), value: 0 });
        interim.add(1, "month");
      }
      return timeValues;
    }
  },
  computed: {
    loanRequests() {
      return this.$store.state.CreditorLoanRequest.loanRequests;
    },
    requestsSummary() {
      return this.$store.state.CreditorLoanRequest.requestsSummary;
    },
    isFetchingRequests() {
      return this.$store.state.CreditorLoanRequest.isFetchingLoanRequests;
    },
    isFetchingSummary() {
      return this.$store.state.CreditorLoanRequest.fetchingSummary;
    },
    loanOffers() {
      return this.$store.state.CreditorLoanOffer.loanOffers;
    },
    loanOffersOptions() {
      if (this.loanOffers.data) {
        const options = this.loanOffers.data.map(item => {
          return {
            text: item.title,
            value: item.id
          };
        });
        return options;
      }
      return [];
    },
    totalLoansDetails() {
      let data = [];
      const options = {
        title: "Lender's Ranking",
        data: {
          loading: this.gettingLoanProcessedAndRequestPercent
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
        color: {},
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

      if (this.LoanProcessedAndRequestPercent) {
        data = this.LoanProcessedAndRequestPercent["total_loan_processed"].map(
          item => {
            return { group: item.bank, value: item.amount };
          }
        );

        const colors = {};
        this.LoanProcessedAndRequestPercent["total_loan_processed"].map(
          item => {
            return (colors[item.bank] = "#23699F");
          }
        );

        options.color = {
          scale: colors
        };
      }
      return { data, options };
    },
    countsPerLoanDetails() {
      let data = [
        {
          group: "Jan",
          value: 0
        },
        {
          group: "Feb",
          value: 0
        },
        {
          group: "Mar",
          value: 0
        },
        {
          group: "Apr",
          value: 0
        },
        {
          group: "May",
          value: 0
        },
        {
          group: "Jun",
          value: 0
        },
        {
          group: "Jul",
          value: 0
        },
        {
          group: "Aug",
          value: 0
        },
        {
          group: "Sep",
          value: 0
        },
        {
          group: "Oct",
          value: 0
        },
        {
          group: "Nov",
          value: 0
        },
        {
          group: "Dec",
          value: 0
        }
      ];

      let options = {
        data: {
          loading: this.countsPerLoanOfferStatus
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
        legend: {
          enabled: false
        },
        bars: {
          width: 15
        },
        grid: {
          x: {
            enabled: false
          }
        },
        tooltip: {
          customHTML(tip) {
            return `<span class='tooltip-class px-3'>${tip[0].group}  N${tip[0].value}</span>`;
          }
        }
      };
      if (Array.isArray(this.countsPerLoanOffer)) {
        this.countsPerLoanOffer.map(item => {
          const itemIndex = data.findIndex(
            x =>
              x.group ===
              moment()
                .month(item.Month - 1)
                .format("MMM")
          );
          if (itemIndex != -1) {
            data[itemIndex].value = item.sum;
          }

          const colors = {};
          this.countsPerLoanOffer.map(item => {
            return (colors[
              moment()
                .month(item.Month - 1)
                .format("MMM")
            ] = "#006F8F");
          });
          options.color = {
            scale: colors
          };
        });
      }

      return { data, options };
    },
    outstandingPerMda() {
      let data = [
        {
          group: "Jan",
          value: 34000
        },
        {
          group: "Feb",
          value: 30000
        },
        {
          group: "Mar",
          value: 20000
        },
        {
          group: "Apr",
          value: 48000
        },
        {
          group: "May",
          value: 65000
        },
        {
          group: "Jun",
          value: 25000
        },
        {
          group: "Jul",
          value: 10000
        },
        {
          group: "Aug",
          value: 47000
        },
        {
          group: "Sep",
          value: 70000
        },
        {
          group: "Oct",
          value: 27123
        },
        {
          group: "Nov",
          value: 15000
        },
        {
          group: "Dec",
          value: 35000
        }
      ];

      let options = {
        data: {
          loading: this.repaymentPerMdaStatus
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
            return `<span class='tooltip-class px-3'>${tip[0].group}  N${tip[0].value}</span>`;
          }
        }
      };
      if (Array.isArray(this.repaymentPerMda)) {
        data = this.repaymentPerMda.map(item => {
          return {
            group: moment()
              .month(item["repayment_month"] - 1)
              .format("MMM"),
            value: item.sum
          };
        });

        const colors = {};
        this.repaymentPerMda.map(item => {
          return (colors[
            moment()
              .month(item["repayment_month"] - 1)
              .format("MMM")
          ] = "#006F8F");
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
          loading: this.gettingLoanProcessedAndRequestPercent
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
            Approved: "#3CB279",
            Declined: "#EFAE73"
          }
        },
        tooltip: {
          customHTML(tip) {
            return `<span class='tooltip-class px-3'>${tip[0].value}  ${tip[0].label}</span>`;
          }
        },
        height: "400px"
      };

      if (this.LoanProcessedAndRequestPercent) {
        data = [
          {
            group: "Approved",
            value: this.LoanProcessedAndRequestPercent[
              "loan_request_percentage"
            ]["approved_percentage"]
          },
          {
            group: "Declined",
            value: this.LoanProcessedAndRequestPercent[
              "loan_request_percentage"
            ]["declined_percentage"]
          }
        ];
      }

      return { data, options };
    },
    LoanProcessedAndRequestPercent() {
      return this.$store.state.CreditorAnalytics.loanRequestPercent;
    },
    registerdMdas() {
      return this.$store.state.CreditorAnalytics.registerdMdas;
    },
    repaymentPerMda() {
      return this.$store.state.CreditorAnalytics.repaymentPerMda;
    },
    repaymentPerMdaStatus() {
      return (
        !Array.isArray(this.repaymentPerMda) || this.gettingRepaymentsByMdas
      );
    },
    countsPerLoanOffer() {
      return this.$store.state.CreditorAnalytics.countsPerLoanOffer;
    },
    countsPerLoanOfferStatus() {
      return (
        !Array.isArray(this.countsPerLoanOffer) ||
        !this.selectedLoanOffer ||
        this.gettingCountsPerLoanOffer
      );
    }
  },
  mounted() {},
  watch: {
    dateRange: {
      handler(dateRange) {
        if (dateRange.end) {
          this.fetchRequestsSummary(dateRange);
          this.fetchLoanRequests(this.$router.history.current.query);
          this.getLoanProcessedAndRequestPercent(dateRange);
          this.getRegisteredMdas(dateRange);
          this.fetchLoanOffers({});
          this.getRepaymentsByMdas(this.mda);
          if (this.selectedLoanOffer) {
            this.getCountsPerLoanOffer(this.selectedLoanOffer, dateRange);
          }
        }
      },
      immediate: true,
      deep: true
    },
    mda: {
      handler(mda) {
        this.getRepaymentsByMdas(mda);
      },
      immediate: true
    },
    selectedLoanOffer: {
      handler(selectedLoanOffer) {
        this.getCountsPerLoanOffer(selectedLoanOffer, this.dateRange);
      }
    }
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

@media screen and (max-width: 768px) {
  .middle-row {
    grid-template-columns: 1fr;
  }
}
</style>

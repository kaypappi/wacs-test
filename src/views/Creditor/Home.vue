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
      <DateInput />
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
        :value="requestsSummary.total"
      />
      <StatsCard
        icon="clock"
        title="Pending"
        :value="requestsSummary.pending"
      />
      <StatsCard
        icon="loading-process"
        title="Running "
        :value="requestsSummary.running"
      />
      <StatsCard
        icon="safe"
        title="Bank Approved"
        :value="requestsSummary.bank_approved"
      />
      <StatsCard
        icon="alarm"
        title="Awaiting IPPIS"
        :value="requestsSummary.awaiting_ippis"
      />
      <StatsCard
        icon="x-circle"
        title="Rejected "
        :value="requestsSummary.rejected"
      />
    </div>

    <div class="total-loans py-4 px-4 mb-4" id="chart-1">
      <ccv-simple-bar-chart :data="totalLoansDetails.data" :options="totalLoansDetails.options"></ccv-simple-bar-chart>
    </div>

    
      <div class="middle-row ">
        <div class="counts-per-loan-offer total-loans py-4 px-4 mb-4">
          <div class="details-top mb-3 d-flex justify-content-between align-items-center flex-wrap">
            <p class="section-title h6 mb-0">Counts per Loan offer</p>
            <div class="d-flex align-items-center flex-wrap">
              <label class="mb-0 mr-md-2 h6" for="Loan Offers">Loan Offers</label>
              <SelectField
                inputClass="small-select"
                v-model="selected"
                name="Loan Offers"
                :options="SelectOptions"
              />
            </div>
          </div>
          <ccv-simple-bar-chart
            :data="countsPerLoanDetails.data"
            :options="countsPerLoanDetails.options"
          ></ccv-simple-bar-chart>
        </div>
        <div class="loan-request-chart total-loans px-4 py-4 mb-4">
          <p class="h6">Loan request</p>
          <p class="subtitle">Conversion Indicator</p>
          <ccv-donut-chart :data="loanRequestsDetails.data" :options="loanRequestsDetails.options"></ccv-donut-chart>
        </div>
      </div>
    

    <div class="total-loans py-4 px-4 mb-4" id="chart-1">
      <div class="details-top mb-3 d-flex justify-content-between align-items-center flex-wrap">
        <p class="section-title h6 mb-0">Outstanding per MDAs</p>
        <div class="d-flex align-items-center flex-wrap">
          <label class="mb-0 mr-md-2 h6 fw-normal" for="Loan Offers">MDA</label>
          <SelectField
            inputClass="small-select"
            v-model="selected"
            name="Loan Offers"
            :options="SelectOptions"
          />
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
            v-if="loanRequests"
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
      ]
    };
  },

  methods: {
    fetchLoanRequests(query) {
      query = this.serialize(query);
      this.$store.dispatch("CreditorLoanRequest/fetchLoanRequests", query);
    },
    fetchRequestsSummary() {
      this.$store.dispatch("CreditorLoanRequest/requestsSummary");
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
    totalLoansDetails() {
      const data = [
        {
          group: "GTB",
          value: 34000
        },
        {
          group: "Bank1",
          value: 30000
        },
        {
          group: "Bank2",
          value: 20000
        },
        {
          group: "Bank3",
          value: 48000
        },
        {
          group: "Bank4",
          value: 65000
        },
        {
          group: "Bank5",
          value: 25000
        },
        {
          group: "Bank6",
          value: 10000
        },
        {
          group: "Bank7",
          value: 47000
        },
        {
          group: "Bank8",
          value: 70000
        },
        {
          group: "Bank9",
          value: 27123
        },
        {
          group: "Bank10",
          value: 15000
        }
      ];

      const options = {
        title: "Total Loans processed",
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
            GTB: "#23699F",
            Bank1: "#23699F",
            Bank2: "#23699F",
            Bank3: "#23699F",
            Bank4: "#23699F",
            Bank5: "#23699F",
            Bank6: "#23699F",
            Bank7: "#23699F",
            Bank8: "#23699F",
            Bank9: "#23699F",
            Bank10: "#23699F"
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

      return { data, options };
    },
    countsPerLoanDetails() {
      const data = [
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

      const options = {
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
            Jan: "#23699F",
            Feb: "#23699F",
            Mar: "#23699F",
            Apr: "#23699F",
            May: "#23699F",
            Jun: "#23699F",
            Jul: "#23699F",
            Aug: "#23699F",
            Sep: "#23699F",
            Oct: "#23699F",
            Nov: "#23699F",
            Dec: "#23699F"
          }
        },
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
            return `<span class='tooltip-class px-3'>${tip[0].group}  ${tip[0].value}</span>`;
          }
        }
      };

      return { data, options };
    },
    outstandingPerMda() {
      const data = [
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

      const options = {
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
            Jan: "#006F8F",
            Feb: "#006F8F",
            Mar: "#006F8F",
            Apr: "#006F8F",
            May: "#006F8F",
            Jun: "#006F8F",
            Jul: "#006F8F",
            Aug: "#006F8F",
            Sep: "#006F8F",
            Oct: "#006F8F",
            Nov: "#006F8F",
            Dec: "#006F8F"
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
            return `<span class='tooltip-class px-3'>${tip[0].group}  N${tip[0].value}</span>`;
          }
        }
      };

      return { data, options };
    },
    loanRequestsDetails() {
      const data = [
        {
          group: "Approved",
          value: 7000
        },
        {
          group: "Declined",
          value: 3000
        }
      ];
      const options = {
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

      return { data, options };
    }
  },
  mounted() {
    this.fetchRequestsSummary();
    this.fetchLoanRequests(this.$router.history.current.query);
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

.middle-row{
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px
}

@media screen and (max-width:768px){
  .middle-row{
    grid-template-columns: 1fr;
  }
}
</style>

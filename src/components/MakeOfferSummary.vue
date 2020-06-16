<template>
  <div>
    <h6>Basic Info</h6>
    <hr />
    <table class="table personal-info-table table-borderless no-border-table">
      <NoBorderTableRow :data="basicInfo" />
    </table>
    <div class="repayment-schedule">
      <h6>Repayment Schedule</h6>
      <hr />
      <template v-if="!equalRepayment">
        <template v-if="offer.csv_repayment.length>0">
          <table class="table personal-info-table table-borderless no-border-table">
            <template v-for="(item,index) in offer.csv_repayment">
              <NoBorderTableRow
                :key="index"
                :keys="Math.random()*10"
                :data="getUnequalSchedule(item,index)"
              />
            </template>
          </table>
        </template>
        <template v-else>
          <table class="table personal-info-table table-borderless no-border-table">
            <template v-for="(item,index) in offer.unequal_repayment">
              <NoBorderTableRow
                :key="index"
                :keys="Math.random()*10"
                :data="getUnequalSchedule(item,index)"
              />
            </template>
          </table>
        </template>
      </template>
      <template v-else>
        <table class="table personal-info-table table-borderless no-border-table">
          <template v-for="(item,index) in equalRepaymentData">
            <NoBorderTableRow
              :key="index"
              :keys="Math.random()*10"
              :data="getUnequalSchedule(item,index)"
            />
          </template>
        </table>
      </template>
      <hr />
    </div>
  </div>
</template>

<script>
import NoBorderTableRow from "./Table/NoBorderTableRow";
export default {
  props: {
    offer: Object,
    equalRepayment: Boolean
  },
  components: {
    NoBorderTableRow
  },
  data() {
    return {
      equalRepaymentData: [],
      months: [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      positons: [
        "First",
        "Second",
        "Third",
        "Fourth",
        "Fifth",
        "Sixth",
        "Seventh",
        "Eight",
        "Nineth",
        "Tenth",
        "Eleventh",
        "Twelveth"
      ]
    };
  },
  methods: {
    getUnequalSchedule(item, index) {
      const data = [];
      data.push(
        { name: index === 0 ? "No." : "", value: item.no },
        {
          name: index === 0 ? "Month" : "",
          value: this.months[parseInt(item.month) - 1]
        },
        { name: index === 0 ? "Year" : "", value: item.year },
        { name: index === 0 ? "Amount" : "", value: this.formatNumber(item.amount) }
      );
      return data;
    },
    getEqualSchedule() {
      let data = [];
      const months_diff = this.monthDiff(
        new Date(
          this.offer.first_repayment_year,
          this.offer.first_repayment_month,
          1
        ),
        new Date(
          this.offer.last_repayment_year,
          this.offer.last_repayment_month,
          1
        )
      );

      for (let i = 0; i < months_diff; i++) {
        let month = (this.offer.first_repayment_month + i) % 12,
          year =
            this.offer.first_repayment_year +
            Math.floor((this.offer.first_repayment_month + i) / 12);
        const obj = {
          no: i + 1,
          month: month,
          year,
          amount: this.offer.repayment_amount
        };
        data[i] = { ...obj };
      }

      return data;
    },
    monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    basicInfo() {
      const data = [];
      data.push(
        { name: "Amount", value: this.offer.loan_amount },
        {
          name: "Moratorium Period",
          value: this.positons[this.offer.moratorium - 1] + " month "
        },
        {
          name: "Payback Period",
          value: this.offer.repayment_period + " months"
        },
        { name: "Interest Rate", value: this.offer.interest + "%" }
      );
      return data;
    }
  },
  mounted() {
    if (this.equalRepayment) {
      this.equalRepaymentData = this.getEqualSchedule();
    }
  }
};
</script>

<style >
.repayment-schedule {
  margin-top: 40px;
}

.table-borderless.table td {
  border: none !important;
}
</style>
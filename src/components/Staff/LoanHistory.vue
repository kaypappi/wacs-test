<template>
  <div class="staff-loan-history">
    <div class="top d-flex">
      <span class="title h4 mr-auto">Loan History</span>
      <span class="view-all h6  ml-auto">View All</span>
    </div>
    <div class="lone-history-table">
      <b-table
        
        borderless
        :items="loanHistory"
        responsive
        :fields="fields"
        :tbody-tr-class="rowClass"
      >
        <template v-slot:cell(Date)="data">{{data.item.date}}</template>
        <template
          v-slot:cell(Interest)="data"
        >{{data.item.repayment?data.item.repayment.interest_rate:data.item.offer.interest_rate}}</template>
        <template v-slot:cell(Amount)="data">{{formatNumber(data.item.amount)}}</template>
        <template
          v-slot:cell(PaybackPeriod)="data"
        >{{data.item.repayment?data.item.repayment.repayment_period:data.item.offer.payback_period}}months</template>
        <template v-slot:cell(Status)="data">
          <span :class="`status-oval active-status ${data.item.status}`">{{data.item.status}}</span>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
//import NoBorderTableRow from "../../components/Table/NoBorderTableRow";
export default {
  props: {
    loanHistory: Array
  },
  components: {
    //NoBorderTableRow
  },
  data() {
    return {
      fields: ["Date", "Interest", "Amount", "PaybackPeriod", "Status"]
    };
  },
  methods: {
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    rowClass(item) {
      return "rowClass";
    }
  }
};
</script>

<style scoped>
.staff-loan-history{
    margin-top: 64px;
}

.title {
    color: #656A72;
}

.view-all{
    color: #27BE58;
    cursor: pointer;
}

.status-oval {
  border-radius: 5px;
}

span.status-oval.active-status.Declined {
  color: #f50606;
  background: rgba(245, 6, 6, 0.15);
}

span.status-oval.active-status.Pending {
  color: #e47a00;
  background: rgba(228, 122, 0, 0.15);
}

.staff-loan-history >>> .table thead {
  border-bottom: 0px;
}

.staff-loan-history >>> .rowClass{
    border-bottom: 1px solid #E5E5E5;
    
}

.staff-loan-history >>> .table td{
    color: #656A72;
    font-size: 16px;
    font-weight: 400;
}
</style>
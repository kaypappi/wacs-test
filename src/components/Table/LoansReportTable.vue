<template>
  <b-table small :fields="fields" :items="loans">
    <template v-slot:cell(Loan_Code)="data">{{data.item.code}}</template>
    <template v-slot:cell(Title)="data">{{data.item.title}}</template>
    <template v-slot:cell(Counts)="data">{{data.item.counts}}</template>
    <!-- <template v-slot:cell(ScheduleNumber)="data">
          {{data.item.schedule_number}}
    </template>-->
    <template v-slot:cell(Amount(N))="data">{{ $options.filters.number(data.item.amount,  '0,0')}}</template>
    <!--  <template v-slot:cell(Schedule)="data">
          <span @click="viewSchedule(data.item.id)" class="view-schedule">View Schedule Breakdown</span>
      </template>
       <template v-slot:head(Schedule)="data">
          <span></span>
    </template>-->
  </b-table>
</template>

<script>
export default {
  props: {
    repayments: Object
  },
  data() {
    return {
      fields: ["Loan_Code", "Title", "Amount(N)", "Counts"]
    };
  },
  methods: {
    viewSchedule(id) {
      this.$router.push({ name: "repaymentsSchedule", params: { id } });
    },

  },
  computed:{
      loans(){
          let loans=Object.values(this.repayments)
          loans=loans.slice(0,-1)
          return loans
      }
  }
};
</script>

<style>
.view-schedule {
  color: #27be58;
  font-size: 14px;
  cursor: pointer;
}
</style>
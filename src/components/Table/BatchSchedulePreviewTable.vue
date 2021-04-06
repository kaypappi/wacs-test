<template>
  <b-table small :fields="fields" :items="previewItem" responsive>
    <template v-slot:cell(Data_Source)="data">{{data.item.data_source}}</template>
    <template v-slot:cell(Refrence_Id)="data">{{data.item.reference_id}}</template>
    <template v-slot:cell(Surname)="data">{{data.item.employee_surname}}</template>
    <template v-slot:cell(Middle_Name)="data">{{data.item.employee_middle_name}}</template>
    <template v-slot:cell(IPPIS_Number)="data">{{data.item.ippis_number}}</template>
    <template v-slot:cell(Payroll_Name)="data">{{data.item.payroll_name}}</template>
    <template v-slot:cell(Staff_Id)="data">{{data.item.staff_id}}</template>
    <template v-slot:cell(MDA)="data">{{data.item.mda}}</template>
    <template v-slot:cell(Bank_Name)="data">{{data.item.bank_name}}</template>
    <template v-slot:cell(EarningsDeductions)="data">{{data.item.earning_or_deduction}}</template>
    <template v-slot:cell(Amount(N))="data">{{formatNumber(data.item.amount)}}</template>
  </b-table>
</template>

<script>
export default {
  props: {
    previewItem: Array
  },
  data() {
    return {
      fields: [
        "Data_Source",
        "Refrence_Id",
        "Surname",
        "Middle_Name",
        "IPPIS_Number",
        "Payroll_Name",
        "Staff_Id",
        "MDA",
        "Bank_Name",
        "EarningsDeductions",
        "Amount(N)"
      ]
    };
  },
  methods: {
    viewSchedule(id) {
      this.$router.push({ name: "repaymentsSchedule", params: { id } });
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    /* loans() {
      let loans = Object.values(this.repayments);
      loans = loans.slice(0, -1);
      return loans;
    } */
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
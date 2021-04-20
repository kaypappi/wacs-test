<template>
  <div>
    <b-table @row-clicked="handleRowClick" small :fields="fields" :items="records" responsive hover>
      <template v-slot:cell(Data_Source)="data">{{data.item.data_source}}</template>
      <template v-slot:cell(Refrence_Id)="data">{{data.item.reference_id}}</template>
      <template v-slot:cell(Surname)="data">{{data.item.employee_surname}}</template>
      <template v-slot:cell(First_Name)="data">{{data.item.employee_first_name}}</template>
      <template v-slot:cell(Middle_Name)="data">{{data.item.employee_middle_name}}</template>
      <template v-slot:cell(IPPIS_Number)="data">{{data.item.ippis_number}}</template>
      <template v-slot:cell(Payroll_Name)="data">{{data.item.payroll_name}}</template>
      <template v-slot:cell(Staff_Id)="data">{{data.item.staff_id}}</template>
      <template v-slot:cell(MDA)="data">{{data.item.mda}}</template>
      <template v-slot:cell(Bank)="data">{{data.item.bank_name}}</template>
      <template v-slot:cell(EarningsDeduction)="data">{{data.item.earning_or_deduction}}</template>
      <template v-slot:cell(Amount_(N))="data">{{formatNumber(data.item.amount)}}</template>
    </b-table>
  </div>
</template>

<script>
//import CustomModal from "../Modals/CustomModal";
export default {
  props: {
    records: Array
  },
  components: {
    //CustomModal
  },
  data() {
    return {
      fields: [
        "Data_Source",
        "Refrence_Id",
        "Surname",
        "First_Name",
        "Middle_Name",
        "IPPIS_Number",
        "Payroll_Name",
        "Staff_Id",
        "MDA",
        "Bank",
        "EarningsDeduction",
        "Amount_(N)"
      ],
      currentItem: null
    };
  },
  methods: {
    handleRowClick(item) {
      //this.$router.push({name:"ippisDeductionDetails", params:{ippis:item.ippis_number}})
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    formatLabel(sentence) {
      const newSentence = sentence
        .replace(/_/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      return newSentence;
    }
  },
  computed: {},
};
</script>

<style>
.view-schedule {
  color: #27be58;
  font-size: 14px;
  cursor: pointer;
}
.details-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.detail-title {
  font-weight: 500;
}
.detail-body {
  font-size: 14px;
  font-weight: 300;
}
/* .data-validation{
  font-size: 20px;
  font-weight: 600;
  text-align: center;
} */
</style>
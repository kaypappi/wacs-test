<template>
  <div>
    <b-table @row-clicked="handleRowClick" small :fields="fields" :items="records" responsive>
      <template v-slot:cell(Data_Source)="data">{{data.item.data_source}}</template>
      <template v-slot:cell(Refrence_Id)="data">{{data.item.reference_id}}</template>
      <template v-slot:cell(Surname)="data">{{data.item.employee_surname}}</template>
      <template v-slot:cell(First_Name)="data">{{data.item.employee_first_name}}</template>
      <template v-slot:cell(Middle_Name)="data">{{data.item.employee_middle_name}}</template>
      <template v-slot:cell(IPPIS_Number)="data">{{data.item.ippis_number}}</template>
      <template v-slot:cell(Tax_State)="data">{{data.item.tax_state}}</template>
      <template v-slot:cell(Staff_Id)="data">{{data.item.staff_id}}</template>
      <template v-slot:cell(MDA)="data">{{data.item.mda}}</template>
      <template v-slot:cell(Bank)="data">{{data.item.bank_name}}</template>
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
        "Tax_State",
        "Staff_Id",
        "MDA",
        "Bank"
      ],
      currentItem: null
    };
  },
  methods: {
    handleRowClick(item) {
      this.currentItem = item;
      this.$bvModal.show("single-batch-item");
    },
    viewSchedule(id) {
      this.$router.push({ name: "repaymentsSchedule", params: { id } });
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
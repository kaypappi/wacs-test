<template>
  <div class="batch-table">
    <b-table
      @row-clicked="handleRowClick"
      :fields="fields"
      :items="previewItem"
      hover
      responsive
    >
      <template v-slot:cell(First_Name)="data">{{data.item.employee_first_name }}</template>
      <template v-slot:cell(Surname)="data">{{data.item.employee_surname}}</template>
      <template v-slot:cell(Middle_Name)="data">{{data.item.employee_middle_name}}</template>
       <template v-slot:cell(MDA)="data">{{data.item.mda}}</template>
      <template v-slot:cell(IPPIS_Number)="data">{{data.item.ippis_number}}</template>
      <template v-slot:cell(Loan_Amount)="data">{{formatNumber(data.item.amount)}}</template>
      <template v-slot:cell(Bank_Name)="data">{{data.item.bank_name}}</template>
      <template v-slot:cell(Loan_Deduction)="data">{{formatNumber(data.item.total_deduction)}}</template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    previewItem:Array
  },
  components: {},
  data() {
    return {
      fields: [
        "First_Name",
        "Surname",
        "Middle_Name",
        "MDA",
        "IPPIS_Number",
        "Loan_Amount",
        "Loan_Deduction",
        "Bank_Name",
        "Data_Validation",
      ],
    };
  },
  methods: {
    handleRowClick(item) {
      this.$router.push({name:"deductionPreview",params:{id:item.batch_id}})
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
    },
    progress(total, records_validated) {
      return parseInt(Math.round((records_validated / total) * 100));
    }
  },
  computed: {
    previewDetails() {
      const Item = this.currentItem;
      const reject = [
        "error_occurred",
        "error_message",
        "created_at",
        "updated_at",
        "file_staging",
        "is_validated"
      ];
      const filtered = Object.keys(Item)
        .filter(key => !reject.includes(key))
        .reduce((obj, key) => ({ ...obj, [key]: Item[key] }), {});
      return filtered;
    }
  },
  mounted(){
    
  }
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

.progress-wrapper {
  min-width: 300px;
}

.completed {
  color: #27be58;
}

.processing {
  color: #d4a036;
}
</style>
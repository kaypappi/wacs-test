<template>
  <div>
    <b-table @row-clicked="handleRowClick" small :fields="fields" hover :items="previewItem" responsive>
      <template v-slot:cell(Reference_Id)="data">{{data.item.reference_id }}</template>
      <template v-slot:cell(First_Name)="data">{{data.item.employee_first_name }}</template>
      <template v-slot:cell(Surname)="data">{{data.item.employee_surname}}</template>
      <template v-slot:cell(Middle_Name)="data">{{data.item.employee_middle_name}}</template>
      <template v-slot:cell(MDA)="data">{{data.item.mda}}</template>
      <template v-slot:cell(IPPIS_Number)="data">{{data.item.ippis_number}}</template>
      <template v-slot:cell(Loan_Amount)="data">{{ $options.filters.number(data.item.amount,  '0,0')}}</template>
      <template v-slot:cell(Bank_Name)="data">{{data.item.bank_name}}</template>
      <template v-slot:cell(Loan_Deduction)="data">{{ $options.filters.number(data.item.total_deduction,  '0,0')}}</template>
      <template v-slot:cell(Data_Validation)="data">
        <div v-if="data.item.error_occurred===1">
          <b-icon
            :id="data.item.reference_id + data.index"
            class="data-validation mx-auto h1"
            icon="X"
            variant="danger"
          ></b-icon>
          <b-tooltip
            :target="data.item.reference_id +data.index "
            bottom
            triggers="hover"
          >{{data.item['error_message']}}</b-tooltip>
        </div>
        <div  v-else-if="data.item.is_validated===0" class="warning"><span class="mr-2">Processing</span><b-spinner variant="warning" small></b-spinner></div>
        <b-icon v-else class="data-validation mx-auto h1" icon="check" variant="success"></b-icon>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    previewItem: Array
  },
  components: {},
  data() {
    return {
      fields: [
        "Reference_Id",
        "First_Name",
        "Surname",
        "Middle_Name",
        "MDA",
        "IPPIS_Number",
        "Loan_Amount",
        "Loan_Deduction",
        "Bank_Name",
        "Data_Validation"
      ],
      currentItem: null
    };
  },
  methods: {
    handleRowClick(item) {
      this.$router.push({
        name: "deductionPerIppis",
        params: { ippis: item.ippis_number }
      });
    },
    viewSchedule(id) {
      this.$router.push({ name: "repaymentsSchedule", params: { id } });
    },
    formatLabel(sentence) {
      const newSentence = sentence
        .replace(/_/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      return newSentence;
    },
    PreviewItems() {
      return Object.values(this.previewItem);
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
</style>
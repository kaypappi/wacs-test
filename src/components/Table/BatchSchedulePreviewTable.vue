<template>
  <div>
    <b-table @row-clicked="handleRowClick" small :fields="fields" :items="previewItem" responsive>
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
    <CustomModal  id="single-batch-item" size="lg" :scrollable="true">
      <div v-if="currentItem" class="details-wrapper">
        <template v-for="(value,name,index) in previewDetails">
          <div :key="currentItem.ippis_number + index" class="detail-holder">
            <p class="detail-title mb-0">{{formatLabel(name)}}</p>
            <p class="detail-body">{{value}}</p>
          </div>
        </template>
      </div>
      <!-- <div v-if="currentItem" class="error-block">
          vcuhjuyvu
          <p class="error-msg danger">{{currentItem.error_message}}</p>
      </div> -->
    </CustomModal>
  </div>
</template>

<script>
import CustomModal from "../Modals/CustomModal";
export default {
  props: {
    previewItem: Array
  },
  components: {
    CustomModal
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
  computed: {
    previewDetails() {
        const Item=this.currentItem
      const reject = [
        "error_occurred",
        "error_message",
        "created_at",
        "updated_at",
        "file_staging"
      ];
      const filtered = Object.keys(Item)
  .filter(key => !reject.includes(key)).reduce((obj, key) => ({ ...obj, [key]: Item[key] }), {});
        return filtered
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
    grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
}
.detail-title {
  font-weight: 500;
}
.detail-body {
  font-size: 14px;
  font-weight: 300;
}
</style>
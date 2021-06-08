<template>
  <div>
    <b-table @row-clicked="handleRowClick" small :fields="fields" :items="previewItem" responsive>
      <template v-slot:cell(First_Name)="data">{{data.item.employee_first_name }}</template>
      <template v-slot:cell(Surname)="data">{{data.item.employee_surname}}</template>
      <template v-slot:cell(Middle_Name)="data">{{data.item.employee_middle_name}}</template>
       <template v-slot:cell(MDA)="data">{{data.item.mda}}</template>
      <template v-slot:cell(IPPIS_Number)="data">{{data.item.ippis_number}}</template>
      <template v-slot:cell(Loan_Amount)="data">{{formatNumber(data.item.amount)}}</template>
      <template v-slot:cell(Bank_Name)="data">{{data.item.bank_name}}</template>
      <template v-slot:cell(Loan_Deduction)="data">{{formatNumber(data.item.total_deduction)}}</template>
<!--       <template v-slot:cell(Line_Items)="row"><b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details{{row.item.breakdown.length}}
        </b-button></template> -->
      <template v-slot:cell(Data_Validation)="data">
        <div v-if="data.item['error_occurred']===1">
          <b-icon
            id="tooltip-target-1"
            class="data-validation mx-auto h1"
            icon="X"
            variant="danger"
          ></b-icon>
          <b-tooltip
            target="tooltip-target-1"
            bottom
            triggers="hover"
          >{{data.item['error_message']}}</b-tooltip>
        </div>
        <b-icon v-else class="data-validation mx-auto h1" icon="check" variant="success"></b-icon>
      </template>
     <!--  <template #row-details="row">
        <b-card>
          <BatchItemDetailsTable :previewItem="row.item.breakdown"/>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template> -->
    </b-table>
    <!-- <CustomModal id="single-batch-item" size="lg" :scrollable="true" :hover="true">
      <div v-if="currentItem" class="details-wrapper">
        <template v-for="(value,name,index) in previewDetails">
          <div :key="currentItem.ippis_number + index" class="detail-holder mb-2">
            <p class="detail-title mb-0">{{formatLabel(name)}}</p>
            <p class="detail-body">{{value}}</p>
          </div>
        </template>
      </div>
      <div v-if="currentItem" class="error-block">
          vcuhjuyvu
          <p class="error-msg danger">{{currentItem.error_message}}</p>
      </div>
    </CustomModal> -->
  </div>
</template>

<script>
//import CustomModal from "../Modals/CustomModal";
//import BatchItemDetailsTable from  "./BatchItemDetailsTable"
export default {
  props: {
    previewItem: Array
  },
  components: {
   // CustomModal
   //BatchItemDetailsTable
  },
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
        "Line_Items"
      ],
      currentItem: null
    };
  },
  methods: {
    handleRowClick(item) {
      this.$router.push({name:"deductionPerIppis",params:{ippis:item.ippis_number}})
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
    PreviewItems(){
      return Object.values(this.previewItem)
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
    },
    
  },
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
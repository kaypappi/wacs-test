<template>
  <div class="batch-table">
    <b-table
      @row-clicked="handleRowClick"
      small
      :fields="fields"
      :items="previewItem"
      hover
      responsive
    >
      <template v-slot:cell(Batch_Name)="data">{{data.item.batch_name}}</template>
      <template v-slot:cell(Date)="data">{{data.item.date}}</template>
      <template v-slot:cell(Total_Records)="data">{{data.item.total_records}}</template>
      <template v-slot:cell(Records_Validated)="data">{{data.item.records_validated}}</template>
      <template v-slot:cell(Validation_Passed)="data">{{data.item.validation_passed}}</template>
      <template v-slot:cell(Progress)="data">
        <div class="progress-wrapper row">
          <div class="col-10">
            <b-progress
              :value="progress(data.item.total_records,data.item.records_validated)"
              height="10px"
              variant="success"
              :max="100"
              class="mb-0"
            ></b-progress>
          </div>
          <span class="col-2">{{progress(data.item.total_records,data.item.records_validated)}}%</span>
        </div>
      </template>
      <template v-slot:cell(Status)="data">
        <div :class="{completed:data.item.batch_status==='Validated'||data.item.batch_status==='Processed',processing:data.item.batch_status==='processing','d-flex':true}">
          <span>{{data.item.batch_status}}</span>
          <b-icon class="ml-2" v-if="data.item.batch_status==='Processed'" icon="check-circle-fill"></b-icon>
        </div>
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
        "Batch_Name",
        "Date",
        "Total_Records",
        "Records_Validated",
        "Validation_Passed",
        "Progress",
        "Status"
      ],
      currentItem: null
    };
  },
  methods: {
    handleRowClick(item) {
      this.$router.push({name:"deductionPreview",params:{id:item.batch_id}})
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
    progress(total, records_validated) {
      return parseInt(Math.round((records_validated / total) * 100))? parseInt(Math.round((records_validated / total) * 100)):0;
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
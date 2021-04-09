<template>
  <img
    src="/assets/images/page-ring-loader.svg"
    alt="loader"
    v-if="fetchingItem"
    class="page-loader"
  />
  <div v-else class="preview-wrapper p-4 relative">
    <div v-if="previewMeta" class="preview-header mb-5">
      <div class="mb-2">
        <span class="label">Batch Name:</span>
        <span class="ml-1 value">{{previewMeta.title}}</span>
      </div>
      <div class="mb-2">
        <span class="label">Records Validated:</span>
        <span
          class="ml-1 value"
        >{{`${previewMeta.validated_records} (${previewMeta.passed} Passed, ${previewMeta.failed} Failed)`}}</span>
      </div>
      <div class="mb-2">
        <span class="label">Status:</span>
        <span class="ml-1 value">{{previewMeta.status}}</span>
      </div>
      <div class="row">
        <span class="label col-sm-2">Progress:</span>
        <span class="value col-sm-10 pt-2">
          <b-progress
            :value="previewMeta.progress"
            show-progress
            height="10px"
            variant="success"
            :max="100"
            class="mb-0"
          ></b-progress>
        </span>
      </div>
    </div>
    <BatchSchedulePreviewTable :previewItem="getBatchItem.data" />
    <div class="summary-nav-buttons">
      <button @click="prev" class="previous-btn" type="button">
        <span>
          <BIconArrowLeft />
        </span>
        Back
      </button>
      <button v-if="findError" @click="submitWizard">
        <img
          :style="{height:'100%',width:'auto'}"
          v-if="isMakingOffer"
          src="/assets/images/button-ring-loader.svg"
        />
        <span v-if="!isMakingOffer">Submit</span>
      </button>
    </div>
  </div>
</template>

<script>
import BatchSchedulePreviewTable from "./Table/BatchSchedulePreviewTable";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    prev: { type: Function, default: () => {} }
  },
  components: {
    BatchSchedulePreviewTable
  },
  methods: {
    ...mapActions({
      saveBatchSchedule: "CreditorDeduction/saveBatchSchedule"
    }),
    saveSchedule() {
      if (this.getFileFromState) {
        this.saveBatchSchedule(this.getFileFromState);
      }
    }
  },
  computed: {
    ...mapGetters({
      fetchingItem: "CreditorDeduction/fetchingItem",
      getBatchItem: "CreditorDeduction/getBatchItem",
      getFileFromState: "CreditorDeduction/getFileFromState"
    }),
    findError() {
      return this.getBatchItem.data.some(item => {
        item["error_occurred"] === 1;
      });
    },
    previewMeta() {
      if (this.getBatchItem) {
        const sample = this.getBatchItem.data[0]["file_staging"];
        const total = this.getBatchItem.total;
        const title = sample["batch_name"];
        const status = sample["status"];
        const validated_records = sample["records_validated"];
        const passed = sample["validation_passed"];
        const failed = sample["validation_failed"];
        const progress = parseInt(
          Math.round((validated_records / total) * 100)
        );
        const data = {
          title,
          total,
          status,
          validated_records,
          passed,
          failed,
          progress
        };
        return data;
      }
      return null;
    }
  }
};
</script>

<style scoped>
.summary-nav-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
}

.summary-nav-buttons button {
  max-width: 200px;
}
button {
  height: 50px;
  width: 100%;
  margin: 20px 0 10px 0;
  background-color: #27be58;
  border: none;
  color: #ffffff;
  font-size: 20.6px;
  line-height: 24px;
}

.previous-btn {
  background-color: white !important;
  color: #27be58 !important;
  text-align: start;
}

.preview-header {
  max-width: 400px;
}

.preview-header span{
  font-weight: 500;
}

.preview-header .value {
  color: #6c757d;
  
}
</style>
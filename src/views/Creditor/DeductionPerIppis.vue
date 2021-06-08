<template>
  <div class="deduction-preview-wrapper">
    <b-skeleton-wrapper :loading="!previewMeta">
      <template #loading>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </template>

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
          <span class="ml-2">
            <b-spinner
              v-if="previewMeta.status!=='Validated'||previewMeta.status!=='Processed'"
              variant="warning"
              small
            ></b-spinner>
            <b-icon v-else icon="check" class="h4 mb-0" variant="success"></b-icon>
          </span>
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
    </b-skeleton-wrapper>

    <b-tabs
      active-nav-item-class="active-nav-tab"
      active-tab-class="font-weight-bold text-success"
      content-class="mt-3"
      v-model="tabIndex"
      @input="handleChange"
    >
      <b-tab title="Validated Records" active>
        <b-skeleton-wrapper :loading="fetchingBatchItem">
          <template #loading>
            <b-skeleton-table :rows="5" :columns="4" :table-props="{ small:true, }"></b-skeleton-table>
          </template>
          <BatchSchedulePreviewTable2 :previewItem="getValidatedItems" />
        <div class="summary-nav-buttons w-100 mt-4">
          <button class="previous-btn" type="button">
            <span>
              <BIconArrowLeft />
            </span>
            Back
          </button>
          <button v-if="!findError" @click="saveSchedule">
            <img
              :style="{height:'100%',width:'auto'}"
              v-if="savingSchedule"
              src="/assets/images/button-ring-loader.svg"
            />
            <span v-else>Submit</span>
          </button>
        </div>
        </b-skeleton-wrapper>
      </b-tab>
      <b-tab title="Failed Records">
         <b-skeleton-wrapper :loading="fetchingBatchItem">
          <template #loading>
            <b-skeleton-table :rows="5" :columns="4" :table-props="{ small:true, }"></b-skeleton-table>
          </template>
          <BatchSchedulePreviewTable2 :previewItem="getFailedItems" />
        </b-skeleton-wrapper>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import BatchSchedulePreviewTable2 from "../../components/Table/BatchSchedulePreviewTable2";
//import Pagination from "../../components/Pagination/Pagination";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {},
  components: {
    BatchSchedulePreviewTable2,
   // Pagination
  },
  data() {
    return {
      fetchingBatchItem: false,
      savingSchedule: false,
      tabIndex: 0
    };
  },
  methods: {
    ...mapActions({
      saveBatchSchedule: "CreditorDeduction/saveBatchSchedule",
      fetchUploadedBatchItem: "CreditorDeduction/fetchUploadedBatchItemByIppis",
      clearBatchSchedule: "CreditorDeduction/clearBatchSchedule"
    }),
    async saveSchedule() {
      if (!this.findError) {
        this.savingSchedule = true;
        try {
          const response = await this.saveBatchSchedule(
            this.getCurrentBatchFile["batch-id"]
          );
          this.savingSchedule = false;
          const clearCurrentFile = await this.clearBatchSchedule(
            this.getCurrentBatchFile["batch-id"]
          );
          this.prev();
          return response, clearCurrentFile;
        } catch (e) {
          return (this.savingSchedule = false);
        }
      }
    },
    async fetchUploadedBatchFileJob(query, type = "") {
      this.fetchingBatchItem = true;
      const ippis = this.$route.params.ippis;
      const response = await this.fetchUploadedBatchItem({
        ippis,
        query,
        type
      });
      this.fetchingBatchItem = false;

      return response;
    },
    handleChange() {
      this.$router.push({query:{}})
    }
  },
  computed: {
    ...mapGetters({
      fetchingItem: "CreditorDeduction/fetchingItem",
      getBatchItem: "CreditorDeduction/getBatchItem",
      getFileFromState: "CreditorDeduction/getFileFromState",
      getCurrentBatchFile: "CreditorDeduction/getCurrentBatchFile"
    }),
    findError() {
      if(this.previewMeta){
        return (
        (this.previewMeta.status === "Validated" ||
          this.previewMeta.status === "Processed") &&
        this.previewMeta.passed < this.previewMeta.validated_records
      );
      }
      return false
    },
    getValidatedItems() {
      return this.$store.state.CreditorDeduction.validatedIppis;
    },
    getFailedItems() {
      return this.$store.state.CreditorDeduction.failedIppis;
    },
    previewMeta() {
      if (this.getCurrentBatchFile) {
        const sample = this.getCurrentBatchFile;
        const total = this.getCurrentBatchFile["total_records"];
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
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.fetchUploadedBatchFileJob(query, "clean");
        this.fetchUploadedBatchFileJob(query, "scrap");
      },
      immediate: true,
      deep: true
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

.preview-header span {
  font-weight: 500;
}

.preview-header .value {
  color: #6c757d;
}

.deduction-preview-wrapper >>> .nav-tabs .nav-link.active{
  border: none;
}

.deduction-preview-wrapper >>> .nav-tabs{
  border-bottom:none;
}

.deduction-preview-wrapper >>> .nav-tabs .nav-link{
  border: none;
}

.deduction-preview-wrapper >>> .active-nav-tab{
  border-bottom: 3px solid #27be58 !important;
}


</style>
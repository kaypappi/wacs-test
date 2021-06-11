<template>
  <div class="deduction-preview-wrapper">
    <b-skeleton-wrapper :loading="previewMeta===null">
      <template #loading>
        <div class="p-3">
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </div>
      </template>

      <div  class="preview-header mb-5 p-3">
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
              v-if="(previewMeta.status!='Processed' && previewMeta.status!='Validated')"
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
    <div
      v-if="findError &&  previewMeta.status!=='processing'"
      @click="downloadScrapFile"
      class="sample-box ml-auto mb-2 d-flex justify-content-center py-2 px-3"
    >
      <span class="mr-2">
        <b-spinner
          v-if="downloadingScrap"
          small
        ></b-spinner>
        <b-icon v-else icon="download"></b-icon>
      </span>
      <span>Download Scrap File</span>
    </div>
    <BatchSchedulePreviewTable v-if="getBatchItem" :previewItem="getBatchItem.data" />
    <Pagination
      :total="getBatchItem.total"
      :currentPage="getBatchItem.current_page"
      :lastPage="getBatchItem.last_page"
      :from="getBatchItem.from"
      :to="getBatchItem.to"
    />
    <div class="summary-nav-buttons w-100 mt-4">
      <button v-if="!findError || (findError && downloadedScrap)" @click="saveSchedule">
        <img
          :style="{height:'100%',width:'auto'}"
          v-if="savingSchedule"
          src="/assets/images/button-ring-loader.svg"
        />
        <span v-else>Submit</span>
      </button>
    </div>
  </div>
</template>

<script>
import BatchSchedulePreviewTable from "../../components/Table/BatchSchedulePreviewTable";
import Pagination from "../../components/Pagination/Pagination";
import creditor from "../../store/Api/creditor";
import FileDownload from "js-file-download";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {},
  components: {
    BatchSchedulePreviewTable,
    Pagination
  },
  data() {
    return {
      fetchingBatchItem: false,
      savingSchedule: false,
      tabIndex: 0,
      downloadedScrap: false,
      downloadingScrap: false
    };
  },
  methods: {
    ...mapActions({
      saveBatchSchedule: "CreditorDeduction/saveBatchSchedule",
      fetchUploadedBatchItem: "CreditorDeduction/fetchUploadedBatchItem2",
      clearBatchSchedule: "CreditorDeduction/clearBatchSchedule"
    }),
    async saveSchedule() {
      if (this.findError && !this.downloadedScrap) return;
      this.savingSchedule = true;
      try {
        const response = await this.saveBatchSchedule(
          this.getCurrentBatchFile.id
        );
        this.savingSchedule = false;
        this.prev();
        return response;
      } catch (e) {
        return (this.savingSchedule = false);
      }
    },
    async fetchUploadedBatchFileJob(query, type = "") {
      this.fetchingBatchItem = true;
      const batchId = this.$route.params.id;
      const response = await this.fetchUploadedBatchItem({
        batchId,
        query,
        type
      });
      this.fetchingBatchItem = false;

      //const status = response.data[0]["file_staging"]["status"];
      return response;
    },

    async downloadScrapFile() {
      this.downloadingScrap = true;
      const response = await creditor.downloadScrapFile(
        this.getCurrentBatchFile.id
      );
      FileDownload(
        response.data,
        `scrap${this.getCurrentBatchFile.batch_name}`
      );
      this.downloadingScrap = false;
      return (this.downloadedScrap = true);
    },

    handleChange() {
      this.$router.push({ query: {} });
    }
  },
  computed: {
    ...mapGetters({
      fetchingItem: "CreditorDeduction/fetchingItem",
      getBatchItem: "CreditorDeduction/getBatchItem",
      getFileFromState: "CreditorDeduction/getFileFromState"
    }),
    findError() {
      if (this.previewMeta) {
        return (
          (this.previewMeta.status === "Validated" ||
            this.previewMeta.status === "Processed") &&
          this.previewMeta.passed < this.previewMeta.validated_records
        );
      }
      return false;
    },
    getCurrentBatchFile() {
      return this.$store.state.CreditorDeduction.currentBatchFile;
    },
    getValidatedItems() {
      return this.$store.state.CreditorDeduction.validated2;
    },
    getFailedItems() {
      return this.$store.state.CreditorDeduction.failed2;
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
        this.fetchUploadedBatchFileJob(query);
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
  max-width: 500px;
}

.preview-header span {
  font-weight: 500;
}

.preview-header .value {
  color: #6c757d;
}

.deduction-preview-wrapper >>> .nav-tabs .nav-link.active {
  border: none;
}

.deduction-preview-wrapper >>> .nav-tabs {
  border-bottom: none;
}

.deduction-preview-wrapper >>> .nav-tabs .nav-link {
  border: none;
}

.deduction-preview-wrapper >>> .active-nav-tab {
  border-bottom: 3px solid #27be58 !important;
}
.sample-box {
  border: rgba(248, 10, 10, 0.15) 1px solid;
  background: rgba(248, 10, 10, 0.15);
  color: #f80a0a;
  max-width: 250px;
  cursor: pointer;
}
</style>
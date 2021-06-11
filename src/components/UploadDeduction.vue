<template>
  <div class="upload-deduction-wrapper pt-5">
  
    <p class="h5">Upload sample deduction </p>
    <p
      class="sub mt-3"
    >Upload the sample deduction file in step 1</p>
    <DragDropFileInput
      @changed="fileChange($event)"
      :deleteFile="deleteFile"
      :loadingCount="loadingCount"
      :value="file"
      :max="120"
      label="Upload Deduction Schedule"
    />
    <template v-if="uploadErrors">
      <template v-for="item in uploadErrors">
        <p :key="item" class="error-msg">{{item}}</p>
      </template>
    </template>
  </div>
</template>

<script>
//import LineBreakTitle from "./LineBreakTitle";
import DragDropFileInput from "./Inputs/DragDropFileInput";
//import creditor from "../store/Api/creditor";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    next: Function
  },
  components: {
    //LineBreakTitle,
    DragDropFileInput
  },
  data() {
    return {
      file: new File([""], ""),
      fileLoading: false,
      uploadErrors:null,
      loadingCount: 0
    };
  },
  methods: {
    ...mapActions({
      uploadBatchSchedule: "CreditorDeduction/uploadSchedule",
      clearBatchSchedule: "CreditorDeduction/clearBatchSchedule"
    }),
    async fileChange(file) {
      this.file = file;
      let formData = new FormData();
      formData.append("excel_file", this.file);
      if (this.file !== null) {
        try {
          this.uploadErrors=null
          const response = await this.uploadBatchSchedule({
            file: formData,
            handleProgress: this.handleProgress
          });
          this.loadingCount = this.loadingCount + 20;
          
          return response;
        } catch (e) {
          this.uploadErrors=e.response.data.errors["excel_file"]
          this.loadingCount=0
          return e;
        }
      }
    },
    handleProgress(progressEvent) {
      this.loadingCount =
        this.loadingCount +
        parseInt(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
    },
    deleteFile() {
      const batchId = this.getCurrentBatchFile.data["batch-id"];
      this.clearBatchSchedule(batchId);
      this.loadingCount = 0;
    }
  },
  computed: {
    ...mapGetters({
      getCurrentBatchFile: "CreditorDeduction/getCurrentBatchFile",
    })
  },
  watch: {
    getCurrentBatchFile: function(file) {
      if (file === null) {
        this.loadingCount = 0;
      }
    },
    loadingCount:{
      handler(loadingCount){
        if(loadingCount>=120){
          this.next()
        }
      }
    }
  }
};
</script>

<style scoped>
.upload-deduction-wrapper {
  max-width: 400px;
  margin: 0 auto;
}
.sample-box {
  border: #32ac59 1px solid;
  background: #27be581c;
  color: #27be58;
}
.sub {
  color: #8f8f8f;
  font-size: 14px;
}

.readme-box {
  max-width: 400px;
  color: #8f8f8f;
  font-size: 12px;
}
.readme {
  font-size: 14px;
  font-weight: 600;
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

.error-msg{
  color: red;
  font-size: 12px;
}
</style>
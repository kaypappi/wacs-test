<template>
  <div class="upload-deduction-wrapper pt-5">
    <LineBreakTitle title="Step 1" />
    <div class="deduction-sample">
      <div class="sample-box py-2 pl-3">
        <span class="mr-2">
          <b-icon icon="download"></b-icon>
        </span>
        <span>Download sample deduction schedule</span>
      </div>
      <div class="readme-box mt-2">
        <span class="readme">Read Me:</span>
        <span>Download the sample schedule. Input repayment entries and re-upload below as repayment schedule</span>
      </div>
    </div>
    <LineBreakTitle title="Step 2" />
    <DragDropFileInput
      @changed="fileChange($event)"
      :deleteFile="deleteFile"
      :loadingCount="loadingCount"
      :value="file"
      :max="120"
      label="Upload Deduction Schedule"
    />
    <button v-if="loadingCount>=120">Continue To Preview</button>
  </div>
</template>

<script>
import LineBreakTitle from "./LineBreakTitle";
import DragDropFileInput from "./Inputs/DragDropFileInput";
import creditor from "../store/Api/creditor"
export default {
  components: {
    LineBreakTitle,
    DragDropFileInput
  },
  data() {
    return {
      file: new File([""], ""),
      fileLoading: false,
      loadingCount: 0
    };
  },
  methods: {
    async fileChange(file) {
      this.file = file;
      let formData= new FormData()
      formData.append('excel_file',this.file)
      if (this.file !== null) {
       try{
          const response= await creditor.uploadSchedule(formData,this.handleProgress)
        this.loadingCount=this.loadingCount+20
        return response
       }catch(e){
         return e
       }
      }
    },
    handleProgress(progressEvent) {
      this.loadingCount = parseInt(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      );
    },
    deleteFile() {
      this.loadingCount = 0;
    },
    startCountdown(seconds) {
      this.loadingCount = seconds;

      const interval = setInterval(() => {
        this.loadingCount = this.loadingCount + 20;

        if (this.loadingCount === 100) {
          clearInterval(interval);
        }
      }, 1000);
    },
    uploadFile(file) {
      return file;
    }
  }
};
</script>

<style scoped>
.sample-box {
  border: #32ac59 1px solid;
  background: #27be581c;
  color: #27be58;
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
</style>
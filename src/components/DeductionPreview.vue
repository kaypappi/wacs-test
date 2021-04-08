<template>
  <img
    src="/assets/images/page-ring-loader.svg"
    alt="loader"
    v-if="fetchingItem"
    class="page-loader"
  />
  <div v-else class="preview-wrapper relative">
    <div class="preview-header">
      <div><span class="label">Batch Name: </span> <span class="value"></span></div>
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
import { mapGetters,mapActions } from "vuex";
export default {
  props: {
    prev: { type: Function, default: () => {} }
  },
  components: {
    BatchSchedulePreviewTable
  },
  methods:{
    ...mapActions({
      saveBatchSchedule:"CreditorDeduction/saveBatchSchedule"
    }),
    saveSchedule(){
      if(this.getFileFromState){
        this.saveBatchSchedule(this.getFileFromState)
      }
    }
  },
  computed: {
    ...mapGetters({
      fetchingItem: "CreditorDeduction/fetchingItem",
      getBatchItem: "CreditorDeduction/getBatchItem",
      getFileFromState:"CreditorDeduction/getFileFromState",

    }),
    findError(){
        return this.getBatchItem.data.some(item=>{item['error_occurred']===1})
    },
    
  }
};
</script>

<style scoped>
.summary-nav-buttons {
  display: flex;
  justify-content: space-between;
  padding:0 30px;
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
</style>
<template>
  <img src="/assets/images/page-ring-loader.svg" alt="loader" v-if="fetchingItem" class="page-loader" />
  <div v-else class="preview-wrapper">
      <BatchSchedulePreviewTable :previewItem="getBatchItem.data"/>
  </div>
</template>

<script>
import BatchSchedulePreviewTable from "./Table/BatchSchedulePreviewTable"
import {mapGetters} from "vuex"
export default {
    components:{
        BatchSchedulePreviewTable
    },
    computed:{
        ...mapGetters({
            fetchingItem:"CreditorDeduction/fetchingItem",
            getBatchItem:"CreditorDeduction/getBatchItem"
        }),
    },
};
</script>

<style>
</style>
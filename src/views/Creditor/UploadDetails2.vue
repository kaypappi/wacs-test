<template>
  <div class="upload-details-wrapper">
    <p class="h5 my-5 mx-4">Upload details</p>
    <div class="details-body">
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-skeleton-table :rows="5" :columns="4" :table-props="{ small:true, }"></b-skeleton-table>
        </template>
        <BatchItemsTable2 v-if="allBatchItems" :previewItem="allBatchItems.data" />
        <Pagination
        v-if="allBatchItems"
          :total="allBatchItems.meta.total"
          :currentPage="allBatchItems.meta.current_page"
          :lastPage="allBatchItems.meta.last_page"
          :from="allBatchItems.meta.from"
          :to="allBatchItems.meta.to"
        />
      </b-skeleton-wrapper>
    </div>
  </div>
</template>

<script>
import BatchItemsTable2 from "../../components/Table/BatchItemsTable2";
import Pagination from "../../components/Pagination/Pagination"
export default {
  components: {
    BatchItemsTable2,
    Pagination
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async getAllBatchItems(query) {
      this.loading = true;
      const response = await this.$store.dispatch(
        "CreditorDeduction/fetchAllBatchItems",query
      );
      this.loading = false;
      return response;
    }
  },
  computed: {
    allBatchItems() {
      return this.$store.state.CreditorDeduction.allBatchItems;
    }
  },
  watch:{
      '$route.query':{
          handler(query){
              this.getAllBatchItems(query)
          },
          immediate:true,
          deep:true
      }
  }
};
</script>

<style>
</style>
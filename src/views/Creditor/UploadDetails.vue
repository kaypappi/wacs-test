<template>
  <div class="upload-details-wrapper">
    <p class="h5 my-5 mx-4">Upload details</p>
    <div class="details-body">
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-skeleton-table :rows="5" :columns="4" :table-props="{ small:true, }"></b-skeleton-table>
        </template>
        <BatchItemsTable :previewItem="allBatchItems.data" />
        <Pagination
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
import BatchItemsTable from "../../components/Table/BatchItemsTable";
import Pagination from "../../components/Pagination/Pagination"
export default {
  components: {
    BatchItemsTable,
    Pagination
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async getAllBatchItems() {
      this.loading = true;
      const response = await this.$store.dispatch(
        "CreditorDeduction/fetchAllBatchItems"
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
  mounted() {
    this.getAllBatchItems();
  }
};
</script>

<style>
</style>
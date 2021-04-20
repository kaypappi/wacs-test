<template>
  <div class="master-records-wrapper">
    <div class="page-filters">
      <SearchFilterInput
        placeholder="Search by name, role, status"
        v-model="searchTerm"
        :onSearch="searchAdmin"
      />
      <IppisEmployeeFilter :isLoading="fetchingRecords" nextRoute="ippisDeduction"/>
      <div class="cta-div">
        <Button v-b-modal.add-user-form-modal class="cta-button">
          <img src="/assets/images/Plus.svg" alt="Plus sign" />
          Apply Filter
        </Button>
      </div>
    </div>
    <div class="master-records-body">
      <img
        src="/assets/images/page-ring-loader.svg"
        alt="loader"
        v-if="fetchingRecords "
        class="page-loader"
      />
      <IppisDeductionTable
        v-else
        :records="transactionalRecords.data.data"
      />
      <Pagination
      v-if="transactionalRecords"
      :total="transactionalRecords.data.total"
      :currentPage="transactionalRecords.data.current_page"
      :lastPage="transactionalRecords.data.last_page"
      :from="transactionalRecords.data.from"
      :to="transactionalRecords.data.to"
    />
    </div>
  </div>
</template>

<script>
import SearchFilterInput from "../../../components/Inputs/SearchFilterInput";
import IppisDeductionTable from "../../../components/Ipiss/IppisDeductionTable";
import IppisEmployeeFilter from "../../../components/Ipiss/IppisEmployeeFilter"
import Button from "../../../components/Buttons/Botton";
import Pagination from "../../../components/Pagination/Pagination"
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    IppisDeductionTable,
    SearchFilterInput,
    Button,
    Pagination,
    IppisEmployeeFilter
  },
  data() {
    return {
      searchTerm: "",
      fetchingRecords: false
    };
  },
  methods: {
    ...mapActions({
      getTransactionalRecords: "IppisMini/getTransactionalRecords"
    }),
    async fetchTransactionalRecords(query) {
      this.fetchingRecords = true;
      const response = await this.getTransactionalRecords(query);
      this.fetchingRecords = false;
      return response;
    },
    searchAdmin() {}
  },
  computed: {
    ...mapGetters({
      transactionalRecords: "IppisMini/transactionalRecords"
    })
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.fetchTransactionalRecords(query);
      },
      deep: true,
      immediate: true
    }
  },
};
</script>

<style>
</style>
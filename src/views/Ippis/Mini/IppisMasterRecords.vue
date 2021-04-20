<template>
  <div class="master-records-wrapper">
    <div class="page-filters">
      <IppisEmployeeFilter :isLoading="fetchingRecords" nextRoute="ippisMasterRecords"/>
    </div>
    <div class="master-records-body">
      <img
        src="/assets/images/page-ring-loader.svg"
        alt="loader"
        v-if="fetchingRecords "
        class="page-loader"
      />
      <IppisEmployeeRecordsTable
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
import IppisEmployeeRecordsTable from "../../../components/Ipiss/IppisEmployeeRecordsTable";
import IppisEmployeeFilter from "../../../components/Ipiss/IppisEmployeeFilter"
import Button from "../../../components/Buttons/Botton";
import Pagination from "../../../components/Pagination/Pagination"
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    IppisEmployeeRecordsTable,
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
  mounted() {
    // this.fetchTransactionalRecords({})
  }
};
</script>

<style>
</style>
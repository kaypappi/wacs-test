<template>
    <img
        src="/assets/images/page-ring-loader.svg"
        alt="loader"
        v-if="checkingDeductions "
        class="page-loader"
      />
  <div v-else>
    <b-table
      @row-clicked="handleRowClick"
      small
      :fields="fields"
      :items="singleTransactionalRecords.data.data"
      responsive
      hover
    >
      <template v-slot:cell(Data_Source)="data">{{data.item.data_source}}</template>
      <template v-slot:cell(Refrence_Id)="data">{{data.item.reference_id}}</template>
      <template v-slot:cell(Surname)="data">{{data.item.employee_surname}}</template>
      <template v-slot:cell(First_Name)="data">{{data.item.employee_first_name}}</template>
      <template v-slot:cell(Middle_Name)="data">{{data.item.employee_middle_name}}</template>
      <template v-slot:cell(IPPIS_Number)="data">{{data.item.ippis_number}}</template>
      <template v-slot:cell(Payroll_Name)="data">{{data.item.payroll_name}}</template>
      <template v-slot:cell(Staff_Id)="data">{{data.item.staff_id}}</template>
      <template v-slot:cell(MDA)="data">{{data.item.mda}}</template>
      <template v-slot:cell(Bank)="data">{{data.item.bank_name}}</template>
      <template v-slot:cell(EarningsDeduction)="data">{{data.item.earning_or_deduction}}</template>
      <template v-slot:cell(Amount_(N))="data">{{ $options.filters.number(data.item.amount,  '0,0')}}</template>
    </b-table>
    <Pagination
      v-if="singleTransactionalRecords"
      :total="singleTransactionalRecords.data.total"
      :currentPage="singleTransactionalRecords.data.current_page"
      :lastPage="singleTransactionalRecords.data.last_page"
      :from="singleTransactionalRecords.data.from"
      :to="singleTransactionalRecords.data.to"
    />
    <CustomModal id="single-deduction-detail" size="lg" :scrollable="true" :hover="true">
      <div v-if="currentItem" class="details-wrapper">
        <template v-for="(value,name,index) in details">
          <div :key="currentItem.ippis_number + index" class="detail-holder mb-2">
            <p class="detail-title mb-0">{{formatLabel(name)}}</p>
            <p class="detail-body">{{value}}</p>
          </div>
        </template>
      </div>
    </CustomModal>
  </div>
</template>

<script>
import CustomModal from "../../../components/Modals/CustomModal";
import Pagination from "../../../components/Pagination/Pagination";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    CustomModal,
    Pagination
  },
  data() {
    return {
      checkingDeductions: false,
      currentItem: null,
      fields: [
        "Data_Source",
        "Refrence_Id",
        "Surname",
        "First_Name",
        "Middle_Name",
        "IPPIS_Number",
        "Payroll_Name",
        "Staff_Id",
        "MDA",
        "Bank",
        "EarningsDeduction",
        "Amount_(N)"
      ]
    };
  },
  methods: {
    ...mapActions({
      checkTransactionalRecord: "IppisMini/checkTransactionalRecord"
    }),
    async CheckTransactionalRecords(ippis,query) {
      this.checkingDeductions = true;
      const response = await this.checkTransactionalRecord({ippisNumber:ippis,query});
      this.checkingDeductions = false;
      return response;
    },
    handleRowClick(item) {
      this.currentItem = item;
      this.$bvModal.show("single-deduction-detail");
    },

    formatLabel(sentence) {
      const newSentence = sentence
        .replace(/_/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      return newSentence;
    },
    
  },
  computed: {
    ...mapGetters({
      singleTransactionalRecords: "IppisMini/singleTransactionalRecords"
    }),
    details() {
      if (this.currentItem) {
        const Item = this.currentItem;
        const reject = ["created_at", "updated_at", "id"];
        const filtered = Object.keys(Item)
          .filter(key => !reject.includes(key))
          .reduce((obj, key) => ({ ...obj, [key]: Item[key] }), {});
        return filtered;
      }
      return null;
    }
  },
  watch:{
      "$route.query":{
          handler(query){
              const ippis = this.$route.params.ippis;
              this.CheckTransactionalRecords(ippis,query);
          },
          immediate:true,
          deep:true
      }
  },
};
</script>

<style>
</style>
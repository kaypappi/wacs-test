<template>
  <FilterDropdown>
    <template v-slot:header>
      <span class="title">
        <BIconFunnelFill />Filtered by loan requests:
      </span>
      <span>{{activeOption}}</span>
    </template>
    <template v-slot:body>
      <div class="day-options">
        <template v-for="(option,index) in dayOptions">
          <span
            :class="[option===activeOption? 'isActive' : '']"
            :key="index"
            @click="activeOption=option"
          >{{option}}</span>
        </template>
      </div>
      <div class="filter-section">
        <div class="date-header section-header">Date</div>
        <div class="section-body">
          <date-field
            @changed="updateDate($event,'startDate')"
            id="start-datePicker"
            placeholders="Start date"
          ></date-field>
          <span>-</span>
          <date-field
            @changed="updateDate($event,'endDate')"
            id="end-datePicker"
            placeholders="End date"
          ></date-field>
        </div>
      </div>
      <div class="filter-section">
        <div class="status-header section-header">Status</div>
        <div class="section-body">
          <div class="checkbox-wrapper">
            <div>
              <Checkbox @changed="updateChecked($event,'Pending')" title="Pending" />
              <Checkbox @changed="updateChecked($event,'Running')" title="Running" />
            </div>
            <div>
              <Checkbox @changed="updateChecked($event,'Ippis Approved')" title="Ippis Approved" />

              <Checkbox @changed="updateChecked($event,'User Declined')" title="User Declined" />
            </div>
          </div>
        </div>
      </div>
      <div class="filter-section">
        <div class="status-header section-header">Search</div>
        <div class="section-body">
          <SearchFilterInput
            placeholder="Search by name, ippiss No"
            v-model="searchTerm"
            :onSearch="()=>{}"
          />
        </div>
      </div>
      <div class="filter-section">
        <div class="status-header section-header">
          <Checkbox title="Save as default filter" />
        </div>
        <div class="section-body">
          <div class="clear">
            <Botton>Clear</Botton>
          </div>
          <SubmitButton name="Apply" :isLoading="isLoading" />
        </div>
      </div>
    </template>
  </FilterDropdown>
</template>

<script>
import { BIconFunnelFill } from "bootstrap-vue";
import DateField from "../Inputs/DateField";
import SearchFilterInput from "../Inputs/SearchFilterInput";
import Checkbox from "../Inputs/Checkbox";
import Botton from "../Buttons/Botton";
import SubmitButton from "../Buttons/SubmitButton";
import FilterDropdown from "../Dropdown/FilterDropdown";

export default {
  components: {
    "date-field": DateField,
    SearchFilterInput,
    Checkbox,
    Botton,
    SubmitButton,
    BIconFunnelFill,
    FilterDropdown
  },
  data() {
    return {
      dayOptions: ["Today", "Last 7days", "30 days", "1 year"],
      activeOption: "Today",
      popUpVisible: false,
      searchTerm: "",
      isLoading: false,
      filters: {
        activeOption: "Today",
        startDate: "",
        endStart: "",
        status: {}
      }
    };
  },
  methods: {
    updateDate(date, type) {
      this.filters[type] = date;
    },
    updateChecked(checked, type) {
      this.filters.status = { ...this.filters.status, [type]: checked };
      console.log(this.filters.status);
    }
  }
};
</script>

<style scoped>

</style>
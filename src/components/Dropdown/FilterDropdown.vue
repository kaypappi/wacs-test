<template>
  <div ref="trigger" class="filter-by">
    <div @click="handleClick" class="notification">
      <span class="title">
        <BIconFunnelFill />Filtered by loan requests:
      </span>
      <span>{{activeOption}}</span>
    </div>

    <div v-if="popUpVisible" class="dropdown-content">
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
    </div>
  </div>
</template>

<script>
import { BIconFunnelFill } from "bootstrap-vue";
import DateField from "../Inputs/DateField";
import SearchFilterInput from "../Inputs/SearchFilterInput";
import Checkbox from "../Inputs/Checkbox";
import Botton from "../Buttons/Botton";
import SubmitButton from "../Buttons/SubmitButton";

export default {
  components: {
    "date-field": DateField,
    SearchFilterInput,
    Checkbox,
    Botton,
    SubmitButton,
    BIconFunnelFill
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
    handleClick(e) {
      if (e) {
        if (e.target.className !== "dropdown-content") {
          this.popUpVisible = !this.popUpVisible;
        }
      }
      if (this.popUpVisible) {
        document.addEventListener("click", this.handleOutsideClick, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick);
      }
    },
    handleOutsideClick(e) {
      // ignore clicks on the component itself
      if (
        this.$refs.trigger.contains(e.target) ||
        e.target.matches(
          ".b-calendar .b-calendar-grid-body .col[data-date] .btn"
        )
      ) {
        return;
      }

      if (!this.popUpVisible) {
        document.removeEventListener("click", this.handleOutsideClick);
      }

      this.handleClick(e);
    },
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
* {
  font-size: 14px;
}
.notification {
  color: #424242;
  font-weight: 500;
  cursor: pointer;
}
.title {
  color: #27be58;
}
.isActive {
  border: 1px solid #cccccc;
  background-color: #f8f8f8;
  color: #27be58;
}
.dropdown-content {
  width: 360px;
  margin-left: 0px;
  margin-top: -15px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 #eaeaea;
  position: absolute;
  z-index: 1;
  top: 55px;
  right: 0;
}
.day-options {
  padding: 20px;
  width: 100%;
  display: flex;
  color: #424242;
  font-weight: 500;
  justify-content: space-between;
}

.day-options span {
  padding: 4px 10px;
  cursor: pointer;
}

.section-header {
  background: #f8f8f8;
  padding: 7px 20px;
  color: #424242;
  font-weight: 500;
}

.section-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  color: #424242;
}
.search-box {
  margin: 0;
}
.main-body-content .page-filters .search-box {
  margin: 0;
}
.checkbox-wrapper {
  display: flex;
  flex-direction: row;
}
.checkbox-wrapper > div {
  margin-right: 20px;
}
.filter-section button {
  height: 35px;
  width: 133px;
  background-color: #27be58;
  font-size: 16px;
  border: none;
  color: #ffffff;
  font-family: "Work Sans";
}

.filter-section .clear button {
  background-color: white;
  border: 1px solid #27be58;
  box-sizing: border-box;
  color: #27be58;
}
</style>
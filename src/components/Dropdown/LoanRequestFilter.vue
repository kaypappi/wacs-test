<template>
  <FilterDropdown>
    <template v-slot:header>
      <span class="title">
        <BIconFunnelFill />Filtered by:
      </span>
      <span>{{shownTerms}}</span>
    </template>
    <template v-slot:body>
      <form @submit.prevent="applyFilter">
        <div class="filter-section">
          <div class="date-header section-header">Date</div>
          <div class="section-body">
            <date-field
              @changed="handleInput($event,'date','startDate')"
              id="start-datePicker"
              placeholders="Start date"
              :value="filters.date.startDate"
            ></date-field>
            <span>-</span>
            <date-field
              @changed="handleInput($event,'date','endDate')"
              id="end-datePicker"
              placeholders="End date"
              :value="filters.date.endDate"
            ></date-field>
          </div>
        </div>
        <div class="filter-section">
          <div class="status-header section-header">Status</div>
          <div class="section-body">
            <div class="checkbox-wrapper">
              <div>
                <Checkbox
                  :value="filters.status.Pending"
                  @changed="handleInput($event,'status','Pending')"
                  title="Pending"
                />
                <Checkbox
                  :value="filters.status.Running"
                  @changed="handleInput($event,'status','Running')"
                  title="Running"
                />
              </div>
              <div>
                <Checkbox
                  :value="filters.status.Ippis"
                  @changed="handleInput($event,'status','Approved')"
                  title="Ippis Approved"
                />

                <Checkbox
                  :value="filters.status.Declined"
                  @changed="handleInput($event,'status','Rejected')"
                  title="User Declined"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="filter-section">
          <div class="section-body">
            <div class="clear">
              <Botton :onclick="clearFields" type="button">Clear</Botton>
            </div>
            <SubmitButton name="Apply" :isLoading="isLoading" />
          </div>
        </div>
      </form>
    </template>
  </FilterDropdown>
</template>

<script>
import { BIconFunnelFill } from "bootstrap-vue";
import DateField from "../Inputs/DateField";
import Checkbox from "../Inputs/Checkbox";
import Botton from "../Buttons/Botton";
import SubmitButton from "../Buttons/SubmitButton";
import FilterDropdown from "../Dropdown/FilterDropdown";
import { baseUrl } from "../../router/api_routes";
import axios from "axios";

export default {
  components: {
    "date-field": DateField,
    Checkbox,
    Botton,
    SubmitButton,
    BIconFunnelFill,
    FilterDropdown
  },
  props: {
    filterRequests: {
      type: Function,
      default: () => {}
    },
    toggleFound: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      popUpVisible: false,
      isLoading: false,
      filteredTerms: [],
      shownTerms:"",
      filters: {
        date:{
          startDate: "",
        endDate: "",
        },
        status: [],
        statusValue: {
          active: false,
          inactive: false,
          draft: false
        }
      }
    };
  },
  methods: {
    handleInput(event, type, position) {
      if (position) {
        if (type === "status") {
          this.filters.status = !this.filters.status.includes(position)
            ? [...this.filters.status, position]
            : [
                ...this.filters.status.filter(term => {
                  return term !== position;
                })
              ];
          this.filters.statusValue[position] = event;
        } else {
          this.filters[type][position] = event;
        }
        if (event) {
          this.filteredTerms = !this.filteredTerms.includes(type)
            ? [...this.filteredTerms, type]
            : [...this.filteredTerms];
        } else {
          this.filteredTerms = [
            ...this.filteredTerms.filter(term => {
              return term !== type;
            })
          ];
        }
      } else {
        this.filters[type] = event;
        if (event) {
          this.filteredTerms = !this.filteredTerms.includes(type)
            ? [...this.filteredTerms, type]
            : [...this.filteredTerms];
        } else {
          this.filteredTerms = [
            ...this.filteredTerms.filter(term => {
              return term !== type;
            })
          ];
        }
      }
    },
    clearFields() {
      const clearFilters = {
        date:{
          startDate: "",
        endDate: "",
        },
        status: {
          Pending: false,
          Running: false,
          Ippiss: false,
          Declined: false
        }
      };
      this.filters = { ...clearFilters };
      this.filteredTerms=[]
      this.showmTerms=""
      this.applyFilter();
    },
    applyFilter() {
      let date = "";
      this.shownTerms=this.filteredTerms.join(", ")
      this.isLoading=true
      if (this.filters.date.startDate) {
        if (this.filters.date.endDate) {
          date = `date=${this.filters.date.startDate}.${this.filters.date.endDate}`;
        } else {
          date = `date=${this.filters.date.startDate}`;
        }
      }
      const status =
        this.filters.status.length > 0
          ? `&status=${this.filters.status.join(",")}`
          : "";
      const URL = baseUrl + `creditor/request/view?` + `${date}` + `${status}`;
      axios
        .get(URL)
        .then(response => {
          if (response.data.data.length === 0) {
            this.toggleFound(false);
            this.isLoading=false
          } else {
            this.filterRequests(response.data);
            this.toggleFound(true);
            this.isLoading=false
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
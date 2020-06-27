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
                  :value="filters.statusValue.Pending"
                  @changed="handleInput($event,'status','Pending')"
                  title="Pending"
                />
                <Checkbox
                  :value="filters.statusValue.bank_approved"
                  @changed="handleInput($event,'status','bank_approved')"
                  title="Bank Approved"
                />
                <Checkbox
                  :value="filters.statusValue.awaiting_ippis"
                  @changed="handleInput($event,'status','awaiting_ippis')"
                  title="Awaiting IPPIS Approval"
                />
              </div>
              <div>
                <Checkbox
                  :value="filters.statusValue.Running"
                  @changed="handleInput($event,'status','Running')"
                  title="Running"
                />
                <Checkbox
                  :value="filters.statusValue.declined"
                  @changed="handleInput($event,'status','declined')"
                  title="Declined"
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
    "isLoading":Boolean,
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
      filteredTerms: [],
      shownTerms:"",
      filters: {
        date:{
          startDate: "",
        endDate: "",
        },
        status: [],
        statusValue: {
          Pending:false,
          Running:false,
          awaiting_ippis:false,
          declined:false,
          bank_approved:false
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
        status: [],
        statusValue: {
          Pending:false,
          Running:false,
          Approved:false,
          Rejected:false
        }
      };
      this.filters = { ...clearFilters };
      this.filteredTerms=[]
      this.showmTerms=""
      this.applyFilter();
    },
    applyFilter() {
     let  query={}
      this.shownTerms=this.filteredTerms.join(", ")
      if (this.filters.date.startDate) {
        if (this.filters.date.endDate) {
         const date = `${this.filters.date.startDate}.${this.filters.date.endDate}`;
          query.date=date
        } else {
         const date = `${this.filters.date.startDate}`;
         query.date=date
        }
      }

    if(this.filters.status.length>0){
      const status=`${this.filters.status.join(",")}`
      query.status=status
    }

      
      this.$router.push({ name: "loanRequest", query })
    }
  }
};
</script>

<style scoped>
</style>
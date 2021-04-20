<template>
  <FilterDropdown>
    <template v-slot:header>
      <span class="title">
        <BIconFunnelFill />Filtered by:
      </span>
      <span>{{filteredTerms.join(", ")}}</span>
    </template>
    <template v-slot:body>
      <form @submit.prevent="applyFilter">
        <div class="filter_section">
          <b-form-row>
            <b-col class="d-flex justify-content-start" sm="12" md="6">
                <TextInput
                  type="text"
                  id="mda"
                  name="mda"
                  label="Mda"
                  inputClass="form-modal-inputs"
                  labelClass="form-modal-label"
                  v-model="filters.mda"
                  length="short"
                  :required="false"
                />
              </b-col>
              <b-col class="d-flex justify-content-end" sm="12" md="6">
                <TextInput
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  inputClass="form-modal-inputs"
                  labelClass="form-modal-label"
                  v-model="filters.name"
                  length="short"
                  :required="false"
                />
              </b-col>
              <b-col class="d-flex justify-content-start" sm="12" md="6">
                <TextInput
                  type="text"
                  id="bank"
                  name="bank"
                  label="Bank"
                  inputClass="form-modal-inputs"
                  labelClass="form-modal-label"
                  v-model="filters.bank"
                  length="short"
                  :required="false"
                />
              </b-col>
              <b-col class="d-flex justify-content-end" sm="12" md="6">
                <TextInput
                  type="text"
                  id="number"
                  name="number"
                  label="Number"
                  inputClass="form-modal-inputs"
                  labelClass="form-modal-label"
                  v-model="filters.mobile_number"
                  length="short"
                  :required="false"
                />
              </b-col>
              <b-col class="d-flex justify-content-start" sm="12" md="12">
                <TextInput
                  type="text"
                  id="reference"
                  name="reference"
                  label="Reference"
                  inputClass="form-modal-inputs"
                  labelClass="form-modal-label"
                  v-model="filters.reference_id"
                  length="long"
                  :required="false"
                />
              </b-col>
              
          </b-form-row>
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
import TextInput from "../Inputs/TextInput";
import Botton from "../Buttons/Botton";
import SubmitButton from "../Buttons/SubmitButton";
import FilterDropdown from "../Dropdown/FilterDropdown";

export default {
  components: {
    TextInput,
    Botton,
    SubmitButton,
    BIconFunnelFill,
    FilterDropdown
  },
  props: {
    isLoading: Boolean,
    nextRoute:String,
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
      filters: {

        }
      }
    },
  methods: {
    
    clearFields() {
      this.filters={}
      this.applyFilter();
    },
    applyFilter() {
        this.$router.push({name:this.nextRoute,query:this.filters})
    }
  },
   watch: {
    filters: {
      handler(filters) {
        this.filteredTerms=[]
        Object.entries(filters).forEach(([key, value]) => {
          if(value){
              this.filteredTerms.push(key.replace(/[_]/g," "))
          }
        });
      },
      immediate: true,
      deep:true
    }
  }
};
</script>

<style scoped>
.filter_section{
    padding: 15px 20px;
}
</style>
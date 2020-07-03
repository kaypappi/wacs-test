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
            @changed="handleText($event,'date','from')"
            id="start-datePicker"
            placeholders="Start date"
            :value="filters.date.from"
          ></date-field>
          <span>-</span>
          <date-field
            @changed="handleText($event,'date','to')"
            id="end-datePicker"
            placeholders="End date"
            :value="filters.date.to"
          ></date-field>
        </div>
      </div>
        <div class="filter-section">
        <div class="status-header section-header">Status</div>
        <div class="section-body">
          <div class="checkbox-wrapper">
            <div>
              <Checkbox :value="filters.statusValue.active" @changed="handleText($event,'status','active')" title="Active" />
            </div>
            <div>
              <Checkbox :value="filters.statusValue.inactive" @changed="handleText($event,'status','inactive')" title="Inactive" />
            </div>
            <div>
              <Checkbox :value="filters.statusValue.draft" @changed="handleText($event,'status','draft')" title="Draft" />
            </div>
          </div>
        </div>
      </div>
      <div class="filter-section">
        <div class="status-header section-header">Amount</div>
        <div class="section-body">
          <TextInput placeholder="From" :required="filters.amount.to? true:false" :value="filters.amount.from" @input="handleText($event,'amount','from')" inputClass="inputClass" length="short"></TextInput>
          <TextInput placeholder="To" :required="filters.amount.from? true:false" :value="filters.amount.to" @input="handleText($event,'amount','to')" inputClass="inputClass" length="short" ></TextInput>
        </div>
      </div>
      <div class="filter-section">
        <div class="status-header section-header">Interest Rate</div>
        <div class="section-body">
          <TextInput placeholder="From" :required="filters.interestRate.to? true:false" :value="filters.interestRate.from" @input="handleText($event,'interestRate','from')" inputClass="inputClass" length="short" ></TextInput>
          <TextInput placeholder="To" :required="filters.interestRate.from? true:false" :value="filters.interestRate.to" @input="handleText($event,'interestRate','to')" inputClass="inputClass" length="short" ></TextInput>
        </div>
      </div>
       <div class="filter-section">
        <!-- <div class="status-header section-header">
          <Checkbox title="Save as default filter" />
        </div> -->
        <div class="section-body">
          <div  class="clear">
            <Botton :onclick="clearFilters" type="button" >Clear</Botton>
          </div>
          <div ><SubmitButton  name="Apply" :isLoading="isLoading" /></div>
        </div>
      </div>
        
        </form>
    </template>
  </FilterDropdown>
</template>

<script>
//import axios from "axios";
import FilterDropdown from "../Dropdown/FilterDropdown";
import { BIconFunnelFill } from "bootstrap-vue";
//import Switchs from "../Inputs/Switch"
import TextInput from '../Inputs/TextInput'
import DateField from "../Inputs/DateField";
import SubmitButton from "../Buttons/SubmitButton";
import Botton from "../Buttons/Botton";
import Checkbox from "../Inputs/Checkbox";
//import{LOANOFFERSAPI} from '../../router/api_routes'

export default {
  components: {
    "date-field": DateField,
    FilterDropdown,
    BIconFunnelFill,
    //Switchs,
    TextInput,
    SubmitButton,
    Botton,
    Checkbox

  },
  props:{
    filterOffers:{
      type:Function,
      default:()=>{}
    },
    toggleFound: {
      type: Function,
      default: () => {}
    },
    'isLoading':Boolean
  },
  data(){
      return{
          errors:{},
          filteredTerms:[],
          shownTerms:'',
          filters:{
              status:[],
              statusValue:{
                active:false,
                inactive:false,
                draft:false
              },
              code:'',
              MInterest:'',
              amount:{
                  from:'',
                  to:'',
              },
              interestRate:{
                  from:'',
                  to:'',
              },
              date:{
                  from:'',
                  to:'',
              }

          },
          
      }
  },
  methods:{
      updateSwitch(event){
          this.filters.status=event
      },
    handleText(event,type,position){
        if(position){
          if(type==='status'){
            this.filters.status=!this.filters.status.includes(position)?[...this.filters.status,position]:[...this.filters.status.filter(term=>{return term!==position})]
            this.filters.statusValue[position]=event
          }
          else{this.filters[type][position]=event}
            if(event){
              this.filteredTerms=!this.filteredTerms.includes(type)?[...this.filteredTerms,type]:[...this.filteredTerms]
            }
            else{
              this.filteredTerms=[...this.filteredTerms.filter(term=>{return term!==type})]
            }
        }
        else{
            this.filters[type]=event
            if(event){
              this.filteredTerms=!this.filteredTerms.includes(type)?[...this.filteredTerms,type]:[...this.filteredTerms]
            }
            else{
              this.filteredTerms=[...this.filteredTerms.filter(term=>{return term!==type})]
            }
        }
    },
    updateChecked(checked, type) {
      this.filters.status = { ...this.filters.status, [type]: checked };
    },
    applyFilter(){
      const query={}
      if(this.filters.status.length>0){
        query.status=this.filters.status.join(',')
      }
      if(this.filters.code){
        query.code=this.filters.code
      }
      if(this.filters.MInterest){
        query.moratoriuminterest=this.filters.MInterest
      }
      if(this.filters.amount.from){
        query.from=this.filters.amount.from
      }
      if(this.filters.amount.to){
        query.to=this.filters.amount.to
      }
      if(this.filters.interestRate.from&&this.filters.interestRate.to){
        query.rate=`${this.filters.interestRate.from}.${this.filters.interestRate.to}`
      }
      if (this.filters.date.from) {
        if (this.filters.date.to) {
          query.date = `${this.filters.date.from}.${this.filters.date.to}`;
        } else {
          query.date = `${this.filters.date.from}`;
        }
      }
    
    
    this.$router.push({name:'AdminLoanOffers',query})
},
    clearFilters(){
      const clearFilter={
              status:[],
              statusValue:{
                active:false,
                inactive:false,
                draft:false
              },
              code:'',
              MInterest:'',
              amount:{
                  from:'',
                  to:'',
              },
              interestRate:{
                  from:'',
                  to:'',
              },
              date:{
                  from:'',
                  to:'',
              }

          }
      this.filters={...clearFilter}
      this.filteredTerms=[]
      this.shownTerms=""
      this.applyFilter()
      
    }
  }
};
</script>

<style >

input.inputClass {
    width: inherit;
    background: #f8f8f8;
    border: 1px solid #CCCCCC;
    padding: 6px 12px;
}

.filter-top{
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
}
</style>
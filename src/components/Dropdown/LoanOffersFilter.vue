<template>
  <FilterDropdown>
    <template v-slot:header>
      <span class="title">
        <BIconFunnelFill />Filtered by Date:
      </span>
      <span>Date</span>
    </template>
    <template v-slot:body>
        <form @submit.prevent="applyFilter">
          <div class="filter-top">
          <div class="switch-section">
          <label for="">Status</label>
          <Switchs :title="!filters.status ? 'active': 'inactive'" @switchChange="updateSwitch($event)"></Switchs>
        </div>
            <div class="filter-code">
                <TextInput :required="false" :value="filters.code" @input="handleText($event,'code')" inputClass="inputClass" length="short" label="Code"></TextInput>
            </div>
        </div>
      <div class="filter-section">
        <div class="status-header section-header">Amount</div>
        <div class="section-body">
          <TextInput :required="filters.amount.to? true:false" :value="filters.amount.from" @input="handleText($event,'amount','from')" inputClass="inputClass" length="short" label="From"></TextInput>
          <TextInput :required="filters.amount.from? true:false" :value="filters.amount.to" @input="handleText($event,'amount','to')" inputClass="inputClass" length="short" label="To"></TextInput>
        </div>
      </div>
      <div class="filter-section">
        <div class="status-header section-header">Interest Rate</div>
        <div class="section-body">
          <TextInput :required="filters.interestRate.to? true:false" :value="filters.interestRate.from" @input="handleText($event,'interestRate','from')" inputClass="inputClass" length="short" label="From"></TextInput>
          <TextInput :required="filters.interestRate.from? true:false" :value="filters.to" @input="handleText($event,'interestRate','to')" inputClass="inputClass" length="short" label="To"></TextInput>
        </div>
      </div>
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
          ></date-field>
        </div>
      </div>
       <div class="filter-section">
        <div class="status-header section-header">
          <Checkbox title="Save as default filter" />
        </div>
        <div class="section-body">
          <div class="clear">
            <Botton :onclick="()=>{filters={...clearFilters}}">Clear</Botton>
          </div>
          <div ><SubmitButton  name="Apply" :isLoading="isLoading" /></div>
        </div>
      </div>
        
        </form>
    </template>
  </FilterDropdown>
</template>

<script>
import axios from "axios";
import FilterDropdown from "../Dropdown/FilterDropdown";
import { BIconFunnelFill } from "bootstrap-vue";
import Switchs from "../Inputs/Switch"
import TextInput from '../Inputs/TextInput'
import DateField from "../Inputs/DateField";
import SubmitButton from "../Buttons/SubmitButton";
import Botton from "../Buttons/Botton";
import Checkbox from "../Inputs/Checkbox";
import{LOANOFFERSAPI} from '../../router/api_routes'

export default {
  components: {
    "date-field": DateField,
    FilterDropdown,
    BIconFunnelFill,
    Switchs,
    TextInput,
    SubmitButton,
    Botton,
    Checkbox

  },
  props:{
    filterOffers:{
      type:Function,
      default:()=>{}
    }
  },
  data(){
      return{
          isLoading:false,
          errors:{},
          filters:{
              status:true,
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
          clearFilters:{
              status:true,
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
      }
  },
  methods:{
      updateSwitch(event){
          this.filters.status=event
      },
    handleText(event,type,position){
        if(position){
            this.filters[type][position]=event
        }
        else{
            this.filters[type]=event
        }
    },
    applyFilter(){
      this.isLoading=true
      const Status=!this.filters.status? 'status=active':'status=inactive'
      const code=this.filters.code ? `code=${this.filters.code}`:''
      const MInterest=this.filters.MInterest ? `moratoriuminterest=${this.filters.MInterest}`:''
      const amountFrom=this.filters.amount.from? `from=${this.filters.amount.from}`:''
      const amountTo=this.filters.amount.to? `from=${this.filters.amount.to}`:''
      const interestRateFrom=this.filters.interestRate.from? `interestRateFrom=${this.filters.interestRate.from}`:''
      const interestRateTo=this.filters.interestRate.to? `interestRateTo=${this.filters.interestRate.to}`:''
      const date=(this.filters.date.from&&this.filters.date.to) ? `date=${this.filters.date.from}##${this.filters.date.to}`:'' 
      
      const URL=`${LOANOFFERSAPI}?${code}&${Status}&${MInterest}&${amountFrom}&${amountTo}&${interestRateFrom}&${interestRateTo}&${date}`
    axios.get(URL,{code:'001'}).then(res=>{
      this.filterOffers(res.data)
      this.isLoading=false
    }).catch(err=>{
      this.errors=err
    })
    }
  }
};
</script>

<style >

input.inputClass {
    width: inherit;
    background: #f8f8f8;
    border: 1px solid #CCCCCC;
}

.filter-top{
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
}
</style>
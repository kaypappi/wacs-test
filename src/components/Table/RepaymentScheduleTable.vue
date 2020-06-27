<template>
  <b-table small :fields="fields" :items="repayments">
      <template v-slot:cell(Date)="data">
          {{data.item.date}}
      </template>
      <template v-slot:cell(Name)="data">
          {{data.item.name}}
      </template>
      <template v-slot:cell(IPPIS_Number)="data">
          {{data.item.ippis_number}}
      </template>
      <template v-slot:cell(ScheduleNumber)="data">
          {{data.item.schedule_number}}
      </template>
      <template v-slot:cell(Amount(N))="data">
          {{data.item.amount}}
      </template>
      <template v-slot:cell(Schedule)="data">
          <span @click="viewSchedule(data.item.id)" class="view-schedule">View Schedule Breakdown</span>
      </template>
       <template v-slot:head(Schedule)="data">
          <span></span>
      </template>
  </b-table>
</template>

<script>
export default {
    props:{
        repayments:Array
    },
    data(){
        return{
            fields:["Date","Name","IPPIS_Number","ScheduleNumber","Amount(N)","Schedule"]
        }
    },
    methods:{
        viewSchedule(id){
            this.$router.push({name:'repaymentsSchedule',params:{id}})
        }
    }
}
</script>

<style>
.view-schedule{
    color: #27BE58;
    font-size: 14px;
    cursor: pointer;
}
</style>
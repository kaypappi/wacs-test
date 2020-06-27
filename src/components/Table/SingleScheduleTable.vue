<template>
  <b-table :hover="true" :fields="fields" :items="schedule">
    <template v-slot:cell(No)="data">{{data.item.no}}</template>
    <template v-slot:cell(Month)="data">{{data.item.month}}</template>
    <template v-slot:cell(Year)="data">{{data.item.year}}</template>
    <template v-slot:cell(Amount)="data">{{formatNumber(data.item.amount)}}</template>
  </b-table>
</template>

<script>
export default {
  props: {
    schedule: Array
  },
  data() {
    return {
      fields: ["No", "Month", "Year", "Amount"]
    };
  },
  methods: {
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  mounted(){
    console.log(this.schedule)
  }
};
</script>

<style>
</style>
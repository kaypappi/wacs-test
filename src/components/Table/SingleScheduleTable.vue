<template>
  <b-table :hover="true" :fields="fields" :items="schedule">
    <template v-slot:cell(No)="data">{{data.item.no}}</template>
    <template v-slot:cell(Month)="data">{{data.item.month}}</template>
    <template v-slot:cell(Year)="data">{{data.item.year}}</template>
    <template v-slot:cell(Amount)="data">{{ $options.filters.number(data.item.amount_requested,  '0,0')}}</template>
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
  },
  mounted(){
  }
};
</script>

<style>
</style>
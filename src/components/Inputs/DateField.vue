<template>
  <div>
    <b-form-datepicker
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      class="date-container"
      :id="id"
      :placeholder="placeholders"
      local="en"
      v-model="date"
      @context="$emit('changed',date)"
      dropright
    ></b-form-datepicker>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    placeholders: String,
  },
  data(){
      return{
          date:''
      }
  }
};
</script>

<style scoped>
.date-container {
  background-color: #f8f8f8;
  border-radius: 0px;
  width: 150px;
}

.b-form-btn-label-control > label {
  font-size: 14px;
}
</style>
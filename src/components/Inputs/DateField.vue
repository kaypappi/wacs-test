<template>
  <div>
    <b-form-datepicker
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      class="date-container"
      :id="id"
      :placeholder="placeholders"
      local="en"
      v-model="inputVal"
      dropright
    ></b-form-datepicker>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    placeholders: String,
    value:String
  },
  data(){
      return{
          date:''
      }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('changed',val)
      }
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
<template>
  <div :class="`select-input ${inputClass}`">
    <b-form-select
      :name="name"
      class="no-border input-lg mb-0"
      :disabled="disabled"
      v-bind="$attrs"
      v-model="innerValue"
      :options="options"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  props: {
    vid: {
      type: String
    },
    // must be included in props
    value: {
      type: null
    },
    bail: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    type: {
      type: String,
      default: "text"
    },
    name: String,
    inputClass:String,
    options: {
      type: Array
    }
  },
  data: () => ({
    innerValue: ""
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style scoped>
.text-input >>> .form-control {
  box-sizing: border-box;
  border: 1px solid #dee4df;
  border-radius: 4px;
  background-color: #ffffff;
}

.select-input >>> .custom-select {
  box-sizing: border-box;
  border: 1px solid #dee4df;
  border-radius: 4px;
  background-color: #ffffff;
}

label {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  color: #000000;

  opacity: 0.5;
}
</style>

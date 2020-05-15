<template>
  <div :class="[length == 'short' ? 'short-tagged-input' : 'long-text-input']">
    <label :for="id" :class="labelClass">{{label}}</label>
    <b-form-textarea
      :id="id"
      :placeholder="placeholder"
      :class="inputClass"
      :rows="row"
      no-resize
      v-model="inputVal"
      :required="required"
      
    ></b-form-textarea>
    <span v-if="error" class="form-input-error">{{error[0]}}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    required: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Array,
      default: () => []
    },
    keyupEvent: {
      type: Function,
      default: () => ""
    },
    inputClass: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    length: {
      type: String,
      default: "long"
    },
    label: String,
    id: String,
    name: String,
    placeholder: String,
    value: String,
    row:String
  },
  data(){
      return{
          description:''
      }
  },
  methods: {
    keyupEven() {
      this.keyupEvent(this.name);
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('changes',val);
      }
    }
  }
};
</script>

<style>
.inputClasses {
    width: inherit;
    background: #f8f8f8;
    background-color: #f8f8f8;
    border: 1px solid #CCCCCC;
    padding: 10px;
}
</style>

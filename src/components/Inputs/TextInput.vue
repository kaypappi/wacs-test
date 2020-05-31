<template>
    <div :class="[length == 'short' ? 'short-tagged-input' : 'long-text-input']">
        <label :for="id" :class="labelClass">{{label}}</label>
        <input 
            :value="value" 
            @change="$emit('input', $event.target.value)" 
            :type="type" 
            :required="required"
            :disabled="disabled" 
            :id="id"
            :name="name" 
            :placeholder="placeholder" 
            :class="inputClass"
            @keyup="keyupEven"
        >
        <span v-if="error" class="form-input-error">{{error[0]}}</span>
    </div>
</template>

<script>
    export default {
       props: {
           'type': {
               type: String,
               default: 'text',
           },
           'required': {
               type: Boolean,
               default: true,
           },
           'disabled': {
               type: Boolean,
               default: false,
           },
           'error': {
               type: Array,
               default: () => [],
           },
           'keyupEvent': {
               type: Function,
               default: () => '',
           },
           'inputClass': {
               type: String,
               default: '',
           },
           'labelClass': {
               type: String,
               default: '',
           },
           'length': {
               type: String,
               default: 'long',
           },
           'label': String,
           'id': String,
           'name': String,
           'placeholder': String,
           'value': String,
       },
       methods: {
           keyupEven() {
               this.keyupEvent(this.name);
           },
       }
    }
</script>

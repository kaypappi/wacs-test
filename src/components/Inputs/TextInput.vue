<template>
    <div>
        <label :for="id" :class="labelClass">{{label}}</label>
        <input 
            :value="value" 
            @input="$emit('input', $event.target.value)" 
            :type="type" 
            :required="required" 
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

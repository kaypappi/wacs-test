<template>
        <input 
            :value="value" 
            @input="$emit('input', $event.target.value)" 
            :type="type" 
            :required="required"
            :disabled="disabled" 
            :id="id"
            :name="name" 
            :placeholder="placeholder" 
            :class="inputClass"
            @keyup="keyupEven"
        >
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
           'keyupEvent': {
               type: Function,
               default: () => '',
           },
           'inputClass': {
               type: String,
               default: '',
           },
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

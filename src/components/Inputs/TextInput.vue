<template>
    <div>
        <label :for="id" class="form-modal-label">{{label}}</label>
        <input 
            :value="value" 
            @input="$emit('input', $event.target.value)" 
            :type="type" 
            :required="required" 
            :id="id"
            :name="name" 
            :placeholder="placeholder" 
            :class="classes"
            @keyup="keyupEven"
        >
        <span v-if="error !== ''" class="form-input-error">{{error}}</span>
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
               type: String,
               default: '',
           },
           'keyupEvent': {
               type: Function,
               default: () => '',
           },
           'label': String,
           'id': String,
           'name': String,
           'placeholder': String,
           'classes': String,
           'value': String,
       },
       methods: {
           keyupEven() {
               this.keyupEvent(this.name);
           },
       }
    }
</script>

<template>
    <div>
        <label :for="id">{{label}}</label>
        <input 
            :value="value" 
            @input="$emit('input', $event.target.value)" 
            :type="type" 
            :required="required" 
            :id="id" 
            :placeholder="placeholder" 
            :class="classes"
        >
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
           'label': String,
           'id': String,
           'placeholder': String,
           'classes': String,
           'value': String,
       },
    }
</script>

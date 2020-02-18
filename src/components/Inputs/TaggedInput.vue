<template>
    <div class="tagged-input-container">
        <label :for="id" :class="labelClass">{{label}}</label>
        <div class="tagged-input-box">
            <div class=" tag-box left-tag-box" v-if="tagLeft">
                <img :src="`/assets/images/${leftImage}`">
            </div>
            <input 
                :value="value" 
                @input="$emit('input', $event.target.value)" 
                :type="type" 
                :required="required"
                :disabled="disabled" 
                :id="id"
                :name="name" 
                :placeholder="placeholder" 
                :class="resolveClasses"
                @keyup="keyupEven"
                v-if="tagLeft || tagRight"
            >
            <div class="tag-box right-tag-box" v-if="tagRight">
                <img :src="`/assets/images/${rightImage}`">
            </div>
        </div>
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
           'tagLeft': {
               type: Boolean,
               default: true,
           },
           'tagRight': {
               type: Boolean,
               default: false,
           },
           'leftImage': {
               type: String,
               default: 'Chart-bar.svg',
           },
           'rightImage': {
               type: String,
               default: 'Chart-bar.svg',
           },
           'label': String,
           'id': String,
           'name': String,
           'placeholder': String,
           'value': [String, Number],
       },
       methods: {
           keyupEven() {
               this.keyupEvent(this.name);
           },
       },
       computed: {
           resolveClasses() {
               return this.tagLeft ? "tagged-input input-tag-left" : "tagged-input input-tag-right";
           }
       }
    }
</script>

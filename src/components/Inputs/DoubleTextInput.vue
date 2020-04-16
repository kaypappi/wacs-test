<template>
    <div>
        <label :for="id" :class="labelClass">{{label}}</label>
        <div class="double-input-container">
            <div class="short-input-box">
                <!-- <input 
                    :value="value" 
                    @input="$emit('input', $event.target.value)" 
                    :type="type" 
                    :required="required"
                    :disabled="disabled" 
                    :id="id"
                    :name="name" 
                    :placeholder="placeholder1" 
                    class="short-input"
                    :class="{'inner-label-input': hasInnerLabel}"
                    @keyup="keyupEven"
                > -->
                <PlainInput
                    :id="id"
                    :name="name1"
                    :inputClass="hasInnerLabel ? 'short-input inner-label-input' : 'short-input'"
                    v-model="addUser.full_name"
                    :keyupEvent="keyupEven"
                    :placeholder="placeholder1"
                />
                <span class="short-input-inner-label" v-if="hasInnerLabel">{{placeholder1}}</span>
            </div>
            <div class="double-input-range-text">{{textBetween}}</div>
            <div class="short-input-box">
                <PlainInput
                    :name="name2"
                    :inputClass="hasInnerLabel ? 'short-input inner-label-input' : 'short-input'"
                    v-model="addUser.name"
                    :keyupEvent="keyupEven"
                    :placeholder="placeholder2"
                />
                <span class="short-input-inner-label" v-if="hasInnerLabel">{{placeholder2}}</span>
            </div>
        </div>
        <span v-if="error" class="form-input-error">{{error[0]}}</span>
    </div>
</template>

<script>
    import PlainInput from './PlainInput';
    export default {
        components: {
            PlainInput,
        },
        data() {
            return {
                addUser: {},
            }
        },
        props: {
            'keyupEvent': {
                type: Function,
                default: () => '',
            },
            getValues: {
                type: Function,
                required: true,
            },
            'labelClass': {
                type: String,
                default: '',
            },
            // 'tagLeft': {
            //     type: Boolean,
            //     default: true,
            // },
            // 'tagRight': {
            //     type: Boolean,
            //     default: true,
            // },
            // 'leftImage': {
            //     type: String,
            //     default: 'Chart-bar.svg',
            // },
            // 'rightImage': {
            //     type: String,
            //     default: 'Chart-bar.svg',
            // },
            'error': {
                type: Array,
                default: () => [],
            },
            'hasInnerLabel': {
                type: Boolean,
                default: false,
            },
            'textBetween': String,
            'label': String,
            'id': String,
            'name1': String,
            'name2': String,
            'placeholder1': String,
            'placeholder2': String,
            // 'value': String,
        },
        methods: {
            keyupEven() {
                this.keyupEvent(this.name);    
                this.getValues(this.addUser); 
            },
        },
        // computed: {
        //     resolveClass() {
        //         return this.hasInnerLabel ? "short-input inner-label-input" : "short-input";
        //     }
        // }
    }
</script>

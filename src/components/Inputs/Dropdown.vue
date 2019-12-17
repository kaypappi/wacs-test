<template>
    <div>
        <label :for="id">{{label}}</label>
        <select name="" id="role" class="modal-inputs" @change="change">
            <option selected="selected" value="">Select</option>
            <option v-for="(option, index) in options" 
                    :key="index" 
                    :value="option"
                    :selected="selectedOption(option)"
            >
                {{option}}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
       props: {
           'options': Array,
           'value': String,
           'label': String,
           'id': String,
       },
       data() {
           return {
               
           }
       },
        methods: {
            selectedOption(option) {
            if (this.value) {
                return option === this.value;
            }
            return false;
            },
            change(e) {
            const selectedRole = e.target.value;
            const role = this.options.find((role) => {
                return selectedRole === role;
            });
            this.$emit("input", role);
            }
        }
    }
</script>

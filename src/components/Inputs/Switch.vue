<template>
  <div>
  <b-form-checkbox v-model="checked" @change="$emit('switchChange',checked)" switch>{{title}}</b-form-checkbox>
</div>
</template>

<script>
export default {
    props:{
        'title':String,
        'value':Boolean

    },
    data(){
        return{
            checked:''
        }
    },

}
</script>

<style >
.custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: green !important;
    background-color: green !important;
}
</style>
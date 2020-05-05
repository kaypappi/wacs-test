<template>
  <div class="custom-control custom-checkbox">
    <input v-model="checked" @change="$emit('changed',checked)" type="checkbox" class="custom-control-input" :id="title" />
    <label class="custom-control-label" :for="title">{{title}}</label>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        isChecked:Boolean,
    },
    data(){
        return{
            checked:''
        }
    }
};
</script>

<style>
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: green;
}

.custom-control{
    min-height: 1.4rem;
}

</style>
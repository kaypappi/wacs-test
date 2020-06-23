<template>
  <div class="recent-loans-wrapper">
      <b-table
      :items="offers"
      :fields="fields"
      responsive
    >
      </b-table>
  </div>
</template>

<script>
export default {
props:{
    items:Array
},
data(){
    return{
        fields:[]
    }
}
}
</script>

<style>

</style>
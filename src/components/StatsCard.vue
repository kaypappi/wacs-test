<template>
  <div class="stascard-wrapper">
      <div class="stats-title">
          {{title}}
      </div>
      <div :class="['stats-value',textColor]">
          {{value}}
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        value:Number,
        textColor:String
    }
}
</script>

<style scoped>
.stascard-wrapper {
    box-shadow: -6px 4px 7px -1px rgba(0,0,0,0.4);
    padding: 10px 20px;
    border-radius: 5px;

}

.stascard-wrapper .stats-title{
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
}
.stascard-wrapper .stats-value{
    font-size: 24px;
}

.red{
    color:red;
}
.green{
    color: #27be58;
}
.orange{
    color:#f08c14
}

</style>
<template>
  <div class="stascard-wrapper">
    
    <div class="stats-top mt-2"><span class="icon green mr-2"><b-icon :icon="icon"></b-icon></span><span :class="['stats-value']">{{value}}</span></div>
    <div class="stats-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: Number,
    textColor: String,
    icon:String
  }
};
</script>

<style scoped>
.stascard-wrapper {
  padding: 10px 20px;
  border: 1px solid #dee4df;
  border-radius: 6px;
  background-color: #ffffff;
}

.stascard-wrapper .stats-title {
  font-size: 14px;
  font-weight: 400;
  color: #6F6C6C;
}
.stascard-wrapper .stats-value {
  color: #424242;
  font-size: 20px;
  letter-spacing: 0;
  line-height: 25px;
}

.red {
  color: red;
}
.green {
  color: #27be58;
}
.orange {
  color: #f08c14;
}
</style>